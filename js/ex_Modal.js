 // addEventListener()이용
// 모달 열기
// DON 요소 접근
let btnOpen = document.querySelector('.btn_open');
let btnClose = document.querySelector('.btn-close');
let overLay = document.querySelector('.overlay');
let modalC = document.querySelector('.modal');

btnOpen.addEventListener('click',()=>{
    modalC.classList.add('active');
    overLay.classList.add('active');
});
// // let overLay02 = document.querySelector('.overlay_active');
btnClose.addEventListener('click',()=>{
    // modalC.classList.toggle('active');
    overLay.classList.remove('acive');
    modalC.classList.remove('active');
});
overLay.addEventListener('click',()=>{
    // modalC.classList.toggle('active');
    overLay.classList.remove('active');
    modalC.classList.remove('active');
});