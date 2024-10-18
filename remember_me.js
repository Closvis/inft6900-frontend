document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.form-box.login form');
    const emailInput = document.querySelector('input[name="email"]');
    const rememberMeCheckbox = document.querySelector('input[name="remember_me"]');

    // 页面加载时检查 localStorage 中是否有存储的 email
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;  // 自动填充 email 输入框
        rememberMeCheckbox.checked = true;   // 勾选 "Remember Me"
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();  // 阻止默认表单提交行为

        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');

        // 判断用户是否勾选了 "Remember Me"
        if (rememberMeCheckbox.checked) {
            // 如果勾选了 "Remember Me"，将 email 存储到 localStorage
            localStorage.setItem('remembered_email', email);
        } else {
            // 如果没有勾选，清除存储的 email
            localStorage.removeItem('remembered_email');
        }

        // 模拟发送登录请求（可以根据实际需要调整）
        fetch('http://127.0.0.1:8000/accounts/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                remember_me: rememberMeCheckbox.checked
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    window.location.href = data.redirect_url || '/';
                } else {
                    document.querySelector('#errorMessage').innerText = data.error_msg;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.querySelector('#errorMessage').innerText = error.message;
            });
    });
});
