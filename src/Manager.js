import Guest from '../src/Guest';

class Manager extends Guest {
  constructor(id, name, hotelData) {
    super(id, name, hotelData);
    this.id = id;
    this.name = name;
    this.hotelData = hotelData;
  }


};

export default Manager;
