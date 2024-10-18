const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const forgotLink = document.querySelector('.forgot-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const forgotPasswordLoginLink = document.querySelector('.forgot-password .login-link');

forgotLink.addEventListener('click', () => {
    wrapper.classList.add('active-forgot');  // 显示忘记密码弹窗
    wrapper.classList.remove('active');      // 隐藏登录或注册窗口
});

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active')
    wrapper.classList.remove('active-forgot');
})

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active')
    wrapper.classList.remove('active-forgot');
})

forgotPasswordLoginLink.addEventListener('click', () => {
    wrapper.classList.remove('active-forgot');  // 隐藏忘记密码窗口
    wrapper.classList.add('active-popup');      // 显示登录窗口
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
})

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active-forgot');
    wrapper.classList.remove('active-reset');
    wrapper.classList.remove('active-register');
    wrapper.classList.remove('active');
    wrapper.classList.add('active-login');
});

const loginForm = document.querySelector('.form-box.login form');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();  // 阻止默认表单提交行为

        const formData = new FormData(this);  // 获取表单数据

        // const rememberMe = document.querySelector('input[name="remember_me"]').checked;
        // const username = formData.get('username');
        // if (rememberMe) {
        //     localStorage.setItem('remembered_username', username);
        // } else {
        //     localStorage.removeItem('remembered_username');
        // }

        const jsonData = {};  // 用于存储 JSON 数据
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // 手动获取复选框的值（因为复选框如果未勾选，FormData中不会包含该值）
        const rememberMeCheckbox = document.querySelector('input[name="remember_me"]');
        jsonData['remember_me'] = rememberMeCheckbox.checked;

        console.log('Sending login data:', jsonData);  // 输出登录数据

        // 发送 fetch 请求到后端
        fetch('http://127.0.0.1:8000/accounts/api/login/', {  // 确保 URL 和后端匹配
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            //     'X-CSRFToken': getCookie('csrftoken')  // 获取 CSRF token
            },
            body: JSON.stringify(jsonData)  // 将表单数据转换为 JSON 格式发送
        })
            .then(response => response.json())  // 解析响应为 JSON
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    // 登录成功，重定向到主页或其他页面
                    localStorage.setItem('access_token', data.tokens.access); // 保存token到localStorage
                    window.location.href = data.redirect_url || '/';
                } else {
                    // 显示错误消息
                    document.querySelector('#errorMessage').innerText = data.error_msg;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.querySelector('#errorMessage').innerText = error.message;  // Display error
            });
    });

const registerForm = document.querySelector('.form-box.register form');
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();  // 阻止表单提交的默认行为

    // 检查复选框是否被勾选
    const agreeTerms = document.querySelector('#agreeTerms');
    if (!agreeTerms.checked) {
        document.querySelector('#registerErrorMessage').innerText = 'You must agree to the terms & conditions to register.';
        return;  // 如果没有勾选复选框，直接返回，不进行提交
    }
    const formData = new FormData(this);  // 获取表单数据
    const jsonData = {};  // 用于存储 JSON 数据
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    console.log('Sending registration data:', jsonData);  // 输出注册数据

    // 发送 fetch 请求到后端
    fetch('http://127.0.0.1:8000/accounts/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')  // 获取 CSRF token
        },
        body: JSON.stringify(jsonData)  // 将表单数据转换为 JSON 格式发送
    })
        .then(response => response.json())  // 解析响应为 JSON
        .then(data => {
            if (data.status === 'success') {
                // 注册成功，显示提示信息，不重定向
                document.querySelector('#registerErrorMessage').innerText = 'Registration successful!';
            } else {
                // 显示错误消息
                document.querySelector('#registerErrorMessage').innerText = data.error_msg;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.querySelector('#ForgetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();  // 阻止表单提交的默认行为

    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    // 发请求到后端发送重置邮件
    fetch('http://127.0.0.1:8000/accounts/password_reset_request/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // 邮件发送成功，显示消息并切换到重置密码表单
                document.querySelector('#resetMessage').innerText = 'Password reset email sent!';
                setTimeout(() => {
                    // 切换到重置密码窗口
                    wrapper.classList.add('active-reset');
                    wrapper.classList.remove('active-forgot');
                }, 2000);
            } else {
                document.querySelector('#resetMessage').innerText = data.error_msg;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.querySelector('#resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    // 将 reset_token 改为 verification_code
    jsonData['verification_code'] = jsonData['reset_token'];  // 将 reset_token 值映射到 verification_code
    delete jsonData['reset_token'];  // 删除 reset_token

    fetch('http://127.0.0.1:8000/accounts/reset_password/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // 密码重置成功，显示消息
                document.querySelector('#resetMessage').innerText = 'Password reset successful!';
                setTimeout(() => {
                    // 切换到登录窗口，而不是跳转 URL
                    window.location.href = data.redirect_url || '/';
                }, 2000);  // 跳转到登录页面
            } else {
                document.querySelector('#resetMessage').innerText = data.error_msg;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// 获取URL中的token
function getTokenFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('token');
}

// 从 cookie 中获取 CSRF token 的函数
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// document.addEventListener('DOMContentLoaded', function () {
//     const usernameInput = document.querySelector('input[name="username"]');
//     const rememberedUsername = localStorage.getItem('remembered_username');
//
//     if (rememberedUsername) {
//         usernameInput.value = rememberedUsername;
//     }
// });
