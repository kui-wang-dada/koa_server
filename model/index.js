/**
 * @author：王逵
 * @version：v0.0.1
 * 创建日期：2018/11/28
 * 历史修订：
 */
const db = require('./db').sequelize();
let student = db.import('./student');
let course = db.import('./course');

// 同步模型到数据库中
course.belongsToMany(student, {
    through: 'courseToStudent',
    foreignKey: 'sid',

})
student.belongsToMany(course, {
    through: 'courseToStudent',
    foreignKey: 'cid',

})


// db.sync({
//     alter: true
// }).then(function (result) {
//     (async () => {
//         let aa = await student.create({
//             sid: 's-' + new Date(),
//             name: '王哒四号',
//             age: '17',
//             sex: '男',
//         });
//         let bb = await course.create({
//             cid: '1104',
//             name: '化学',
//         });
//         bb.addStudent(aa)
//     })();
// });



exports.student = student;
exports.course = course;