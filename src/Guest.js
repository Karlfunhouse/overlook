class Guest {
  constructor(id, name, hotelData) {
    this.id = id;
    this.name = name;
    this.firstName = this.findFirstName();
    

  }

  findFirstName() {
    let firstName = this.name.split(' ');
    return firstName[0]
  }
};

export default Guest;
