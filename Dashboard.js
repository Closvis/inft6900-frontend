const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide');
const numbersOfSlides = slides.length;
let slideNumber = 0

//slider next button
nextBtn.onclick = () => {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slideNumber++;

    if (slideNumber > (numbersOfSlides-1)) {
        slideNumber = 0;
    }

    slides[slideNumber].classList.add('active');
}
//slider prev button
prevBtn.onclick = () => {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slideNumber--;

    if (slideNumber < 0) {
        slideNumber = numbersOfSlides -1;
    }

    slides[slideNumber].classList.add('active');
}

// const logoutBtn = document.querySelector('.btnLogout-popup');
// logoutBtn.addEventListener('click', () => {
//     fetch('http://127.0.0.1:8000/accounts/api/logout/', {  // 确保URL匹配后端的登出接口
//         method: 'POST',
//         headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem('access_token'), //新加的
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === 'success') {
//                 window.location.href = '/inft6900/index.html';  // 登出成功后跳转到首页
//             } else {
//                 console.error('Logout failed');
//             }
//         })
//         .catch(error => console.error('Error:', error));
// });

