let toggled= false;
let dateOfBirth;

const settingIconEl= document.getElementById("settingIcon");
const settingContentEl= document.getElementById("settingContent");
const initialTextEl= document.getElementById("initialText");
const afterDOBBtnTxtEl= document.getElementById("afterDOBBtnTxt");
const dobButtonEl= document.getElementById("dobButton");
const dobInputEl= document.getElementById("dobInput");

// for updating date value with values calculated by dateDiff
const yearEl= document.getElementById("year");
const monthEl= document.getElementById("month");
const dateEl= document.getElementById("date");
const hourEl= document.getElementById("hour");
const minuteEl= document.getElementById("minute");
const secondEl= document.getElementById("second");

const SettingToggle = () => {  
  if(toggled){ // if toggled is true, means already slided
    settingContentEl.classList.add("hide");
  }else{ // if toggled is false, means it's in initial position
    settingContentEl.classList.remove("hide");
  }
  toggled = !toggled;
};  

const dateDiff = (dateOfBirth,currentDate) => {
  let y,m,d,h,min,sec;
  let py= currentDate.getFullYear(), by= dateOfBirth.getFullYear();
  let pm= currentDate.getMonth()+1, bm= dateOfBirth.getMonth()+1; // kyunki iss formula me month 0-11 tk hota hai
  let pd= currentDate.getDate(), bd= dateOfBirth.getDate();

  let md= [31,28,31,30,31,30,31,31,30,31,30,31];
  y= py-by;
  if (pm < bm || (pm==bm && pd<bd))
  {
    y--;
    m = 12 - (bm - pm);       
  }else{
    m = pm - bm;
  }

  if (pd < bd)
  {
    m--;
    d = md[pm - 1] - (bd - pd);
  }
  else
  {
  	d = pd - bd;
  }

  h= currentDate.getHours();
  min= currentDate.getMinutes();
  sec= currentDate.getSeconds();
  const data= [y,m,d,h,min,sec]; //y,m,d,h,min,sec
  return data;
}

const hasNegativeElement =(diffData) =>{
  for (let i = 0; i < diffData.length; i++) {
    if (diffData[i] < 0) {
      return true; // Return true if a negative element is found
    }
  }
  return false; 
}

const makeTwoDigitNumber=(number)=>{
  return (number>=0 && number<=10)? `0${number}`:number;
}

const updateLife =(diffData)=>{
  yearEl.innerHTML= makeTwoDigitNumber(diffData[0]);
  monthEl.innerHTML= makeTwoDigitNumber(diffData[1]);
  dateEl.innerHTML= makeTwoDigitNumber(diffData[2]);
  hourEl.innerHTML= makeTwoDigitNumber(diffData[3]);
  minuteEl.innerHTML= makeTwoDigitNumber(diffData[4]);
  secondEl.innerHTML= makeTwoDigitNumber(diffData[5]);
}

const updateAge =()=> {
  const currentDate= new Date();
  const diffData = dateDiff(dateOfBirth,currentDate);
  
  initialTextEl.classList.add("hide");
  afterDOBBtnTxtEl.classList.remove("hide");
  updateLife(diffData);
}

const showTimer = () => {
  const dateString = dobInputEl.value;
  dateOfBirth= new Date(dateString);

  if(dateString.trim() == ""){ // no dob is selected
    alert('Please Select Date of Birth');
  }
  else 
  { // if DOB is entered then pls proceed and check if DOB entered is earlier of later than current date
    let currentDate= new Date();
    let diffData = dateDiff(dateOfBirth,currentDate);
      
    if(hasNegativeElement(diffData)){ 
      alert('Date of Birth can not be after today\'s date');
    }else{ // if DOB entered is earlier than today then change the main text show data fetched from dataDiff
      setInterval(() => updateAge(), 1000);
    }
  }
}

settingIconEl.addEventListener("click",SettingToggle);
dobButtonEl.addEventListener("click",showTimer);