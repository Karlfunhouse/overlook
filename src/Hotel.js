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
    this.findOpenRooms();
    this.findTotalRevenueForToday();
    this.findPercentageOfOccupiedRooms();
  }

  findTodaysBookings() {
    this.addRoomInfoToBookings()
    let todaysBookings = this.bookings.bookings.filter(booking => booking.date === this.date)
    let todaySortedBookings = todaysBookings.sort((a, b) => a.roomNumber - b.roomNumber)
    // console.log('todaysortedBookings', todaySortedBookings);
    domUpdates.displayTodaysBookings(todaySortedBookings)
    return todaySortedBookings
  }

  addRoomInfoToBookings() {
    // console.log('this.bookings', this.bookings);
    let bookingInfo = this.bookings.bookings.forEach(booking => {
      // console.log('booking', booking);
      this.rooms.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          booking.roomType = room.roomType,
          booking.bidet = room.bidet,
          booking.bedSize = room.bedSize,
          booking.numBeds = room.numBeds,
          booking.costPerNight = room.costPerNight
        }
      })
    })
    // console.log('bookingInfo', bookingInfo);
    return bookingInfo
  }

//need to only find which rooms aren't booked for today's date.
  findTotalAvailableRooms() {
    let todaysBookings = this.bookings.bookings.filter(booking => booking.date === this.date)
    let todaySortedBookings = todaysBookings.sort((a, b) => a.roomNumber - b.roomNumber)

    let filledRoomsToday = []
      todaySortedBookings.forEach(booking => {
      this.rooms.rooms.forEach(room => {
        if(booking.roomNumber === room.number) {
          filledRoomsToday.push(room)
        }
      })
    })
    let availableRooms = this.rooms.rooms.length - filledRoomsToday.length
    domUpdates.displayNumberOfAvailableRooms(availableRooms)
    // console.log('availableRooms', availableRooms);
    return availableRooms
  }

  findOpenRooms() {
    let todaysBookings = this.bookings.bookings.filter(booking => booking.date === this.date)
    let todaySortedBookings = todaysBookings.sort((a, b) => a.roomNumber - b.roomNumber)
    let todaysBookedRooms = todaySortedBookings.map(booking => booking.roomNumber)
    let todaysOpenRooms = [];
    this.rooms.rooms.forEach(room => {
      if (!todaysBookedRooms.includes(room.number)) {
        todaysOpenRooms.push(room.number)
      }
    })
    domUpdates.displayOpenRoomsForToday(todaysOpenRooms)
    return todaysOpenRooms
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
    domUpdates.displayTodaysRevenue(todaysRevenue.toFixed(2))
    return todaysRevenue.toFixed(2)
  }

  findPercentageOfOccupiedRooms() {
    let numberOfRoomsBookedToday = this.bookings.bookings.filter(booking => booking.date === this.date).length
    let percentageOfOccupiedRooms = +((numberOfRoomsBookedToday/this.rooms.rooms.length).toFixed(2) * 100)
    domUpdates.displayPercentageOfOccupiedRooms(percentageOfOccupiedRooms)
    console.log('%', percentageOfOccupiedRooms);
    return percentageOfOccupiedRooms
  }

  filterRoomsByType(roomType) {
    let filteredRooms = this.rooms.rooms.filter(room => room.roomType === roomType)
    domUpdates.displayFilteredRoomsByType(filteredRooms)
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
