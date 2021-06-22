console.log('Client side JS file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//       console.log(data);
//   })
// })



const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchElement.value;

    messageOne.textContent = 'Loading... Please wait...';
    messageTwo.textContent = '';

    fetch('/weather?address='+ location).then((response) => {
      response.json().then((data) => {
        console.log(data);
        if(data.error) {
            messageOne.textContent = data.error;
        } else {
           messageOne.textContent = data.location;
           messageTwo.textContent = data.forecast;
        }
      })
    })

})