export class Currency {
  static format(value){
    var formatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, });
    console.log(formatter.format(value))
    return formatter.format(value);
  }
}