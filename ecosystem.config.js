module.exports = {
  apps : [{
    name: 'node-mongodb-movie',  // 应用名
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'  // 生产环境变量
    }
  }],

  deploy : {
    // production 为任务的名称
    production : {
      user : 'qiuming',  // 服务器发布的用户
      host : ['132.232.104.203'],  // 服务器
      port: 5001,
      ssh_options: 'StrictHostKeyChecking=no',
      ref  : 'origin/master',  // 项目所在分支
      repo : 'https://github.com/Wobugaosuni/node-mongodb-movie.git',   // 项目仓库
      path : '/var/websites/production',  // 项目部署到服务器中的目录（要到服务器中创建）
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
