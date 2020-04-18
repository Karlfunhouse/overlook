import './css/base.scss';
import $ from 'jquery';
import Hotel from './Hotel';
import Guest from './Guest';
import Manager from './Manager';
import domUpdates from './domUpdates'

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

//LOGIN
function checkLogin() {
  event.preventDefault();
  let userName = $('.username-js').val().toLowerCase();
  if (userName.toLowerCase() === 'manager' && $('.password-js').val() === 'overlook2020') {
    managerFetch();
  } else if ((userName.includes('customer') && $('.password-js').val() === 'overlook2020')) {
    let splitUserName = userName.split('customer');
    let guestId = splitUserName[1];
    guestFetch(guestId)
  } else {
    domUpdates.displayLoginError()
  }
}

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
      console.log(manager);
      //Load Manager Page
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
      hotel.setUpHotel()
      console.log('hotel', hotel);
    })
    .then(() => {
      let guest = instantiateGuest(guests, rooms, bookings, guestId)
      console.log('100', guest)
      displayGuestPage(guest)
    })
    .catch(error => {
      console.log('Something is amiss with promise all', error)
    })
}

//EVENTS
$('.login-submit-js').on('click', (event) => checkLogin());



function instantiateGuest(guests, rooms, bookings, guestId) {
  let guest = guests.users.find(guest => guest.id === +guestId)
  let guestBookings = bookings.bookings.filter(booking => booking.userID === +guestId)
  let guestRooms = []
  let bookingInfo = guestBookings.forEach(booking => {
    rooms.rooms.forEach(room => {
      if (room.number === booking.roomNumber) {
        // guestRooms.push(room)
        booking.roomInfo = room
      }
    })
  })
  let currentGuest = new Guest(guest.id, guest.name, guestBookings)
  // console.log('currentGuest', currentGuest);
  // domUpdates.loadGuestPage(currentGuest)
  return currentGuest
}

function displayGuestPage(guest) {
  guest.findFirstName()
  // console.log('firstName', guest.findFirstName())
  guest.findMyBookings();
  // console.log('bookings', guest.findMyBookings());
  guest.calculateTotalSpent();
  // console.log('total spent', guest.calculateTotalSpent());
  domUpdates.hideLoginMenu();
  domUpdates.showGuestPage();
}



function loadManagerPage() {

}
