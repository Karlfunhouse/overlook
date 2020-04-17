// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import $ from 'jquery';
import Hotel from './Hotel';
import Guest from './Guest';
import Manager from './Manager';
import domUpdates from './domUpdates'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/moon-icon.svg'

//Global Variables
let usersData;
let roomsData;
let bookingsData;
let guests;
let rooms;
let bookings;
let hotel;
let date;
let manager;
let guest;

//FETCH
function managerFetch() {
  usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(data => data.json())
    .catch(error => console.log('userData error'))

  roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(data => data.json())
    .catch(error => console.log('roomsData error'))

  bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(data => data.json())
    .catch(error => console.log('bookingsData error'))

  Promise.all([usersData, roomsData, bookingsData])
    .then(data => {
      console.log('data',data);
      guests = data[0];
      console.log(guests);
      rooms = data[1];
      bookings = data[2];
      return guests
    })
    .then(() => {
      hotel = new Hotel(rooms, bookings, "2020/02/04");
      console.log('hotel', hotel);

      let manager = new Manager(0, 'Boss', rooms, bookings)
        // loadManagerPage(date)
        console.log(manager);
      // return
      // } else {
      //   instantiateGuest(guests, rooms, bookings, guestId)
        // let guest = guests.users.find(guest => guest.id === +guestId)
        // let guestBookings = bookings.bookings.filter(booking => booking.userID === +guestId)
        // let guestRooms = []
        // let bookingInfo = guestBookings.forEach(booking => {
        //   rooms.rooms.forEach(room => {
        //     if (room.number === booking.roomNumber) {
        //       // booking.roomInfo = {room}
        //       guestRooms.push(room)
        //     }
        //   })
        // })
        // let currentGuest = new Guest(guest.id, guest.name, guestRooms, guestBookings)
        // console.log('currentGuest', currentGuest);

  })
    .catch(error => {
      console.log('Something is amiss with promise all', error)
    })
}

function guestFetch(guestId) {
  usersData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(data => data.json())
    .catch(error => console.log('userData error'))

  roomsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(data => data.json())
    .catch(error => console.log('roomsData error'))

  bookingsData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(data => data.json())
    .catch(error => console.log('bookingsData error'))

  Promise.all([usersData, roomsData, bookingsData])
    .then(data => {
      console.log('data',data);
      guests = data[0];
      console.log(guests);
      rooms = data[1];
      bookings = data[2];
      return guests
    })
    .then(() => {
      hotel = new Hotel(rooms, bookings, "2020/02/04");
      console.log('hotel', hotel);
      // instantiateGuest(guests, rooms, bookings, guestId)
      let guest = guests.users.find(guest => guest.id === +guestId)
      let guestBookings = bookings.bookings.filter(booking => booking.userID === +guestId)
      let guestRooms = []
      let bookingInfo = guestBookings.forEach(booking => {
        rooms.rooms.forEach(room => {
          if (room.number === booking.roomNumber) {
            // booking.roomInfo = {room}
            guestRooms.push(room)
          }
        })
      })
      let currentGuest = new Guest(guest.id, guest.name, guestRooms, guestBookings)
      console.log('currentGuest', currentGuest);
    })
    .catch(error => {
      console.log('Something is amiss with promise all', error)
    })
}

//EVENTS
$('.login-submit-js').on('click', (event) => checkLogin());

//LOGIN
function checkLogin() {
  event.preventDefault();
  let userName = $('.username-js').val().toLowerCase();
  if (userName.toLowerCase() === 'manager' && $('.password-js').val() === 'overlook2020') {
    // let manager
    managerFetch();
    //load manager page
    // instantiateUser('manager')
  } else if ((userName.includes('customer') && $('.password-js').val() === 'overlook2020')) {
    // let guest;
    let splitUserName = userName.split('customer');
    let guestId = splitUserName[1];
    guestFetch(guestId)
    // loadGuestPage(guestId, guests)
    // instantiateUser('customer')
    //do guest stuff
  } else {
    //display login error
  }
}

function instantiateGuest(guests, rooms, bookings, guestId) {
  let guest = guests.users.find(guest => guest.id === +guestId)
  let guestBookings = bookings.bookings.filter(booking => booking.userID === +guestId)
  let guestRooms = []
  let bookingInfo = guestBookings.forEach(booking => {
    rooms.rooms.forEach(room => {
      if (room.number === booking.roomNumber) {
        // booking.roomInfo = {room}
        guestRooms.push(room)
      }
    })
  })
  let currentGuest = new Guest(guest.id, guest.name, guestRooms, guestBookings)
  console.log('currentGuest', currentGuest);
  return currentGuest

}


function loadGuestPage(guestId, guests) {
  // console.log(guestId);
  // let currentGuest = guests.users.find(guest => guest.id === guestId)
  // console.log(currentGuest);

  // guest = new Guest (currentGuest.id, currentGuest.name, rooms, bookings)
}

function loadManagerPage() {

}
