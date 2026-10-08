// 상세정보보기 모달
let modal = document.querySelector('.modalBox');
let details = document.querySelector('#detailed');
details.addEventListener('click',()=>{
    modal.classList.toggle('active');
});
// img.setAttribute('src','/images/coffee-gray.jpg');
// 이미지 모달
let mainPic = document.querySelector('.mainPicture');
let subPic1 = document.querySelectorAll('.pictor');

for(let i = 0; i<subPic1.length; i++){
    subPic1[i].addEventListener('mouseenter',()=>{
        mainPic.setAttribute('src',subPic1[i].getAttribute('src') );
    });
}
// 장바구니 배열
let carts = [];
// 장바구니 담기 
let cart = document.querySelector('#input_cart');
cart.addEventListener('click',()=>{
    // console.log('333');
    carts.push('11');
});