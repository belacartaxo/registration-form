let validValue = [];
const inputs = {
    inputName: document.querySelector('#name'),
    inputLastName: document.querySelector('#last-name'),
    inputEmail: document.querySelector('#email'),
    inputPhoneNumber: document.querySelector('#number'),
    inputPassword: document.querySelector('#password'),
    inputConfirmPassword: document.querySelector('#confirm-password'),
}

const elements = {
    inputGender: document.getElementsByName('gender'),
    submit: document.querySelector('#submit-form'),
    emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    phoneRegex: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
}

elements.submit.addEventListener('click', (event)=>{
    const emptyImput = validateEmptyInput();
    const inputGenderValue = validateInputGender();
    const resultValidValue = inputIsValid();
    event.preventDefault();

    if (emptyImput !== true && inputGenderValue === true && resultValidValue === true){
        document.getElementById('registration-form').submit();
    }
})

inputs.inputName.addEventListener('input', ()=>{
    validate(inputs.inputName, `Name must be at least 3 characters`, 3, 0);
})

inputs.inputLastName.addEventListener('input', ()=>{
    validate(inputs.inputLastName, `Name must be at least 3 characters`, 3, 1);
})

inputs.inputEmail.addEventListener('input', ()=>{
    let elParent = inputs.inputEmail.closest('div');
    const inputBorder = elParent.querySelector('input');
    if(!elements.emailRegex.test(inputs.inputEmail.value)){ 
        removeP(elParent, inputBorder); 
        createText(elParent, `Invalid email`, inputBorder);
        validValue[2] = false;
        return;
    } else {
        validValue[2] = true;
        removeP(elParent, inputBorder);
    }
})

inputs.inputPhoneNumber.addEventListener('input', ()=>{
    let elParent = inputs.inputPhoneNumber.closest('div');
    const inputBorder = elParent.querySelector('input');
    if(!elements.phoneRegex.test(inputs.inputPhoneNumber.value)){  
        removeP(elParent, inputBorder);
        createText(elParent, `Invalid phone number`, inputBorder);
        validValue[3] = false;
        return;
    } else {
        validValue[3] = true;
        removeP(elParent, inputBorder);
    }
})

inputs.inputPassword.addEventListener('input', ()=>{
    validate(inputs.inputPassword, `Password must be at least 8 characters`, 8, 4);
})

inputs.inputConfirmPassword.addEventListener('input', ()=>{
    let elParent = inputs.inputConfirmPassword.closest('div');
    const inputBorder = elParent.querySelector('input');
    const valInputConfirmPassword = inputs.inputConfirmPassword.value
    if(valInputConfirmPassword !== inputs.inputPassword.value || valInputConfirmPassword.length < 8){  
        removeP(elParent, inputBorder);
        createText(elParent, `Passwords must match and be at least 8 characters`, inputBorder);
        validValue[5] = false;
        return;
    } else {
        validValue[5] = true;
        removeP(elParent, inputBorder);
    }
})

function validate(input, txt, length, i){
    const valInput = input.value;
    let elParent = input.closest('div');
    const inputBorder = elParent.querySelector('input');
    if (valInput.length < length) {
        removeP(elParent, inputBorder);
        createText(elParent, txt, inputBorder);
        validValue[i] = false;
        return;
    } else {
        validValue[i] = true;
        removeP(elParent, inputBorder);
    }
}

function validateInputGender(){
    let elParent = document.querySelector('#div-gender');
    let checked = false;
    if (elParent.childElementCount < 3) {
        elParent.appendChild(createP('The gender field must be filled in'));
    }

    for (let i of elements.inputGender){
        if(i.checked === true){
            checked = true;
            removeP(elParent, undefined);
        }
    }
    return checked;
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
    if(elParent.getElementsByTagName('p').length===0) return;
    const p = elParent.querySelector('p.alert');
    elParent.removeChild(p);
    if (inputBorder !== undefined) inputBorder.style.border = 'none';
}

function validateEmptyInput(){
    let empty = false
    for(let inp in inputs){
        let value = inputs[inp].value;
        value = value.trim()
        if(value.length === 0){
            let elParent = inputs[inp].closest('div');
            const inputBorder = elParent.querySelector('input');
            createText(elParent, `Empty field`, inputBorder);
            empty = true;
        }
    }
    return empty;
}

function inputIsValid(){
    if (validValue.length === 0) return false;
    if (typeof validValue === 'object'){
        for(let i of validValue){
            if (i !== true){
                return false;
            }
        }
    }
    return true;
}
