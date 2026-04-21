# =============================================================
# Seoul Skin Archive 배포 스크립트
#
# 사용법:
#   .\deploy.ps1                         # 재배포 (기본)
#
# 사전 조건:
#   - SSH 개인 키: ~/.ssh/id_ed25519
#   - .env.local 파일에 Supabase 및 Yurasis API 설정 완료
# =============================================================

param(
    [string]$ServerIP = "45.76.50.57",
    [ValidateSet("redeploy", "initial")]
    [string]$Mode = "redeploy"
)

$ErrorActionPreference = "Stop"

# ── 설정 ──────────────────────────────────────────────────────
$SERVER_IP   = $ServerIP
$SERVER_USER = "root"
$APP_DIR     = "/opt/seoulskinarchive"
$DOMAIN      = "seoulskinarchive.com"

# SSH 개인 키 경로
$SSH_KEY = Join-Path $env:USERPROFILE ".ssh\id_ed25519"
if (-not (Test-Path $SSH_KEY)) {
    Write-Host "[✗] SSH 개인 키를 찾을 수 없습니다: $SSH_KEY" -ForegroundColor Red
    exit 1
}

$TARGET = "${SERVER_USER}@${SERVER_IP}"

# ── 헬퍼 함수 ────────────────────────────────────────────────
function Write-Ok($msg)   { Write-Host "[✓] $msg" -ForegroundColor Green }
function Write-Warn($msg) { Write-Host "[!] $msg" -ForegroundColor Yellow }
function Write-Fail($msg) { Write-Host "[✗] $msg" -ForegroundColor Red }
function Write-Step($msg) { Write-Host "`n── $msg" -ForegroundColor Cyan }

# ── 시작 ──────────────────────────────────────────────────────
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Seoul Skin Archive Deployment                 ║" -ForegroundColor Cyan
Write-Host "║   대상: $SERVER_IP ($DOMAIN)     ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Cyan

# ── 1단계: 사전 조건 확인 ─────────────────────────────────────
Write-Step "1/5  사전 조건 확인"

$ENV_FILE = Join-Path $PSScriptRoot ".env.local"
if (-not (Test-Path $ENV_FILE)) {
    Write-Fail ".env.local 파일이 없습니다: $ENV_FILE"
    exit 1
}
Write-Ok ".env.local 확인됨"

# ── 2단계: SSH 접속 테스트 ────────────────────────────────────
Write-Step "2/5  서버 접속 테스트"
try {
    $serverInfo = & ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no -o BatchMode=yes -o LogLevel=ERROR -o ConnectTimeout=15 $TARGET "uname -a" 2>$null
    Write-Ok "서버 접속 성공: $serverInfo"
} catch {
    Write-Fail "SSH 접속 실패: $_"
    exit 1
}

# ── 3단계: 로컬 코드 패키지 ───────────────────────────────────
Write-Step "3/5  코드 아카이브 생성"

$ARCHIVE_PATH = Join-Path $env:TEMP "ssa-deploy-$(Get-Date -Format 'yyyyMMddHHmmss').tar.gz"

# tar 명령어로 압축 (node_modules 제외)
Push-Location $PSScriptRoot
try {
    tar -czf $ARCHIVE_PATH --exclude=node_modules --exclude=.next --exclude=.git .
    $archiveSize = (Get-Item $ARCHIVE_PATH).Length / 1MB
    Write-Ok "아카이브 생성 완료: $([math]::Round($archiveSize, 1)) MB"
} catch {
    Write-Fail "아카이브 생성 실패: $_"
    Pop-Location
    exit 1
}
Pop-Location

# ── 4단계: 서버에 업로드 및 배포 ──────────────────────────────
Write-Step "4/5  서버 배포"

$REMOTE_ARCHIVE = "/tmp/ssa-deploy.tar.gz"

Write-Host "  ↑ 업로드 중..." -NoNewline
& scp -i "$SSH_KEY" -o StrictHostKeyChecking=no -o LogLevel=ERROR $ARCHIVE_PATH "${TARGET}:${REMOTE_ARCHIVE}" 2>$null
Write-Ok "업로드 완료"

# 배포 스크립트
$DEPLOY_SCRIPT = @"
set -e

echo "  → 디렉토리 준비..."
mkdir -p $APP_DIR
cd $APP_DIR

echo "  → 아카이브 추출..."
tar -xzf $REMOTE_ARCHIVE
rm $REMOTE_ARCHIVE

echo "  → .env.local 권한 설정..."
chmod 600 .env.local 2>/dev/null || true

echo "  → Node.js 모듈 설치..."
npm ci --production=false

echo "  → Next.js 빌드..."
npm run build

echo "  → PM2 재시작..."
if pm2 describe seoulskinarchive > /dev/null 2>&1; then
  pm2 restart seoulskinarchive
else
  pm2 start ecosystem.config.cjs
  pm2 save
fi

echo "  → 상태 확인..."
pm2 info seoulskinarchive
"@

Write-Host "  ⚙ 배포 실행 중..."
# Windows CRLF → LF 변환 (bash 호환)
$DEPLOY_SCRIPT_LF = $DEPLOY_SCRIPT -replace "`r`n", "`n"
$DEPLOY_SCRIPT_LF | & ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no $TARGET "bash -s"

Write-Ok "배포 완료"

# ── 5단계: 헬스 체크 ──────────────────────────────────────────
Write-Step "5/5  헬스 체크"

Start-Sleep -Seconds 3

try {
    $health = & ssh -i "$SSH_KEY" $TARGET "curl -s http://localhost:3001 | head -c 100"
    if ($health) {
        Write-Ok "앱 응답 정상"
        Write-Host "     Preview: $health..." -ForegroundColor Gray
    } else {
        Write-Warn "앱 응답 없음 (시작 중일 수 있음)"
    }
} catch {
    Write-Warn "헬스 체크 실패: $_"
}

# ── 완료 ──────────────────────────────────────────────────────
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   배포 성공                                      ║" -ForegroundColor Green
Write-Host "║   https://seoulskinarchive.com                   ║" -ForegroundColor Green
Write-Host "║   https://blog.seoulskinarchive.com              ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
