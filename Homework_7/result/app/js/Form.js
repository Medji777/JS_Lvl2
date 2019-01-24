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