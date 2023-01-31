const inputName = document.querySelector('#name');
const inputLastName = document.querySelector('#last-name');

const inputPassword = document.querySelector('#password');
const inputConfirmPassword = document.querySelector('#confirm-password');

/*
    ver se o nome/sobrenome foi digitado e se ele tem pelo menos 3 caracteres
    validação de email, ver se foi digitado
    numero de telefone válido
    senha com no mínimo 8 caracteres, ver se foi digitado
    repita senhas, compativeis
    solicitar o gênero
*/
inputName.addEventListener('input', ()=>{
    validatName('Name');
})

inputLastName.addEventListener('input', ()=>{
    validatName(inputLastName.value, inputLastName, 'Lastame');
})

// EMAIL

//PHONE-NUMBER

inputPassword.addEventListener('input', ()=>{
    if(inputPassword.length<8){ //mensagem de erro

    }
})

inputConfirmPassword.addEventListener('input', ()=>{
    if(inputConfirmPassword !== inputPassword){ //mensagem falando que tem que ser igual

    }
})

function validatName(val, input, txt){
    if (val.length <3) {
        createText(input, `${txt} must be at least 3 characters`);
        return;
    } else {
        removeP(input, createP(`${txt} must be at least 3 characters`));
    }
}

function createText(el, txt){
    let elParent = el.closest('div');
    if (elParent.childElementCount >= 3) return;
    elParent.appendChild(createP(txt));
}

function createP(txt){
    let p = document.createElement('p');
    p.classList.add('alert');
    p.textContent = txt;
    return p
}

function removeP(el, p){
    let elParent = el.closest('div');
    console.log(elParent, p)
    elParent.removeChild(p);
}
