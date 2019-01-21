const objInput = {
    inputName: document.forms.form.form_name,
    inputTel: document.forms.form.form_tel,
    inputEmail: document.forms.form.form_email,
    inputBird: document.forms.form.form_bird,
    inputTown: document.forms.form.form_select
};

const objVal = {
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
    let set = new Form('form', 'form', objInput.inputName.value, objInput.inputTel.value, objInput.inputEmail.value, document.forms.form.form_textarea.value, objInput.inputBird.value, objInput.inputTown.value);
    set.validate(['name', 'tel', 'email', 'bird', 'select'], e);

});

document.forms.form.addEventListener('submit', function (e) {
	e.preventDefault();
    let onSend = false;
    for (let i in objInput) {
        if(objInput[i].value.trim()){
			if(objVal.name.test(objInput.inputName.value)){
			    if(objVal.tel.test(objInput.inputTel.value)){
					if(objVal.email.test(objInput.inputEmail.value)){
            			if(objVal.bird.test(objInput.inputBird.value)){
                            if(objVal.town.test(objInput.inputTown.value)){
                                onSend = true;
                            }
                        }
					}
				}
			}
        } else {
            objInput[i].style.borderColor = 'red';
            //onSend = false;
        }
    }
    if(onSend === true){
		for(let i in objInput){
			objInput[i].value = '';
            document.forms.form.form_textarea.value = '';
            document.forms.form.form_select.value = '';
            objInput[i].style.borderColor = '#ccc';
		}
        let q = document.querySelector('.form_submit'),
            span = document.createElement('span');
        q.appendChild(span);
        span.innerText = 'Форма успешно отправлена';

        setTimeout(function () {
            document.querySelector('span').remove();
			setTimeout(function(){
				document.forms.form.submit();
			});
        },800);
    }
});

class Builder {
    constructor(){
       this.formId = null;
       this.formClass = null;
       this.name = '';
       this.tel = '';
       this.email = '';
       this.text = '';
    }

    render(){
        return this.formId;
    }
}

class Form extends Builder{
    constructor(myId, myClass, formName, formTel, formEmail, formText, formBird){
        super();
        this.formId = myId;
        this.formClass = myClass;
        this.name = formName;
        this.tel = formTel;
        this.email = formEmail;
        this.text = formText;
        this.bird = formBird;
    }

    validate(type, e){
        for(let i = 0; i < type.length; i++) {
            let field = document.querySelector('.form_' + type[i]);
            let reg = /./;

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
                    $('#'+field.id).effect("bounce", "slow"); // Эффект bounce on JQuery
                    //error(field); // Эффект bounce on pure JS
                }
            }
        }
    }

    example(){
        objInput.inputName.value = this.name;
        objInput.inputTel.value = this.tel;
        objInput.inputEmail.value = this.email;
        document.forms.form.form_textarea.value = this.text;
        objInput.inputBird.value = this.bird;
    }
}

document.querySelector('.form_button').addEventListener('contextmenu', function (e) {
   e.preventDefault();
   let xhr = new XMLHttpRequest();
   xhr.open('GET', './db.json', true);
   xhr.onreadystatechange = function(){
       if(xhr.readyState !== 4){
           return;
       }
       if(xhr.status !== 200){
           console.log('Error', xhr.status, xhr.statusText);
       } else {
           console.log('Ok', xhr.responseText);
           let dbData = JSON.parse(xhr.responseText);
           dbData.forEach(function (node) {
               let example = new Form('form', 'form', node.name, node.tel, node.email, node.text, node.bird);
               example.example();
           });
       }
   };
   xhr.send();
});

// Получить текущую дату
$('#form_bird').val(getCurrentDate(new Date())); // JQuery
//document.querySelector('#form_bird').value = getCurrentDate(new Date()); // on pure Js
function getCurrentDate(date) {
    let d = date.getDate();
    (d < 10) ? d = '0' + d : d;
    let m = date.getMonth() + 1;
    (m < 10) ? m = '0' + m : m;
    let y = date.getFullYear();
    (y < 10) ? y = '0' + y : y;
    return `${d}.${m}.${y}`;
    //return `${y}-${m}-${d}`; // Для поля date
}

// Анамация bounce on pure Js
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
    monthNames: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
    monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    yearRange: '1950:2019',
    changeMonth: true,
    changeYear: true,
    firstDay: 1
});
