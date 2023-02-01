const inputName = document.querySelector('#name');
const inputLastName = document.querySelector('#last-name');
const inputEmail = document.querySelector('#email');
const inputPhoneNumber = document.querySelector('#number');
const inputPassword = document.querySelector('#password');
const inputConfirmPassword = document.querySelector('#confirm-password');
const inputGender = document.getElementsByName('gender');
const submit = document.querySelector('#submit-form')

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

submit.addEventListener('click', (event)=>{
    let elParent = document.querySelector('#div-gender');
    
    for (let i of inputGender){
        if(i.checked === true){
            removeP(elParent);
            return
        }
    }
    
    event.preventDefault();
    if (elParent.childElementCount >= 3) return;
    elParent.appendChild(createP('The gender field must be filled in'));
})

inputName.addEventListener('input', ()=>{
    validate(inputName, `Name must be at least 3 characters`, 3);
})

inputLastName.addEventListener('input', ()=>{
    validate(inputLastName, `Name must be at least 3 characters`, 3);
})

inputEmail.addEventListener('input', ()=>{
    let elParent = inputEmail.closest('div');
    const inputBorder = elParent.querySelector('input');
    if(!emailRegex.test(inputEmail.value)){  
        createText(elParent, `Invalid email`, inputBorder);
        return;
    } else {
        removeP(elParent, inputBorder);
    }
})

inputPhoneNumber.addEventListener('input', ()=>{
    let elParent = inputPhoneNumber.closest('div');
    const inputBorder = elParent.querySelector('input');
    if(!phoneRegex.test(inputPhoneNumber.value)){  
        createText(elParent, `Invalid phone number`, inputBorder);
        return;
    } else {
        removeP(elParent, inputBorder);
    }
})

inputPassword.addEventListener('input', ()=>{
    validate(inputPassword, `Password must be at least 8 characters`, 8);
})

inputConfirmPassword.addEventListener('input', ()=>{
    let elParent = inputConfirmPassword.closest('div');
    const inputBorder = elParent.querySelector('input');
    if(inputConfirmPassword.value !== inputPassword.value){  
        createText(elParent, `Passwords must match`, inputBorder);
        return;
    } else {
        removeP(elParent, inputBorder);
    }
})

function validate(input, txt, length){
    const valInput = input.value;
    let elParent = input.closest('div');
    const inputBorder = elParent.querySelector('input');
    if (valInput.length < length) {
        createText(elParent, txt, inputBorder);
        return;
    } else {
        removeP(elParent, inputBorder);
    }
}

function createText(elParent, txt, inputBorder){
    if (elParent.childElementCount >= 3) return;
    elParent.appendChild(createP(txt));
    inputBorder.style.border = '1px solid red';
}

function createP(txt){
    let p = document.createElement('p');
    p.classList.add('alert');
    p.textContent = txt;
    return p
}

function removeP(elParent, inputBorder){
    const p = elParent.querySelector('p.alert');
    elParent.removeChild(p);
    inputBorder.style.border = 'none';
}
