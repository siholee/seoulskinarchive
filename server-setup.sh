#!/bin/bash
# ===============================================================
# Seoul Skin Archive 서버 초기 설정 스크립트
# 사용: sudo bash server-setup.sh
# ===============================================================

set -e

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   Seoul Skin Archive 서버 초기 설정                   ║"
echo "╚═══════════════════════════════════════════════════════╝"

# 1. 시스템 업데이트
echo ""
echo "── 1/6  시스템 업데이트"
apt-get update
apt-get upgrade -y

# 2. Node.js 및 npm 설치 (Node.js 20.x LTS)
echo ""
echo "── 2/6  Node.js 설치"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    echo "  ✓ Node.js $(node -v) 설치 완료"
else
    echo "  ✓ Node.js $(node -v) 이미 설치됨"
fi

# 3. PM2 설치
echo ""
echo "── 3/6  PM2 설치"
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    pm2 startup systemd -u root --hp /root
    echo "  ✓ PM2 설치 및 자동 시작 설정 완료"
else
    echo "  ✓ PM2 이미 설치됨"
fi

# 4. Nginx 설치
echo ""
echo "── 4/6  Nginx 설치"
if ! command -v nginx &> /dev/null; then
    apt-get install -y nginx
    systemctl enable nginx
    systemctl start nginx
    echo "  ✓ Nginx 설치 완료"
else
    echo "  ✓ Nginx 이미 설치됨"
fi

# 5. Certbot 설치 (Let's Encrypt SSL)
echo ""
echo "── 5/6  Certbot 설치"
if ! command -v certbot &> /dev/null; then
    apt-get install -y certbot python3-certbot-nginx
    echo "  ✓ Certbot 설치 완료"
else
    echo "  ✓ Certbot 이미 설치됨"
fi

# 6. 앱 디렉토리 생성
echo ""
echo "── 6/6  앱 디렉토리 준비"
mkdir -p /opt/seoulskinarchive
chown -R root:root /opt/seoulskinarchive
echo "  ✓ /opt/seoulskinarchive 디렉토리 생성"

# 완료
echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║   서버 초기 설정 완료                                 ║"
echo "║                                                       ║"
echo "║   다음 단계:                                          ║"
echo "║   1. .env.local 파일 생성                             ║"
echo "║   2. deploy.ps1 실행                                  ║"
echo "║   3. Nginx 설정 파일 생성                             ║"
echo "║   4. SSL 인증서 발급                                  ║"
echo "╚═══════════════════════════════════════════════════════╝"
