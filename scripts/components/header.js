export class Header {
  getUserName(){
    return localStorage.getItem('userName');
  }
  renderUserName(){
    $('.cp-delivery__header--cart .badge-content > strong').text(`Olá, ${this.getUserName().split(' ')[0]}!`);
  }
  init(){
    this.renderUserName();
  }
}
const header = new Header;
header.init();