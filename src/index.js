const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json({ extended: true }));
const port = 3000

const router = require("./api/routes/index");
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})