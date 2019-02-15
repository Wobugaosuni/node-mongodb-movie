module.exports = {
  apps : [{
    name: 'node-mongodb-movie',
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
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'qiuming',
      host : '132.232.104.203',
      ref  : 'origin/master',
      repo : 'https://github.com/Wobugaosuni/node-mongodb-movie.git',
      path : '/var/websites/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
