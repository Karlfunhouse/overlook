import domUpdates from './domUpdates'
var Moment = require('moment');
var todaysDate = Number(Moment().format('YYYY/MM/DD').split('/').join(''))

class Hotel {
  constructor(rooms, bookings, date) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.date = date;
    this.todaysBookings = this.findTodaysBookings;
  }

  setUpHotel() {
    this.sortBookingsByDate();
    this.findTodaysBookings();
    this.findTotalAvailableRooms();
    this.findTotalRevenueForToday();
    this.findPercentageOfOccupiedRooms();

  }

  findTodaysBookings() {
    let todaysBookings = this.bookings.bookings.filter(booking => booking.date === this.date)
    // domUpdates.displayTodaysBookings(todaysBookings)
    return todaysBookings
  }

  findTotalAvailableRooms() {
    let availableRoomNumbers = this.bookings.bookings.reduce((unbookedRooms, booking) => {
      if(booking.date !== this.date) {
        unbookedRooms.push(booking.roomNumber)
      }
      return unbookedRooms
    }, [])

    let allAvailableRooms = []
    availableRoomNumbers.forEach(roomNumber => {
      this.rooms.rooms.forEach(room => {
        if(roomNumber === room.number) {
          allAvailableRooms.push(room)
        }
      })
    })
    // domUpdates.displayAvailableRooms(allAvailableRooms)
    return allAvailableRooms
  }

  findTotalRevenueForToday() {
    let todaysBookings = this.bookings.bookings.filter(booking => booking.date === this.date)
    let todaysRevenue = todaysBookings.reduce((revenue, booking) => {
      this.rooms.rooms.forEach(room => {
        if(room.number === booking.roomNumber) {
          revenue += room.costPerNight
        }
      })
      return revenue
    }, 0)
    // domUpdates.displayTodaysRevenue(todaysRevenue)
    return todaysRevenue
  }

  findPercentageOfOccupiedRooms() {
    let numberOfRoomsBookedToday = this.bookings.bookings.filter(booking => booking.date === this.date).length
    let percentageOfOccupiedRooms = +((numberOfRoomsBookedToday/this.rooms.length).toFixed(2) * 100)
    // domUpdates.displayPercentageOfOccupiedRooms(percentageOfOccupiedRooms)
    return percentageOfOccupiedRooms
  }

  filterRoomsByType(roomType) {
    let filteredRooms = this.rooms.rooms.filter(room => room.roomType === roomType)
    // domUpdates.displayFilteredRoomsByType(filteredRooms)
    return filteredRooms
  }

  sortBookingsByDate() {
    // console.log('hotel bookings', this.bookings.bookings);
    let sortedBookings = this.bookings.bookings.sort((a,b) => new Moment(b.date).format('YYYYMMDD') - new Moment(a.date).format('YYYYMMDD'))
    sortedBookings = this.bookings
    // console.log('sortedBookings', sortedBookings);
  }

}


export default Hotel;
