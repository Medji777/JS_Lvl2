//Инициализация карусели товаров
let owl = $('.owl-carousel');
owl.owlCarousel({
    items:5,
	nav:true,
    loop:true,
    margin:6,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true
});