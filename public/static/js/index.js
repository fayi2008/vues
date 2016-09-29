import '../css/public.less';

class index{

    constructor(){
        this.submit()
    }

    init(data){
        var _this=this
        $.post('/api/user',data,'JSON').done(function (rs) {

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
            $('#login').off('click')
            _this.init({name:name,password:password})

        })

    }

}



new index()