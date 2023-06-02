module.exports = {
  apps: [
    {
      name: 'jamesjoy.site',
      script: './build/index.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}