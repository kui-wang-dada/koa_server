module.exports = function (sequelize, DataTypes) {
    return sequelize.define('student', {
        sid: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100)
        },
        age: {
            type: DataTypes.STRING(100)
        },
        sex: {
            type: DataTypes.STRING(100)
        },
    })
}