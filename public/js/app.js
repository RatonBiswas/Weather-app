// const { json } = require("express");

// console.log('this is client site loaded!!');
const weatherForm = document.querySelector('form');
const searchForm = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
// const messageThree = document.querySelector('#message-3');
// const messageFour = document.querySelector('#message-4');
// const messageFive = document.querySelector('#message-5');
// const messageSix = document.querySelector('#message-6');
// const messageSeven = document.querySelector('#message-7');
const countryflags = document.querySelector('img');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchForm.value;
    messageOne.textContent = 'Loading.......';
    messageTwo.textContent = '';
    countryflags.src = '';
    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                countryflags.src = 'https://www.countryflags.io/' + data.shortCode + '/flat/64.png';
                messageTwo.textContent = data.forecast;
                // messageThree.textContent = data.time;
                // messageFour.textContent = data.summary;
                // messageFive.textContent = data.humidity;
                // messageSix.textContent = data.icon;
                // messageSeven.textContent = data.windSpeed;
            }
        })
    })
})