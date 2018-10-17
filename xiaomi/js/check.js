var check = (function(){
    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['login-btn'];
            this.$usernameInp =   this.$ele['username'];
            this.$passwordInp =   this.$ele['password'];
            this.event();
        },
        event:function(){
            var reg1 = /([a-z]|[A-Z]|_){6,13}/;   //6-13字母或下划线
            var reg2 = /^1[35789]\d{9}$/;   //手机号码
            var reg3 = /.|\w+/;//密码
            var _this = this;console.log(this.$usernameInp.value);
            this.$usernameInp.onchange = function(){
                
                if(reg2.test(_this.$usernameInp.value)==false){
                    $name_X.style.display = 'block';
                }else{
                    $pass_X.style.display = 'none';
                }
            }
            this.$passwordInp.onchange = function(){
                if(reg3.test(_this.$passwordInp.value)==false){
                    $name_X.style.display = 'block';
                }else{
                    $pass_X.style.display = 'none';
                }
            }
        }
    }
})