const generatePasswordFormEl = document.getElementById("generatePasswordForm");
const passwordLengthAreaEl = document.getElementById("passwordLengthArea");
const outputPasswordEl = document.getElementById("outputPassword");

const copytoClipBoard= ()=> {
    if(outputPasswordEl.innerText==""){
        alert("Password is empty");
    }else{
        navigator.clipboard.writeText(outputPasswordEl.innerText)
        .then(()=>{
            //alert("Copied to clipboard")
            Toastify({
                text: `Copied to clipboard`,
                gravity: "bottom",
                position: "center",
                className: "toast-message",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        })
        .catch(()=>{
            Toastify({
                text: `Could Not Copied`,
                gravity: "bottom",
                position: "center",
                style: {
                  
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        });
    }
};

const changePasswordLength =(val)=>{
    passwordLengthAreaEl.innerText= `Password Length: ${val}`;
}

const renderString =(length,isUpperCase,isNumbers,isSymbols)=>{
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseLetters = isUpperCase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    const numbers = isNumbers ? "0123456789" : "";
    const symbols = isSymbols ? "!@#$%^&*()_+" : "";

    const passwordChar = lowerCaseLetters + upperCaseLetters + numbers + symbols;
    let password = "";

    for(let i=0;i<length;i++){
        const charIndex = Math.floor(Math.random()*passwordChar.length);
        password+= passwordChar[charIndex];
    }
    return password;
}

const generate =(event)=>{
    event.preventDefault();
    const formData = new FormData(generatePasswordFormEl);
    const rangeValue = formData.get('range');
    const upperCase = formData.get('uppercase');
    const numbers = formData.get('numbers');
    const symbols = formData.get('symbols');

    const outputString = renderString(rangeValue,upperCase,numbers,symbols);
    outputPasswordEl.innerText= outputString;
};