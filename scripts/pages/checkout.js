export class Checkout {
  accordionResume(){
    $('.cp-checkout__block--resume-step strong.title').on('click', function(e){
      e.preventDefault();
      $(this).parent().find('div.content').slideToggle('medium', function(){
        if($(this).is(':visible') && $(this).parent().hasClass('userinfo')){
          $(this).css('display', 'flex')
        }
      })
    })
  }
  init(){
    this.accordionResume();
  }
}
if($('body').hasClass('cp-delivery__checkout')){
  const checkout = new Checkout;
  checkout.init();
}