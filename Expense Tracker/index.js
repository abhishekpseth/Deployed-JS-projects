let totalTransactions =0;
let globalBalance =0;
let globalEarning =0;
let globalExpense =0;
let buttonPressed;
let extraOptions= 'hidden';
let isEditMode= false;
let Id;

const formEl = document.getElementById("operations");
const earningValueEl = document.getElementById("earningValue");
const expenseValueEl = document.getElementById("expenseValue");
const balanceValueEl = document.getElementById("balanceValue");
const allTransactonsEl = document.getElementById("allTransactons");

const inputTextEl = document.getElementById("inputText");
const inputValueEl = document.getElementById("inputValue");


const generateUnitTransaction =(transactionArea,transactionAmount,typeOfTransaction) => {
    return `<div class="unit-transaction" onclick="showExtraOptions(this)">
    <div class="normal-view">
        <div
        class="details"
        >
        <div class="expense-name">${transactionArea}</div>
        <div class="expense-amount">+₹${transactionAmount}</div>
        </div>
        <div class="indicator" style="background-color: ${(typeOfTransaction==='earning')?'green':'red'}">${(typeOfTransaction==='earning')?'C':'D'}</div>
    </div>

    <div id="extraOptions" class="extra-options hide">
        <i class="fa-solid fa-pen fa-2xs" id="unitEdits"></i>
        <i class="fa-solid fa-trash fa-2xs" id="unitTrash"></i>
    </div>
    </div>`;
}

const createNewTransaction = (inputText,value) => {
    totalTransactions = totalTransactions +1; // inc th count of total transaction, later used to give ids of unit transactions
    let unitTransaction;
    if(buttonPressed==='earning'){
        globalEarning += value;
        earningValueEl.innerText= `₹${globalEarning}`;
        unitTransaction= generateUnitTransaction(inputText,value,buttonPressed);
    }else{
        globalExpense+= +value;
        expenseValueEl.innerText= `₹${globalExpense}`;
        unitTransaction= generateUnitTransaction(inputText,value,buttonPressed);
    }
    let child= document.createElement("div");
	child.innerHTML=unitTransaction;
    allTransactonsEl.appendChild(child);

    globalBalance= globalEarning-globalExpense;
    balanceValueEl.innerText = `₹ ${globalBalance}`;

    // clearing input fields
    inputTextEl.value="";
    inputValueEl.value="";
}

const updateTransaction =(inputText,value)=>{
    if(buttonPressed==='earning'){
        Id.children[0].children[0].children[0].innerText= inputText;
        Id.children[0].children[0].children[1].innerText= `+₹${value}`;
        Id.children[0].children[1].innerHTML= '<div class="indicator" style="background-color: green">C</div>';
        globalEarning = globalEarning+value;
        globalBalance = globalBalance+value;
    }else{
        Id.children[0].children[0].children[0].innerText= inputText;
        Id.children[0].children[0].children[1].innerText= `-₹${value}`;
        Id.children[0].children[1].innerHTML= '<div class="indicator" style="background-color: red">D</div>';
        globalExpense = globalExpense+value;
        globalBalance = globalBalance-value;
    }
    balanceValueEl.innerText = `₹ ${globalBalance}`;
    earningValueEl.innerText= `₹${globalEarning}`;
    expenseValueEl.innerText= `₹${globalExpense}`;

    // clearing input fields
    inputTextEl.value="";
    inputValueEl.value="";
    
    // edit mode off
    isEditMode= false;
} 

const showExtraOptions =(e)=>{
    if(extraOptions==='hidden'){
        e.children[1].classList.remove("hide");
        extraOptions= 'shown';
    }else{
        e.children[1].classList.add("hide");
        extraOptions='hidden';
    }
}

const transaction =(event)=>{
    event.preventDefault();
    const formData = new FormData(formEl);
    const inputText = formData.get('inputText');
    const value = +formData.get('value');
    if(isEditMode ===false){
        createNewTransaction(inputText,value);
    }else{
        updateTransaction(inputText,value);
    }
}  

allTransactonsEl.addEventListener('click',function(e){ // for Deleting and Editing
    if(e.target.id==='unitTrash'){
        e.parentElement.remove();
        
    }else if(e.target.id==='unitEdits'){
        const typeOfTransaction = e.target.parentElement.parentElement.children[0].children[1].innerText
        const inputText = e.target.parentElement.parentElement.children[0].children[0].children[0].innerText;
        const amount= +e.target.parentElement.parentElement.children[0].children[0].children[1].innerText.split("₹")[1];

        inputTextEl.value= inputText;
        inputValueEl.value = amount;

        isEditMode=true;

        Id= e.target.parentElement.parentElement;

        if(typeOfTransaction=='C'){
            globalEarning = globalEarning-amount;
            globalBalance = globalBalance-amount;
        }else{
            globalExpense = globalExpense-amount;
            globalBalance = globalBalance+amount;
        }
    }
},false);