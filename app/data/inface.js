var db=require('../../database')

module.exports=function (app, express) {

    var apiRouter = express.Router();

    apiRouter.route('user').get(function (req,res) {
        db.query('select * from user',function (err,rows,a) {
            if (err){
                console.log(err);
            }
            else{
                
                res.json(rows);

            }

        })
    })

}

