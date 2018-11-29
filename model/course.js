module.exports = function (sequelize, DataTypes) {
    return sequelize.define('course', {
        cid: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        name: DataTypes.STRING(100),
    })
}