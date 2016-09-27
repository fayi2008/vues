var db=require('../../database')

module.exports=function (app, express) {

    var rout = express.Router();

    console.log(1)
    rout.get('/user',function(req, res){


        db.query('select * from user',function (err,rows,a) {
            console.log(3)
            if (err){
                console.log(err);
            }
            else{


                var list={
                    status:1,
                    result:rows
                }
                res.json(list);

            }

        })
    })


    return rout;

}

