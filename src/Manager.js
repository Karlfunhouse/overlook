import Guest from '../src/Guest';
import domUpdates from './domUpdates'
const moment = require('moment')


class Manager extends Guest {
  constructor(id, name, rooms, bookings) {
    super(id, name, rooms, bookings);
    this.id = id;
    this.name = name;
    this.bookings = bookings;
    this.rooms = rooms;
    this.today = moment().format('YYYY/MM/DD');
  }

  deleteBooking(hotel) {
    console.log('delete button clicked');
      let bookingId = event.target.parentNode.id
      console.log('bookingid', bookingId);
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
      // .then(() => {hotelFetch(date)})
      .catch(err => console.log(err));

    }

  findGuestByName(name) {


  }


};

export default Manager;
