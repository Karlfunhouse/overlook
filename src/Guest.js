import domUpdates from './domUpdates'

class Guest {
  constructor(id, name, bookings) {
    this.id = id;
    this.name = name;
    // this.rooms = rooms;
    this.bookings = bookings;
    this.firstName = this.findFirstName();
    this.myBookings = this.findMyBookings;
  }

  findFirstName() {
    let firstName = this.name.split(' ');
    domUpdates.displayFirstName(firstName[0]);
    return firstName[0]
  }

  findMyBookings() {
    let myBookings = this.bookings.filter(booking => booking.userID === this.id)
    domUpdates.displayMyBookings(myBookings);
    // console.log(myBookings);
    return myBookings
  }

  calculateTotalSpent() {
    let totalMoneySpent = this.findMyBookings().reduce((totalSpent, booking) => {
      totalSpent += booking.roomInfo.costPerNight
      return totalSpent
    }, 0)
    domUpdates.displayTotalSpent(+totalMoneySpent)
    return +totalMoneySpent
  }

  bookARoom() {

  }

};

export default Guest;
