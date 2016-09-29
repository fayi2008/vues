var db = require('../../database')

module.exports = function (app, express) {

    var rout = express.Router();


    rout.post('/user', function (req, res) {

        var tj = [], stj = '';
        var list = {
            status: 1,
            success: 1,
            msg: ''

        }

        if (req.param('name') && req.param('password')) {
            stj = 'where name=? and password=?'
            tj.push(req.param('name'))
            tj.push(req.param('password'))
        } else {
            list.status = 0
            list.success = 0
            list.msg = '提交数据有误'

        }
        db.query('select * from user ' + stj, tj, function (err, rows) {

            if (err) {
                console.log(err);
                list.status = 0
                list.success = 0
                list.msg = '提交数据有误'
            }
            else {

                if (rows.length == 1) {
                    list.status = 1
                    list.success = 1
                    list.msg = '登录成功'

                    req.session['uid'] = rows[0].id
                    req.session['name'] = rows[0].name
                    //console.log(rows,req.session)
                } else {
                    list.status = 1
                    list.success = 0
                    list.msg = '你没有注册'
                }


            }
            res.json(list);
        })
    })


    rout.post('/signup', function (req, res) {
        var tj = [];
        var list = {
            status: 1,
            success: 1,
            msg: ''

        }

        if (req.param('name') && req.param('password')) {

            tj.push(req.param('name'))
            tj.push(req.param('password'))
            tj.push(1)
        } else {
            list.status = 0
            list.success = 0
            list.msg = '提交数据有误'

        }


        db.query('INSERT INTO user (name, password,type) VALUES(?,?,?)', tj, function (err, rows) {
            if (err) {

                list.status = 0
                list.success = 0

                list.msg = '系统错误'
                if(err.sqlState=23000){
                    list.msg ='您已经注册过了'
                }

            }
            else {
                console.log(2 + rows)
                if (rows.insertId) {
                    list.status = 1
                    list.success = 1
                    list.msg = '注册成功'

                    // req.session['uid']=rows[0].id
                    // req.session['name']=rows[0].name
                    //console.log(rows,req.session)
                } else {
                    list.status = 1
                    list.success = 0
                    list.msg = '注册失败'
                }


            }
            res.json(list);

        })
    })

    rout.post('/updatepwd', function (req, res) {
        var tj = [];
        var list = {
            status: 1,
            success: 1,
            msg: ''

        }

        if (req.param('name') && req.param('password')) {

            tj.push(req.param('name'))
            tj.push(req.param('password'))

        } else {
            list.status = 0
            list.success = 0
            list.msg = '提交数据有误'

        }


        db.query('update user set password=? where name=?', tj, function (err, rows) {
            if (err) {

                list.status = 0
                list.success = 0

                list.msg = '系统错误'


            }
            else {
                console.log(rows)
                if (rows) {
                    list.status = 1
                    list.success = 1
                    list.msg = '注册成功'
                    if(req.session.uid) {
                        req.session.reload()
                    }
                    // req.session['name']=rows[0].name
                    //console.log(rows,req.session)
                } else {
                    list.status = 1
                    list.success = 0
                    list.msg = '注册失败'
                }


            }
            res.json(list);

        })
    })


    return rout;

}

