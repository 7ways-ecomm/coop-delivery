export class Home {

  slickBanner(){
    $('.cp-delivery__block--slider').slick({
      slidesToShow:2,
      slidesToScroll:2,
      dots:true,
      arrows:true,
      prevArrow: '<span class="prev-arrow"><img src="/images/icon-arrow-left.png" /></span>',
      nextArrow: '<span class="next-arrow"><img src="/images/icon-arrow-right.png" /></span>',
      responsive: [{
        breakpoint:490,
        settings: {
          slidesToShow:1.2,
          slidesToScroll:1,
          arrows:false,
          infinite:false
        }
      }]
    })
  }
  init(){
    this.slickBanner();
  }
}
if($('body').hasClass('cp-delivery__home')){
  const home = new Home;
  home.init();
}