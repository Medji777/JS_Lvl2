"use strict";

var xhr = new XMLHttpRequest();
xhr.open('GET', './json/db_town.json', true);

xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) {
    return;
  }

  if (xhr.status !== 200) {
    console.log('Error', xhr.status, xhr.statusText);
  } else {
    var chek = function chek() {
      var ps = document.querySelectorAll('.option_result');
      ps.forEach(function (n) {
        n.addEventListener('click', function () {
          input.value = this.innerText;
          div.innerHTML = '';
          div.style.visibility = "hidden";
        });
      });
    };

    console.log('Ok', xhr.responseText);
    var dbData = JSON.parse(xhr.responseText),
        input = document.querySelector('.form_select'),
        div = document.querySelector('.select_result'),
        s = [];
    dbData.forEach(function (node) {
      s.push(node.city);
    });
    input.addEventListener('input', function () {
      var reg = new RegExp(this.value, 'i');
      div.innerHTML = '';
      div.style.visibility = "hidden";

      if (this.value.length > 2) {
        for (var i = 0; i < s.length; i++) {
          if (s[i].match(reg)) {
            var p = document.createElement('p'); //let ps = `<p>${s[i]}</p>`;

            p.setAttribute('class', 'option_result');
            div.appendChild(p);
            p.innerHTML += s[i];
            div.style.visibility = "visible";
            chek();
          }
        }
      }
    });
  }
};

xhr.send();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Builder =
/*#__PURE__*/
function () {
  function Builder() {
    _classCallCheck(this, Builder);

    this.formId = null;
    this.formClass = null;
    this.name = '';
    this.tel = '';
    this.email = '';
    this.text = '';
  }

  _createClass(Builder, [{
    key: "render",
    value: function render() {
      return this.formId;
    }
  }]);

  return Builder;
}();
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Form =
/*#__PURE__*/
function (_Builder) {
  _inherits(Form, _Builder);

  function Form(myId, myClass, formName, formTel, formEmail, formText, formBird) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this));
    _this.formId = myId;
    _this.formClass = myClass;
    _this.name = formName;
    _this.tel = formTel;
    _this.email = formEmail;
    _this.text = formText;
    _this.bird = formBird;
    return _this;
  }

  _createClass(Form, [{
    key: "validate",
    value: function validate(type, e) {
      for (var i = 0; i < type.length; i++) {
        var field = document.querySelector('.form_' + type[i]);
        var reg = /./;

        switch (type[i]) {
          case 'name':
            reg = objVal.name;
            break;

          case 'tel':
            reg = objVal.tel;
            break;

          case 'email':
            reg = objVal.email;
            break;

          case 'bird':
            reg = objVal.bird;
            break;

          case 'select':
            reg = objVal.town;
            break;
        }

        if (reg.test(field.value)) {
          field.style.borderColor = 'green';
        } else {
          field.style.borderColor = 'red';

          if (e.target == field) {
            $('#' + field.id).effect("bounce", "slow"); // Эффект bounce on JQuery
            //error(field); // Эффект bounce on pure JS
          }
        }
      }
    }
  }, {
    key: "example",
    value: function example() {
      objInput.inputName.value = this.name;
      objInput.inputTel.value = this.tel;
      objInput.inputEmail.value = this.email;
      document.forms.form.form_textarea.value = this.text;
      objInput.inputBird.value = this.bird;
    }
  }]);

  return Form;
}(Builder);
"use strict";

var objInput = {
  inputName: document.forms.form.form_name,
  inputTel: document.forms.form.form_tel,
  inputEmail: document.forms.form.form_email,
  inputBird: document.forms.form.form_bird,
  inputTown: document.forms.form.form_select
};
var objVal = {
  name: /^[a-zа-яё]{2,}$/i,
  tel: /^(\+7\(\d{3}\)\d{3}-\d{4})$/,
  email: /^([a-z0-9_]+)?(-|.)([a-z0-9_]+)@([a-z0-9_]{2,5})[.]([[a-z]{2,6})$/i,
  bird: /^\d{2}.\d{2}.\d{4}$/,
  //bird: /^\d{4}-\d{2}-\d{2}$/, // Для поля date, on pure Js
  text: /.{0,200}/i,
  town: /[а-яё]+/i
};
document.forms.form.addEventListener('input', function (e) {
  e.preventDefault();
  var set = new Form('form', 'form', objInput.inputName.value, objInput.inputTel.value, objInput.inputEmail.value, document.forms.form.form_textarea.value, objInput.inputBird.value, objInput.inputTown.value);
  set.validate(['name', 'tel', 'email', 'bird', 'select'], e);
});
document.forms.form.addEventListener('submit', function (e) {
  e.preventDefault();
  var onSend = false;

  for (var i in objInput) {
    if (objInput[i].value.trim()) {
      if (objVal.name.test(objInput.inputName.value)) {
        if (objVal.tel.test(objInput.inputTel.value)) {
          if (objVal.email.test(objInput.inputEmail.value)) {
            if (objVal.bird.test(objInput.inputBird.value)) {
              if (objVal.town.test(objInput.inputTown.value)) {
                onSend = true;
              }
            }
          }
        }
      }
    } else {
      objInput[i].style.borderColor = 'red'; //onSend = false;
    }
  }

  if (onSend === true) {
    for (var _i in objInput) {
      objInput[_i].value = '';
      document.forms.form.form_textarea.value = '';
      document.forms.form.form_select.value = '';
      objInput[_i].style.borderColor = '#ccc';
    }

    var q = document.querySelector('.form_submit'),
        span = document.createElement('span');
    q.appendChild(span);
    span.innerText = 'Форма успешно отправлена';
    setTimeout(function () {
      document.querySelector('span').remove();
      setTimeout(function () {
        document.forms.form.submit();
      });
    }, 800);
  }
});
document.querySelector('.form_button').addEventListener('contextmenu', function (e) {
  e.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './json/db.json', true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.status !== 200) {
      console.log('Error', xhr.status, xhr.statusText);
    } else {
      console.log('Ok', xhr.responseText);
      var dbData = JSON.parse(xhr.responseText);
      dbData.forEach(function (node) {
        var example = new Form('form', 'form', node.name, node.tel, node.email, node.text, node.bird);
        example.example();
      });
    }
  };

  xhr.send();
}); // Получить текущую дату

$('#form_bird').val(getCurrentDate(new Date())); // JQuery
//document.querySelector('#form_bird').value = getCurrentDate(new Date()); // on pure Js

function getCurrentDate(date) {
  var d = date.getDate();
  d < 10 ? d = '0' + d : d;
  var m = date.getMonth() + 1;
  m < 10 ? m = '0' + m : m;
  var y = date.getFullYear();
  y < 10 ? y = '0' + y : y;
  return "".concat(d, ".").concat(m, ".").concat(y); //return `${y}-${m}-${d}`; // Для поля date
} // Анамация bounce on pure Js

/*function error(f) {
    f.classList.add('error');
    setTimeout(function () {
        f.classList.remove('error');
    },500);
}*/
// Birthday on JQuery - datepicker


$('.form_bird').datepicker({
  dateFormat: 'dd.mm.yy',
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesMin: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  yearRange: '1950:2019',
  changeMonth: true,
  changeYear: true,
  firstDay: 1
});