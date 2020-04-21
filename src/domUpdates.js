import $ from 'jquery';
import Hotel from '../src/Hotel';
import Guest from '../src/Guest';
import Manager from '../src/Guest';
var Moment = require('moment');
let todayDate = Moment().format('YYYY/MM/DD')

let domUpdates = {

  displayLoginError() {
    $('.login-error').text('Invalid Username or Password');
    $('.username-js').val('username');
    $('.password-js').val('password');
  },

  hideLoginMenu() {
    $('.login-form').addClass('hide')
  },

  showManagerPage() {
    $('.manager-dashboard').removeClass('hide');
    $('.user-name').text('Welcome Boss')
  },

  showGuestPage() {
    $('.user-dashboard').removeClass('hide');
  },

  showBookingPage() {
    $('.user-dashboard').addClass('hide');
    $('.manager-dashboard').addClass('hide');
    $('.booking-display').removeClass('hide');
  },

  logOut() {
    $('.user-dashboard').addClass('hide');
    $('.manager-dashboard').addClass('hide');
    $('.booking-display').addClass('hide');
    $('.login-form').removeClass('hide')
  },

//MANAGER
  displayFoundGuestInfo(guest) {
    $('.found-guest-bookings').text('');
    $('.found-guest-bookings').removeClass('hide');
    $('.book-a-room-button').addClass('hide');
    $('.found-guest-bookings').append(`
      <div class='guest-name'>${guest.name}</div>
      <div class='guest-spendings'>Total Spent: $${guest.calculateTotalSpent()}</div>`)
    guest.bookings.forEach(booking => {
      if(booking.date >= todayDate) {
      $('.found-guest-bookings').append(
        `<article id=${booking.id} class='booking'>
          <h4>Date: ${booking.date}<h4>
          <h3>Room #: ${booking.roomNumber}</h3>
          <h3>Room Type: ${booking.roomType}</h3>
          <h3>Bed Size: ${booking.bedSize}</h3>
          <h3># of Beds: ${booking.numBeds}</h3>
          <h3>$/Night: $${booking.costPerNight}</h3>
          <h3>Bidet: ${booking.bidet}</h3>
          <button class="cancel-booking-button">CANCEL RESERVATION</button>
        </article>`)
      } else {
      $('.found-guest-bookings').append(
        `<article id=${booking.id} class='booking'>
          <h4>Date: ${booking.date}<h4>
          <h3>Room #: ${booking.roomNumber}</h3>
          <h3>Room Type: ${booking.roomType}</h3>
          <h3>Bed Size: ${booking.bedSize}</h3>
          <h3># of Beds: ${booking.numBeds}</h3>
          <h3>$/Night: $${booking.costPerNight}</h3>
          <h3>Bidet: ${booking.bidet}</h3>
          <h3>(Past Booking)</h3>
        </article>`)}
    })
  },

//Hotel
  displayTodaysBookings(todaySortedBookings) {
    $('.bookings-today').text('')
    todaySortedBookings.forEach(booking => {
      if(booking.date >= todayDate) {
      $('.bookings-today').append(
        `<article id=${booking.id} class='booking'>
          <h4>Date: ${booking.date}<h4>
          <h3>Room #: ${booking.roomNumber}</h3>
          <h3>Room Type: ${booking.roomType}</h3>
          <h3>Bed Size: ${booking.bedSize}</h3>
          <h3># of Beds: ${booking.numBeds}</h3>
          <h3>$/Night: $${booking.costPerNight}</h3>
          <h3>Bidet: ${booking.bidet}</h3>
          <button class="cancel-booking-button">CANCEL RESERVATION</button>
        </article>`)
      } else { $('.bookings-today').append(`
        <article id=${booking.id} class='booking'>
        <h2>Room # ${booking.roomNumber}</h2>
        <h3>GuestID: ${booking.userID}</h3>
        <h3>Date: ${booking.date}</h3>
        <h3>Room Type: ${booking.roomType}</h3>
        <h3>Bed Size: ${booking.bedSize}</h3>
        <h3># of Beds: ${booking.numBeds}</h3>
        <h3>Cost/Night $${booking.costPerNight}</h3>
        <h3>Bidet: ${booking.bidet}</h3>
        <h3>(Past Booking)</h3>
      </article>`)
      }
    })
  },

  displayNumberOfAvailableRooms(allAvailableRooms) {
    $('.available-rooms').text(`Available Rooms: ${allAvailableRooms}`)
  },

  displayOpenRoomsForToday(todaysOpenRooms) {
    $('.available-room-numbers').text(`Open Room #'s: ${todaysOpenRooms}`)
  },

  displayTodaysRevenue(todaysRevenue) {
    $('.todays-revenue').text(`Daily Revenue: $${todaysRevenue}`)
  },

  displayPercentageOfOccupiedRooms(percentageOfOccupiedRooms) {
    $('.occupied-rooms-percentage').text(`Occupancy: ${percentageOfOccupiedRooms}%`)
  },

  displayFilteredRoomsByType(filteredRooms) {
    $('.available-bookings').text('')
    filteredRooms.forEach(room => {
      $('.available-bookings').append(
        `<article class='booking' id="${room.number}">
          <h3>Room #: ${room.number}</h3>
          <h3>Room Type: ${room.roomType}</h3>
          <h3>Bed Size: ${room.bedSize}</h3>
          <h3># of Beds: ${room.numBeds}</h3>
          <h3>$/Night: $${room.costPerNight}</h3>
          <h3>Bidet: ${room.bidet}</h3>
          <button class="book-room-button">BOOK ROOM</button>
        </article>`
      )
    })
  },

  displayApologyMessage() {
    $('.available-bookings').text('')
    $('.available-bookings').text('We are Super Sorry, but we don\'t have any rooms that match your search criteria.  Please change your search and try again!')
  },
//Guest
  displayFirstName(firstName) {
    $('.user-name').text(`Welcome Back ${firstName}`)
  },

  displayMyBookings(myBookings) {
    myBookings.forEach(booking => {
      $('.my-bookings').append(
      `<article id=${booking.id} class='booking'>
        <h4>Date: ${booking.date}<h4>
        <h3>Room #: ${booking.roomNumber}</h3>
        <h3>Room Type: ${booking.roomType}</h3>
        <h3>Bed Size: ${booking.bedSize}</h3>
        <h3># of Beds: ${booking.numBeds}</h3>
        <h3>$/Night: $${booking.costPerNight}</h3>
        <h3>Bidet: ${booking.bidet}</h3>
      </article>`)
    })
  },

  displayTotalSpent(totalMoneySpent) {
    $('.money-spent').text(`You have spent $${totalMoneySpent} at Casa de la Luna`)
  },

  displayAvailableRooms(todaysOpenRooms) {
    $('.available-bookings').text('')
    todaysOpenRooms.forEach(room => {
      $('.available-bookings').append(
        `<article class='booking' id=${room.number}>
          <h3>Room #: ${room.number}</h3>
          <h3>Room Type: ${room.roomType}</h3>
          <h3>Bed Size: ${room.bedSize}</h3>
          <h3># of Beds: ${room.numBeds}</h3>
          <h3>$/Night: $${room.costPerNight}</h3>
          <h3>Bidet: ${room.bidet}</h3>
          <button class="book-room-button">BOOK ROOM</button>
        </article>`
      )
    })
  },


}

export default domUpdates;
