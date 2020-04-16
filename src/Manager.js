import Guest from '../src/Guest';

class Manager extends Guest {
  constructor(user, name, hotelData) {
    super(id, name, hotelData);
    this.id = user.id;
    this.name = user.name;
    this.hotelData = hotelData;
  }

  deleteBooking() {

  }

  findGuestById() {
    
  }


};

export default Manager;
