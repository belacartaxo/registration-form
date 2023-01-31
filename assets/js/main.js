const inputName = document.querySelector('#name');
const inputLastName = document.querySelector('#last-name');
const inputEmail = document.querySelector('#email');
const inputPhoneNumber = document.querySelector('#number');
const inputPassword = document.querySelector('#password');
const inputConfirmPassword = document.querySelector('#confirm-password');

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

/*
    ver se o nome/sobrenome foi digitado e se ele tem pelo menos 3 caracteres
    validação de email, ver se foi digitado
    numero de telefone válido
    senha com no mínimo 8 caracteres, ver se foi digitado
    repita senhas, compativeis
    solicitar o gênero
*/
inputName.addEventListener('input', ()=>{
    validate(inputName, `Name must be at least 3 characters`, 3);
})

inputLastName.addEventListener('input', ()=>{
    validate(inputLastName, `Name must be at least 3 characters`, 3);
})

inputEmail.addEventListener('input', ()=>{
    let elParent = inputEmail.closest('div');
    if(!emailRegex.test(inputEmail.value)){  
        createText(elParent, `Invalid email`);
        return;
    } else {
        removeP(elParent);
    }
})

inputPhoneNumber.addEventListener('input', ()=>{
    let elParent = inputPhoneNumber.closest('div');
    if(!phoneRegex.test(inputPhoneNumber.value)){  
        createText(elParent, `Invalid phone number`);
        return;
    } else {
        removeP(elParent);
    }
})

inputPassword.addEventListener('input', ()=>{
    validate(inputPassword, `Password must be at least 8 characters`, 8);
})

inputConfirmPassword.addEventListener('input', ()=>{
    let elParent = inputConfirmPassword.closest('div');
    if(inputConfirmPassword !== inputPassword){  
        createText(elParent, `Passwords need to be the same`);
        return;
    } else {
        removeP(elParent);
    }
})

function validate(input, txt, length){
    const valInput = input.value;
    let elParent = input.closest('div');
    if (valInput.length < length) {
        createText(elParent, txt);
        return;
    } else {
        removeP(elParent);
    }
}

function createText(elParent, txt){
    if (elParent.childElementCount >= 3) return;
    elParent.appendChild(createP(txt));
}

function createP(txt){
    let p = document.createElement('p');
    p.classList.add('alert');
    p.textContent = txt;
    return p
}

function removeP(elParent){
    const p = elParent.querySelector('p.alert');
    elParent.removeChild(p);
}

// EMAIL

//PHONE-NUMBER
