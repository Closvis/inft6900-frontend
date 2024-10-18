// auth.js

document.addEventListener('DOMContentLoaded', function () {
    const homeButton = document.querySelector('.home-button');

    // 检查用户的登录状态
    fetch('http://127.0.0.1:8000/accounts/api/check_login_status/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),  // 从 localStorage 获取 JWT
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'logged_in') {
                homeButton.href = '/inft6900/dashboard.html';  // 已登录跳转到 dashboard
            } else {
                homeButton.href = '/inft6900/index.html';  // 未登录跳转到 index
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


document.addEventListener('DOMContentLoaded', function () {
    const authButton = document.getElementById('authButton');  // 获取 login/logout 按钮

    // 检查本地存储中是否有 JWT token
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        // 如果有 token，显示 "Logout" 按钮
        authButton.textContent = 'Logout';
        authButton.addEventListener('click', () => {
            // 清除 token 并重定向到登录页面
            localStorage.removeItem('access_token');
            window.location.href = '/inft6900/index.html';
        });
    } else {
        // 如果没有 token，显示 "Login" 按钮
        authButton.textContent = 'Login';
        authButton.addEventListener('click', () => {
            window.location.href = '/inft6900/index.html';  // 重定向到登录页面
        });
    }
});

const logoutBtn = document.querySelector('.btnLogout-popup');
logoutBtn.addEventListener('click', () => {
    fetch('http://127.0.0.1:8000/accounts/api/logout/', {  // 确保URL匹配后端的登出接口
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'), //新加的
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.href = '/inft6900/index.html';  // 登出成功后跳转到首页
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => console.error('Error:', error));
});

// localStorage.removeItem('access_token');
//
