module.exports = {
  apps: [
    {
      name: 'seoulskinarchive',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      cwd: '/opt/seoulskinarchive',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: '/var/log/pm2/seoulskinarchive-error.log',
      out_file: '/var/log/pm2/seoulskinarchive-out.log',
      merge_logs: true,
      time: true,
    },
  ],
};
