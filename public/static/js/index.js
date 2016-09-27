import '../css/public.less';

class index{

    constructor(){
        this.init()
    }

    init(){
        $.getJSON('/api/user').done(function (rs) {

            new vue({
                el: '#index',
                data: rs
            })


        })
    }

}



new index()