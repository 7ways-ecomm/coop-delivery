export default class Login {
  inputMask(){
    var SPMaskBehavior = function (val) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
      onKeyPress: function(val, e, field, options) {
          field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

    $('#postalCode').mask('00000-000');
    $('#document').mask('000.000.000-00', {reverse: true})
    $('#phone').mask('(00) 0000-0000');
    $('#celphone').mask(SPMaskBehavior, spOptions);
  }
  formFlow(){
    $(document).on('submit', $('.login-block__form--login form')[0], function(e){
      e.preventDefault();
      let val = $(this).find('#postalCode').val();
      console.log(val);
      if(val){
        $.getJSON("https://viacep.com.br/ws/"+ val.replace('-', '') +"/json/?callback=?", function(dados) {
        if(dados.erro){
          var temp = `<p class="input-error">CEP inválido, por favor insira outro cep</p>`
          $(temp).insertAfter('#postalCode');
        }else {
          $('p.input-error').remove();
          localStorage.setItem('postalCode', val);
          window.location.href = "/userdata.html";
        }
      });
      }
    })
    $(document).on('submit', $('.login-block__form--userdata form')[0], function(e){
      e.preventDefault();
      let document = $(this).find('#document').val();
      let email = $(this).find('#email').val();
      if(document && email){
        localStorage.setItem('userDocument', document);
        localStorage.setItem('userEmail', email);
        window.location.href = "/userdetail.html";
      }
    })
    if($('body').find('.login-block__box--login').length){
      localStorage.removeItem('postalCode');
      localStorage.removeItem('userDocument');
      localStorage.removeItem('userEmail');
    }
    if($('body').find('.login-block__box--userdetail').length){
      let postalCode = localStorage.getItem('postalCode');

      $('#postalCode').val(postalCode);
      $('#document').val(localStorage.getItem('userDocument'));
      $('#email').val(localStorage.getItem('userEmail'));
      this.changeAddress(postalCode);
      let _this = this;
      $('#postalCode').on('blur', function(e){
        e.preventDefault();
        _this.changeAddress(e.target.value);
      })
    }
  }
  changeAddress(postalCode){
    $.getJSON("https://viacep.com.br/ws/"+ postalCode.replace('-', '') +"/json/?callback=?", function(dados) {
      if(dados.erro){
        var temp = `<p class="input-error">CEP inválido, por favor insira outro cep</p>`
        $(temp).insertAfter('#postalCode');
        $('#address').val('');
        $('#neighborhood').val('');
        $('#state').val('');
        $('#city').val('');
      }else {
        $('p.input-error').remove();
        $('#address').val(dados.logradouro);
        $('#neighborhood').val(dados.bairro);
        $('#state').val(dados.uf);
        $('#city').val(dados.localidade);
      }
    });
  }
  init(){
    if($('body').hasClass('login')){
      this.inputMask();
      this.formFlow();
    }
  }
}
const login = new Login;
login.init();