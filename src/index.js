// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import $ from 'jquery';
import Hotel from './Hotel';
import Guest from './Guest';
import Manager from './Manager';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/moon-icon.svg'

//Global Variables
let usersData;
let roomsData;
let bookingsData;
let allGuests;
let date;

usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(data => data.json())
  .catch(error => console.log('userData error'))

roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .catch(error => console.log('roomsData error'))

bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .catch(error => console.log('bookingsData error'))

let hotelData = {'rooms': [], 'bookings': []};
Promise.all([usersData, roomsData, bookingsData])
  .then(data => {
    console.log('data',data);
    allGuests = data[0];
    hotelData['rooms'] = data[1];
    hotelData['bookings'] = data[2];
    return hotelData
  })
  .then(hotelData => {
    hotelData = new Hotel(hotelData.rooms, hotelData.bookings, date);
    // populateGuestView(hotelData);
    // populateManagerView(date);
  })
  .catch(error => {
    console.log('Something is amiss with promise all', error)
  });

function instantiateUser(userType, id) {
  if (userType === 'manager') {
    manager = new Manager(users, )
  } else {

  }
}

//EVENTS
$('.login-submit-js').on('click', (event) => checkLogin());

//LOGIN
function checkLogin() {
  event.preventDefault();
  let userName = $('.username-js').val().toLowerCase();
  if (userName.toLowerCase() === 'manager' && $('.password-js').val() === 'overlook2020') {
    //load manager page
    instantiateUser('manager')
  } else if ((userName.includes('customer') && $('.password-js').val() === 'overlook2020')) {
    let splitUserName = userName.split('customer');
    let guestId = splitUserName[1];
    instantiateUser('customer', guestId)
    //do guest stuff
  } else {
    //display login error
  }
}

function loadGuestPage() {

}
