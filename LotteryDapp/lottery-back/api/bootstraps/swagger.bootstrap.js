// swagger.bootstrap.js

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();

const DEFAULT_PORT = 10010;


function run(appRoot, port) {
  return new Promise((resolve, reject) => {
    try {
      const config = { appRoot };

      SwaggerExpress.create(config, (err, swaggerExpress) => {
        if (err) { throw err; }
        // install middleware
        swaggerExpress.register(app);
        const appPort = port || DEFAULT_PORT;
        app.listen(appPort);
        console.log(`Server listening on port ${appPort}...`);
        return resolve();
      });
    } catch (error) {
      return reject(error);
    }
  });
}


module.exports = {
  run,
};
