class Hotel {
  constructor(rooms, bookings, date) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.todaysBookings = this.findTodaysBookings();
    this.date = date;
  }

  findTodaysBookings() {
    let todaysBookings = this.bookings.filter(booking => booking.date === this.date)
    // domUpdates.displayTodaysBookings(todaysBookings)
    return todaysBookings
  }

  findTotalAvailableRooms() {
    let availableRoomNumbers = this.bookings.reduce((unbookedRooms, booking) => {
      if(booking.date !== this.date) {
        unbookedRooms.push(booking.roomNumber)
      }
      return unbookedRooms
    }, [])

    let allAvailableRooms = []
    availableRoomNumbers.forEach(roomNumber => {
      this.rooms.forEach(room => {
        if(roomNumber === room.number) {
          allAvailableRooms.push(room)
        }
      })
    })
    // domUpdates.displayAvailableRooms(allAvailableRooms)
    return allAvailableRooms
  }

  findTotalRevenueForToday() {
    let todaysBookings = this.bookings.filter(booking => booking.date === this.date)
    let todaysRevenue = todaysBookings.reduce((revenue, booking) => {
      this.rooms.forEach(room => {
        if(room.number === booking.roomNumber) {
          revenue += room.costPerNight
        }
      })
      return revenue
    }, 0)
    // domUpdates.displayTodaysRevenue(todaysRevenue)
    return todaysRevenue
  }

  findPercentageOfOccupiedRooms(date) {
    let numberOfRoomsBookedToday = this.bookings.filter(booking => booking.date === this.date).length
    let percentageOfOccupiedRooms = +((numberOfRoomsBookedToday/this.rooms.length).toFixed(2) * 100)
    // domUpdates.displayPercentageOfOccupiedRooms(percentageOfOccupiedRooms)
    return percentageOfOccupiedRooms
  }

}


export default Hotel;
