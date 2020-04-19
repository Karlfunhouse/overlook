import $ from 'jquery';
import Hotel from '../src/Hotel';
import Guest from '../src/Guest';
import Manager from '../src/Guest';

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
//Hotel
  displayTodaysBookings(todaySortedBookings) {
    todaySortedBookings.forEach(booking => {
      $('.bookings-today').append(`
        <article id=${booking.id} class='booking'>
        <h2>GuestID: ${booking.userID}</h2>
        <h4>Date: ${booking.date}<h4>
        <h3>Room # ${booking.roomNumber}</h3>
      </article>`)
    })
  },

  // <h3>Room Type: ${booking.roomInfo.roomType}</h3>
  // <h3>Bed Size: ${booking.roomInfo.bedSize}</h3>
  // <h3># of Beds: ${booking.roomInfo.numBeds}</h3>
  // <h3>$/Night: ${booking.roomInfo.costPerNight}</h3>
  // <h3>Bidet: ${booking.roomInfo.bidet}</h3>
  displayNumberOfAvailableRooms(allAvailableRooms) {
    $('.available-rooms').text(`Available Rooms: ${allAvailableRooms}`)
  },

  displayTodaysRevenue(todaysRevenue) {
    $('.todays-revenue').text(`Daily Revenue: $${todaysRevenue}`)
  },

  displayPercentageOfOccupiedRooms(percentageOfOccupiedRooms) {
    $('.occupied-rooms-percentage').text(`Occupancy: ${percentageOfOccupiedRooms}%`)
  },

  displayFilteredRoomsByType(filteredRooms) {

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
        <h3>Room Type: ${booking.roomInfo.roomType}</h3>
        <h3>Bed Size: ${booking.roomInfo.bedSize}</h3>
        <h3># of Beds: ${booking.roomInfo.numBeds}</h3>
        <h3>$/Night: ${booking.roomInfo.costPerNight}</h3>
        <h3>Bidet: ${booking.roomInfo.bidet}</h3>
      </article>`)
    })
  },

  displayTotalSpent(totalMoneySpent) {
    $('.money-spent').text(`You have spent $${totalMoneySpent} at Casa de la Luna`)
  },


}

export default domUpdates;
