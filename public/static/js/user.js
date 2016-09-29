import '../css/public.less';

class user{

    constructor(){
        this.submit()
    }

    init(data){
        var _this=this
        $.post('/api/signup',data,'JSON').done(function (rs) {

            alert(rs.msg)


        }).always(function () {
            _this.submit()
        })
    }

    submit(){
        var _this=this

        console.log($('#login'))
        $('#login').on('click',function () {

            var name=$('.name').val(),
                password=$('.password').val()
            if(!name){
                alert('请填写用户名')
                return false
            }
            if(!password){
                alert('请填写密码')
                return false
            }
            $('.signup').on('click')
            _this.init({name:name,password:password})

        })

    }

}



new index()