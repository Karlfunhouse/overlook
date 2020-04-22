import Guest from '../src/Guest';
import domUpdates from './domUpdates'
import {hotelFetch} from './index'
const moment = require('moment')
import $ from 'jquery';


class Manager extends Guest {
  constructor(guests, id, name, rooms, bookings) {
    super(id, name, rooms, bookings);
    this.guests = guests;
    this.id = id;
    this.name = name;
    this.bookings = bookings;
    this.rooms = rooms;
    this.today = moment().format('YYYY/MM/DD');
  };

  deleteBooking(hotel) {
    let date = $('.selected-date-manager').val().split('-').join('/')
      let bookingId = event.target.parentNode.id
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: +bookingId
        })
      })
      .then(response => console.log(response))
      .then(() => {hotelFetch(date)})
      .catch(err => console.log(err));
    };

  findGuestByName(name) {
    let guestName =  name.charAt(0).toUpperCase() + name.slice(1)
    let foundGuest = this.guests.users.find(guest => guest.name.includes(guestName))
    return foundGuest
  };

};

export default Manager;
