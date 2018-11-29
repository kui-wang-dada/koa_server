const router = require('koa-router')();
let student = require('../model/index').student
let course = require('../model/index').course


router.get('/', async (ctx) => {
    try {
        let aa = await student.findAll({
            include: {
                model: course,
            }
        })
        // ctx.body = aa
        await ctx.render('index', {
            students: aa
        })
    } catch (e) {
        return ctx.body = {
            msg: '获取信息失败',
            ab: e,
            code: -1
        }
    }
})
router.get('/add', async (ctx) => {
    try {
        let aa = await course.findAll()

        await ctx.render('add', {
            quanbukecheng: aa
        })
    } catch (e) {
        return ctx.body = {
            msg: '获取信息失败',
            ab: e,
            code: -1
        }
    }
})
router.get('/doadd', async (ctx) => {
    try {
        let query = ctx.request.query

        let aa = await student.create({
            sid: query.sid,
            name: query.name,
            age: query.age,
            sex: query.sex
        })
        for (let i = 0; i < query.courses.length; i++) {

            let bb = await course.findOne({
                where: {
                    cid: query.courses[i]
                }
            })
            await bb.addStudent(aa)
        }
        return ctx.body = {
            msg: '修改文章成功',
            code: 200
        }
    } catch (e) {
        return ctx.body = {
            msg: '获取信息失败',
            ab: e,
            code: -1
        }
    }
})

router.get('/edit/:sid', async (ctx) => {
    try {

        let sid = ctx.params.sid
        let cc = await student.findOne({
            where: {
                sid
            },
            include: {
                model: course
            }
        })
        let newCourses = []
        cc.courses.forEach(item => {
            newCourses.push(item.cid)
        })
        let bb = await course.findAll()
        await ctx.render('edit', {
            student: cc,
            quanbukecheng: bb,
            newCourses
        })
    } catch (e) {
        return ctx.body = {
            msg: '获取信息失败',
            ab: e,
            code: -1
        }
    }
})
router.get('/doedit/:sid', async (ctx) => {
    try {
        let sid = ctx.params.sid
        let query = ctx.request.query
        let cc = await student.update({
            name: query.name,
            age: query.age,
            sex: query.sex
        }, {
            where: {
                sid
            }
        })
        let dd = await student.findOne({
            where: {
                sid
            }
        })
        let ee = query.courses
        let ff = []
        for (let i = 0; i < ee.length; i++) {
            let bb = await course.findOne({
                where: {
                    cid: ee[i]
                }
            })
            ff.push(bb)
        }
        dd.setCourses(ff)
        return ctx.render = {
            msg: '更新成功',
            code: 0
        }

    } catch (e) {
        return ctx.body = {
            msg: '获取信息失败',
            ab: e,
            code: -1
        }
    }
})
router.get('/remove/:sid', async (ctx) => {
    try {
        let sid = ctx.params.sid
        let aa = await student.destroy({
            where: {
                sid
            }
        })
        return ctx.json = {
            msg: '删除成功',
            code: 0
        }


    } catch (e) {
        return ctx.json = {
            msg: '获取信息失败',
            ab: e,
            code: -1
        }
    }
})
module.exports = router