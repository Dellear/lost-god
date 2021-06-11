module.exports = {
  apps: [
    { 
      name: 'server',
      script: './server.js',
      watch: true,
      // Delay between restart
      watch_delay: 2000,
      ignore_watch: ['node_modules', 'public/js', 'public/css', 'public/share_code'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
