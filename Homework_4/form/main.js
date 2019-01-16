let objInput = {
    inputName: document.forms.form.form_name,
    inputTel: document.forms.form.form_tel,
    inputEmail: document.forms.form.form_email
};

let objVal = {
    name: /^[a-zа-яё]{2,}$/i,
    tel: /^(\+7\(\d{3}\)\d{3}-\d{4})$/,
    email: /^([a-z0-9_]+)?(-|.)([a-z0-9_]+)@([a-z0-9_]{2,5})[.]([[a-z]{2,6})$/i,
    text: /.{0,200}/i
};

document.forms.form.addEventListener('input', function (e) {
    e.preventDefault();
    let set = new Form('form', 'form', objInput.inputName.value, objInput.inputTel.value, objInput.inputEmail.value, document.forms.form.form_textarea.value);
    set.validate(['name', 'tel', 'email']);
});

document.forms.form.addEventListener('submit', function (e) {
	e.preventDefault();
    let onSend = false;
    for (let i in objInput) {
        if(objInput[i].value.trim()){
			if(objVal.name.test(objInput.inputName.value)){
			    if(objVal.tel.test(objInput.inputTel.value)){
					if(objVal.email.test(objInput.inputEmail.value)){
            			onSend = true;
					}
				}
			   }
        } else {
            objInput[i].style.borderColor = 'red';
            //e.preventDefault();
            //onSend = false;
        }
    }
    if(onSend === true){
		for(let i in objInput){
			objInput[i].value = '';
            document.forms.form.form_textarea.value = '';
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
    constructor(myId, myClass, formName, formTel, formEmail, formText){
        super();
        this.formId = myId;
        this.formClass = myClass;
        this.name = formName;
        this.tel = formTel;
        this.email = formEmail;
        this.text = formText;
    }

    validate(type){
        for(let i = 0; i < type.length; i++) {
            let field = document.querySelector('.form_' + type[i]);
            let reg = /./;

            switch (type[i]) {
                case "name":
                    reg = objVal.name;
                    break;
                case "tel":
                    reg = objVal.tel;
                    break;
                case "email":
                    reg = objVal.email;
                    break;
            }

            if (reg.test(field.value)) {
                field.style.borderColor = 'green';
            } else {
                field.style.borderColor = 'red';
            }
        }
    }

    example(){
        objInput.inputName.value = this.name;
        objInput.inputTel.value = this.tel;
        objInput.inputEmail.value = this.email;
        document.forms.form.form_textarea.value = this.text;
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
               let example = new Form('form', 'form', node.name, node.tel, node.email, node.text);
               example.example();
           });
       }
   };
   xhr.send();
});