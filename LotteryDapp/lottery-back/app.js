// app.js

const swaggerExpressBootstrap = require('./api/bootstraps/swagger.bootstrap');

const appRoot = __dirname;


(async () => {
  // Run swagger-express service
  await swaggerExpressBootstrap.run(appRoot, process.env.PORT);

  // End
  console.log('Application started successfully.');
})();
