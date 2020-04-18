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

  loadManagerPage() {

  },

  showGuestPage() {
    $('.user-dashboard').removeClass('hide');
  },
//Hotel
  displayTodaysBookings(todaysBookings) {

  },

  displayAvailableRooms(allAvailableRooms) {

  },

  displayTodaysRevenue(todaysRevenue) {

  },

  displayPercentageOfOccupiedRooms(percentageOfOccupiedRooms) {

  },

  displayFilteredRoomsByType(filteredRooms) {

  },
//Guest
  displayFirstName(firstName) {
    $('.user-name').text(`Welcome Back ${firstName}`)
  },

  displayMyBookings(myBookings) {
    $('.my-bookings').html(myBookings.forEach(booking => {
      `<article id=${booking.id} class='booking'>
        <h4>${booking.date}<h4>
        <h3>${booking.roomNumber}</h3>
      </article>`
    })
  )
  },

  displayTotalSpent(totalMoneySpent) {
    $('.money-spent').text(`$${totalMoneySpent}`)
  },


}

export default domUpdates;
