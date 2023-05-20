const sendButton = document.getElementById("sendButton");
const tcno = document.getElementById("tcno");
const sife = document.getElementById("sifre");

let data = {};
let cikacakOdalarDizi = [];

// Send data to Puppeteer
sendButton.addEventListener("click",()=>{    
    data = {
        "tcno" : tcno.value,
        "sifre" : sifre.value,
    }
    window.electronAPI.sendInfo(data);
})

// Get error from main process
window.electronAPI.getError((_event, value) => {
    console.log(value);
})
