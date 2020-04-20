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

  deleteBooking() {

  }

  findGuestByName(name) {


  }


};

export default Manager;
