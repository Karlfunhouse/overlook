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
    return myBookings
  }

  calculateTotalSpent() {
    let totalMoneySpent = this.bookings.filter(booking => booking.userID === this.id)
    .reduce((totalSpent, booking) => {
      totalSpent += booking.costPerNight
      return totalSpent
    }, 0)
    domUpdates.displayTotalSpent(totalMoneySpent.toFixed(2))
    return +totalMoneySpent.toFixed(2)
  }

  bookARoom() {

  }

};

export default Guest;
