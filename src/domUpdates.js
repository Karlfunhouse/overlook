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

//Hotel
  displayTodaysBookings(todaySortedBookings) {
    todaySortedBookings.forEach(booking => {
      $('.bookings-today').append(`
        <article id=${booking.id} class='booking'>
        <h2>Room # ${booking.roomNumber}</h2>
        <h3>GuestID: ${booking.userID}</h3>
        <h4>Date: ${booking.date}<h4>
        <h4>Room Type: ${booking.roomType}</h4>
        <h4>Bed Size: ${booking.bedSize}</h4>
        <h4># of Beds: ${booking.numBeds}</h4>
        <h4>Cost/Night $${booking.costPerNight}</h4>
        <h4>Bidet: ${booking.bidet}</h4>
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
        <h3>$/Night: ${booking.costPerNight}</h3>
        <h3>Bidet: ${booking.bidet}</h3>
      </article>`)
    })
  },

  displayTotalSpent(totalMoneySpent) {
    $('.money-spent').text(`You have spent $${totalMoneySpent} at Casa de la Luna`)
  },


}

export default domUpdates;
