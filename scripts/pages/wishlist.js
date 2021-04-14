export class Wishlist {
  wishMobile(){
    if(window.matchMedia('(max-width: 992px)').matches){
      $(document).on('click', '.cp-delivery__wishlist--option .go-to-list', function(e){
        e.preventDefault();
        $('.cp-delivery__wishlist--options').hide();
        $('.cp-delivery__wishlist--products').show();
      })
      $(document).on('click', '.cp-delivery__wishlist--mobile .change-list', function(e){
        e.preventDefault();
        $('.cp-delivery__wishlist--options').show();
        $('.cp-delivery__wishlist--products').hide();
      })
    }
  }
  init(){
    this.wishMobile()
  }
}
if($('body').hasClass('cp-delivery__wishlist')){
  var wishlist = new Wishlist;
}
wishlist.init();