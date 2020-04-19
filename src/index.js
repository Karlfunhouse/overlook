import './css/base.scss';
import $ from 'jquery';
import Hotel from './Hotel';
import Guest from './Guest';
import Manager from './Manager';
import domUpdates from './domUpdates'
// import datepicker from 'js-datepicker'

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
  console.log('managerfetch');
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
      hotel.setUpHotel();
  })
    .then(() => {
      instantiateManager(rooms, bookings)
      // console.log(manager);
      displayManagerPage();
  })
    .catch(error => {
      console.log('Something is amiss with promise all', error)
    })
}

function guestFetch(guestId) {
  console.log('guestfetch');
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
      hotel.setUpHotel();
      // console.log('hotel', hotel);
    })
    .then(() => {
      let guest = instantiateGuest(guests, rooms, bookings, guestId)
      // console.log('100', guest)
      displayGuestPage(guest)
    })
    .catch(error => {
      console.log('Something is amiss with promise all', error)
    })
}

//EVENTS
$('.login-submit-js').on('click', (event) => checkLogin());
$('.book-a-room-button').on('click', (event) => domUpdates.showBookingPage());
$('.moon-icon-js').on('click', (event) => domUpdates.logOut());



function instantiateGuest(guests, rooms, bookings, guestId) {
  let guest = guests.users.find(guest => guest.id === +guestId)
  let guestBookings = bookings.bookings.filter(booking => booking.userID === +guestId)
  // let guestRooms = []
  let bookingInfo = guestBookings.forEach(booking => {
    rooms.rooms.forEach(room => {
      if (room.number === booking.roomNumber) {
        // guestRooms.push(room)
        booking.roomType = room.roomType,
        booking.bidet = room.bidet,
        booking.bedSize = room.bedSize,
        booking.numBeds = room.numBeds,
        booking.costPerNight = room.costPerNight
      }
    })
  })
  let currentGuest = new Guest(guest.id, guest.name, guestBookings)
  return currentGuest
}

function instantiateManager(rooms, bookings) {
  let bookingInfo = bookings.bookings.forEach(booking => {
    // console.log('booking', booking);
    rooms.rooms.forEach(room => {
      if (room.number === booking.roomNumber) {
        booking.roomType = room.roomType,
        booking.bidet = room.bidet,
        booking.bedSize = room.bedSize,
        booking.numBeds = room.numBeds,
        booking.costPerNight = room.costPerNight
      }
    })
  })
  let manager = new Manager(0, 'Boss', rooms, bookings)
  return manager
}

function displayGuestPage(guest) {
  guest.findFirstName()
  guest.findMyBookings();
  guest.calculateTotalSpent();
  domUpdates.hideLoginMenu();
  domUpdates.showGuestPage();
}

function displayManagerPage() {
  domUpdates.hideLoginMenu();
  domUpdates.showManagerPage();
}

function displayBookingMenu() {
  console.log('book button clicked');
  domUpdates.showBookingPage()
}

function findAvailableRooms() {
  let date = $('.selected-date').val()
}
