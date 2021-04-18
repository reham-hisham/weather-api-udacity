/* Global Variables */
const key = '0a6db9ee1c35af77d4dda59129f007ee';

const base = `https://api.openweathermap.org/data/2.5/weather?zip=`;





 




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    document.getElementById('generate').addEventListener('click', doaction);
    




function doaction (e){
    e.preventDefault();
Temperature()



}

async function Temperature() {
    try {
    let zipcode = document.querySelector('#zip').value;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${key}&units=metric`)
    let getcontent = document.querySelector('#feelings').value
   
      if (!zipcode){
          alert("please enter zip code");
          return;
      }
        const data = await response.json();

        
        postData('/data', {temperature:data.main.temp, date: newDate, content: getcontent } ) 
        console.log(data.main.temp)
        console.log(newDate)
       
      update();
       

    }
    catch(error) {
        console.log('error here =>', error);
    }
}
// post 
const postData = async(url = '', data = {}) => {
    try{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            temp: data.temperature,
            date: data.date,
            content: data.content
        })
    });
   
    
        const newData = await response.json();
   
        return newData;
   }   catch(e){
            console.log("the  error is here =>", e);
    
}}
const getdata = async function (url){
    let res = await fetch(url)
    try {
        let data = res.json();
        console.log(data);
        
        return data;
      } catch(err){
        console.log(err);
      }
     
}
async function update(){


         let data= await getdata("/data")
     console.log(data)
          document.getElementById('date').innerHTML= data.data;
          document.getElementById('temp').innerHTML = data.temp;
          document.getElementById('content').innerHTML = data.content;
             
            } 
