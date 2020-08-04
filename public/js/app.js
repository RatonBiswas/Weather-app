// const { json } = require("express");

console.log('this is client site loaded!!');
const weatherForm = document.querySelector('form');
const searchForm = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchForm.value;
    messageOne.textContent = 'Loading.......';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})