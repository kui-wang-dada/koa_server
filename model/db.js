const Sequelize = require('sequelize');
const config = require('../config');
exports.sequelize = function () {
    return new Sequelize(
        config.mysql.database,
        config.mysql.username,
        config.mysql.password, {
            'dialect': 'mysql', // 数据库使用mysql
            'host': config.mysql.host, // 数据库服务器ip
            'port': config.mysql.port, // 数据库运行端口
            'timestamp': true, // 这个参数为true是MySQL会自动给每条数据添加createdAt和updateAt字段
            'quoteIdentifiers': true
        }
    );
};