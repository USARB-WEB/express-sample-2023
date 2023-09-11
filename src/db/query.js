const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
    let results = [];
    try {
        const connection = await mysql.createConnection(config.db);
        results = await connection.execute(sql, params);
    } catch (e) {
        console.log(e)
    }

    return results;
}

module.exports = {
    query
}