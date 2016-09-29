var db=require('../../database')

module.exports=function (app, express) {

    var rout = express.Router();


    rout.get('/test',function(req, res){
        console.log(req.session.uid)

        req.session.reload()
        res.json(req.session)



    })





    return rout;

}

