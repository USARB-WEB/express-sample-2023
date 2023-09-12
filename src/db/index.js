const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('web2_2023', 'web2_2023', 'web2_2023', {
    host: '65.21.153.35',
    dialect: 'mysql'
});
const connect = async(sequelize) => {
    await sequelize.authenticate();
}


module.exports = sequelize