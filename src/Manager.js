import Guest from '../src/Guest';
import domUpdates from './domUpdates'


class Manager extends Guest {
  constructor(id, name, rooms, bookings) {
    super(id, name, rooms, bookings);
    this.id = id;
    this.name = name;
    this.bookings = bookings;
    this.rooms = rooms;
  }

  deleteBooking() {

  }

  findGuestByName(name) {


  }


};

export default Manager;
