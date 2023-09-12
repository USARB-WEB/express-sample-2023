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

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('web2_2023', 'web2_2023', 'web2_2023', {
  host: '65.21.153.35',
  dialect: 'mysql'
});

const dbTest = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
dbTest();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})