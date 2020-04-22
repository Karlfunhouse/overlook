import domUpdates from './domUpdates'
import Hotel from './Hotel'
import {hotelFetch} from './index'
import $ from 'jquery';
var Moment = require('moment');



class Guest {
  constructor(id, name, bookings) {
    this.id = id;
    this.name = name;
    this.bookings = bookings;
    this.firstName = this.findFirstName();
    this.myBookings = this.findMyBookings;
  };

  findFirstName() {
    let firstName = this.name.split(' ');
    domUpdates.displayFirstName(firstName[0]);
    return firstName[0]
  };

  findMyBookings() {
    let myBookings = this.bookings.filter(booking => booking.userID === this.id)
    domUpdates.displayMyBookings(myBookings);
    domUpdates.displayFoundGuestInfo(this, myBookings)
    return myBookings
  };

  calculateTotalSpent() {
    let totalMoneySpent = this.bookings.filter(booking => booking.userID === this.id)
    .reduce((totalSpent, booking) => {
      totalSpent += booking.costPerNight
      return totalSpent
    }, 0)
    domUpdates.displayTotalSpent(totalMoneySpent.toFixed(2))
    return +totalMoneySpent.toFixed(2)
  };

  bookARoom(hotel, date) {
    let todayDate = Moment().format('YYYY/MM/DD')
    if(date < todayDate) {
      alert('Please Select A Future Date')
      return
    }
    console.log('book room button clicked');
      let bookingId = event.target.parentNode.id
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": this.id,
        "date": hotel.date,
        "roomNumber": +bookingId,
      }),
    })
    .then((response) => response.json())
    .then(() => {hotelFetch(date)})
    .then((data) => console.log('Success:', data))
    .catch((error) => console.error('Error:', error))
  };

};

export default Guest;
