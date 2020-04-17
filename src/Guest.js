import domUpdates from './domUpdates'

class Guest {
  constructor(id, name, rooms, bookings) {
    this.id = id;
    this.name = name;
    this.rooms = rooms;
    this.bookings = bookings;
    this.firstName = this.findFirstName();
    this.myBookings = this.findMyBookings;
  }

  findFirstName() {
    let firstName = this.name.split(' ');
    // domUpdates.displayFirstName(firstName);
    return firstName[0]
  }

  findMyBookings() {
    let myBookings = this.bookings.filter(booking => booking.userID === this.id)
    //domUpdates.displayMyBookings(myBookings);
    return myBookings

  }

  calculateTotalSpent() {
    let totalMoneySpent = this.findMyBookings().reduce((totalSpent, booking) => {
      let foundRoom = this.rooms.find(room => room.number === booking.roomNumber)
      totalSpent += foundRoom.costPerNight
      return totalSpent
    }, 0).toFixed(2)
    // domUpdates.displayTotalSpent(+totalMoneySpent)
    return +totalMoneySpent
  }

  bookARoom() {

  }

};

export default Guest;
