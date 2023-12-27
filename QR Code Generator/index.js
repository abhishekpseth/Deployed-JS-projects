const qrContainerEl = document.getElementById("qrContainer");
const qrImageEl = document.getElementById("qrImage");
const qrFormEl = document.getElementById("qrForm");
const generateBtnEl = document.getElementById("generateBtn");

const renderQr =(url)=>{
    if(!url)return;
    generateBtnEl.innerText = "Generating Qr Code...";
    qrImageEl.src= url;

    const onImageLoad = () => {
        const interval = setInterval(() => {
            qrContainerEl.classList.remove("hide");
            clearInterval(interval);
            generateBtnEl.innerText = "Genrate QR Code";
        }, 300);
    };

    qrImageEl.addEventListener("load", onImageLoad);
};

const generator =(event)=>{
    event.preventDefault();
    const formData = new FormData(qrFormEl);
    const userSearch = formData.get('text');
    const url= `http://api.qrserver.com/v1/create-qr-code/?data=${userSearch} &size=130x130`;
    renderQr(url);
}