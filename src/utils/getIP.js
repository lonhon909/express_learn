const os = require('os');

module.exports = function() {
  const interfaces = os.networkInterfaces();
  for(let key in interfaces) {
    const iface = interfaces[key];
    for(let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}