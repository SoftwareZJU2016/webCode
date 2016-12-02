var submitButton = $('.ajax-login-box #login');

if (submitButton)
    submitButton.click(function(){
        $.post('/login', {
            id: $('.login-box [name="id"]').val(),
            password: $('.login-box [name="password"]').val()
        }, function(data) {
            if (data.code == 0) {
                //你想干什么都行
                alert('登录成功');
                window.location.href='/'; //跳转到首页
            } else {
                //你想干什么都行
                alert(data.msg);
            }
        });
    });