const log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: '/var/log/web.log', category: 'produciton' }
  ]
});

module.exports = log4js.getLogger('produciton');
