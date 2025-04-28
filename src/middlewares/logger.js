const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const onHeaders = require('on-headers');

const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'access.log');

const logger = (req, res, next) => {
  const start = Date.now();

  onHeaders(res, () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;
    const ip = req.ip;

    const logText = `[${timestamp}] ${method} ${url} ${status} - ${duration}ms - IP: ${ip}\n`;

    // Grava no arquivo de log
    fs.appendFile(logFile, logText, (err) => {
      if (err) {
        console.error('Erro ao gravar no log:', err);
      }
    });

    // Terminal colorido — com fallback se chalk falhar
    try {
      const logMsg = `${method} ${url} → ${status} (${duration}ms)`;
      if (status >= 500) console.log(chalk.red(logMsg));
      else if (status >= 400) console.log(chalk.yellow(logMsg));
      else if (status >= 300) console.log(chalk.cyan(logMsg));
      else console.log(chalk.green(logMsg));
    } catch (err) {
      console.log(`${method} ${url} → ${status} (${duration}ms)`); // fallback
    }
  });

  next();
};

module.exports = logger;
