var db=require('../../database')

module.exports=function (app, express) {

    var rout = express.Router();


    rout.post('/user',function(req, res){

        var tj=[],stj='';
        var list={
            status:1,
            success:1,
            msg:''

        }

        if(req.param('name')&&req.param('password')){
            stj='where name=? and password=?'
            tj.push(req.param('name'))
            tj.push(req.param('password'))
        }else{
            list.status=0
            list.success=0
            list.msg='提交数据有误'

        }
        db.query('select * from user '+stj,tj,function (err,rows,a) {

            if (err){
                console.log(err);
                list.status=0
                list.success=0
                list.msg='提交数据有误'
            }
            else{

                if(rows.length==1){
                    list.status=1
                    list.success=1
                    list.msg='登录成功'

                    req.session['uid']=rows[0].id
                    req.session['name']=rows[0].name
                    //console.log(rows,req.session)
                }else{
                    list.status=1
                    list.success=0
                    list.msg='你没有注册'
                }


                res.json(list);

            }

        })
    })


    rout.post('/signup',function (req,res) {
        var tj=[],stj='';
        var list={
            status:1,
            success:1,
            msg:''

        }

        if(req.param('name')&&req.param('password')){
            stj='where name=? and password=?'
            tj.push(req.param('name'))
            tj.push(req.param('password'))
        }else{
            list.status=0
            list.success=0
            list.msg='提交数据有误'

        }
        db.query('insert name,password user '+stj,tj,function (err,rows,a) {

        })
    })


    return rout;

}

