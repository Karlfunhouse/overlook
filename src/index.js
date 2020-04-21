import './css/base.scss';
import $ from 'jquery';
import Hotel from './Hotel';
import Guest from './Guest';
import Manager from './Manager';
import domUpdates from './domUpdates'
var Moment = require('moment');

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
let todayDate = Moment().format('YYYY/MM/DD')
let calendarDateDisplay = Moment().format('YYYY/MM/DD').split('/').join('-')
let manager;
let guest;
let currentGuest;
$('.selected-date').val(calendarDateDisplay)
$('.selected-date-manager').val(calendarDateDisplay)
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
      hotel = new Hotel(guests, rooms, bookings, todayDate);
      console.log('todayDate', todayDate);
      hotel.setUpHotel();
    })
    .then(() => {
      instantiateManager(guests, rooms, bookings)
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
      hotel = new Hotel(guests, rooms, bookings, todayDate);
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


function managerGuestFetch(guestId) {
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
      hotel = new Hotel(guests, rooms, bookings, todayDate);
      hotel.setUpHotel();
      // console.log('hotel', hotel);
    })
    .then(() => {
      let guest = instantiateGuest(guests, rooms, bookings, guestId)
      displayGuestInfoForManager(guest)
    })
    .catch(error => {
      console.log('Something is amiss with promise all', error)
    })
}

export function hotelFetch(date) {
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
      guests = data[0];
      rooms = data[1];
      bookings = data[2];
    })
    .then(() => {
      hotel = new Hotel(guests, rooms, bookings, date);
      hotel.setUpHotel();
      console.log('hotel', hotel);
    })
    .catch(error => {
      console.log('Something is amiss with promise all', error)
    })
}

//EVENTS
$('.login-submit-js').on('click', (event) => checkLogin());
$('.book-a-room-button').on('click', (event) => domUpdates.showBookingPage());
$('.moon-icon-js').on('click', (event) => domUpdates.logOut());
$('.search-booking').on('click', (event) => instantiateHotel());
$('.search-booking-manager').on('click', (event) => managerSearchBookings());
$('.roomtype-dropdown').on('change', (event) => hotel.filterRoomsByType($('.roomtype-dropdown').val()))
$('body').on('click', '.book-room-button', (event) => bookARoom(hotel))
$('body').on('click', '.cancel-booking-button', (event) => deleteABooking())
$('.search-guest-button').on('click', (event) => findGuestInfo())


function instantiateGuest(guests, rooms, bookings, guestId) {
  let guest = guests.users.find(guest => guest.id === +guestId)
  let guestBookings = bookings.bookings.filter(booking => booking.userID === +guestId)
    console.log('guestBookings', guestBookings)
  let bookingInfo = guestBookings.forEach(booking => {
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
  currentGuest = new Guest(guest.id, guest.name, guestBookings)
  return currentGuest
}

function instantiateManager(guests, rooms, bookings) {
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
  manager = new Manager(guests, 0, 'Boss', rooms, bookings)
  return manager
}

function instantiateHotel() {
  let date = $('.selected-date').val().split('-').join('/');
  hotelFetch(date)
}

function managerSearchBookings() {
  let date = $('.selected-date-manager').val().split('-').join('/')
  hotelFetch(date)
  // console.log('manager date', date);
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

function findGuestInfo() {
  currentGuest = manager.findGuestByName($('.search-guest-input').val())
  console.log('guest id', currentGuest.id);
  managerGuestFetch(currentGuest.id)
  //instantiateGuest
}

function displayGuestInfoForManager(guest) {
  guest.findFirstName();
  guest.findMyBookings();
  guest.calculateTotalSpent();
  domUpdates.displayFoundGuestInfo(guest);
  console.log('current Guest', currentGuest);
}

function displayBookingMenu() {
  console.log('book button clicked');
  domUpdates.showBookingPage()
}

function bookARoom(hotel) {
  // let date = $('.selected-date').val().split('-').join('/');
  currentGuest.bookARoom(hotel)
}

function deleteABooking(hotel) {
  let guestId = currentGuest.id;
  // let date = $('.selected-date-manager').val().split('-').join('/')
  manager.deleteBooking(hotel, date)
}
