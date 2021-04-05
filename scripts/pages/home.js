export class Home {
  getUserName(){
    return localStorage.getItem('userName');
  }
  init(){
    $('.cp-delivery__header--cart .badge-content > strong').text(`Olá, ${this.getUserName().split(' ')[0]}!`);
  }
}
const home = new Home;
home.init();