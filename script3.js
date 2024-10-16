document.querySelector('#contactForm').addEventListener('submit', function(event) {
    event.preventDefault();  // 阻止表单提交的默认行为

    const formData = new FormData(this);  // 获取表单数据
    const jsonData = {};  // 用于存储 JSON 数据
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    // 发送 fetch 请求到后端
    fetch('http://127.0.0.1:8000/accounts/contact/', {  // 确保 URL 和后端匹配
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)  // 将表单数据转换为 JSON 格式发送
    })
        .then(response => response.json())  // 解析响应为 JSON
        .then(data => {
            if (data.status === 'success') {
                // 表单提交成功的反馈
                alert('Message sent successfully!');
            } else {
                // 显示错误消息
                alert('There was an error: ' + data.error_msg);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
