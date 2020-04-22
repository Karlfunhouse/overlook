import domUpdates from './domUpdates'
var Moment = require('moment');
var todaysDate = Number(Moment().format('YYYY/MM/DD').split('/').join(''))

class Hotel {
  constructor(guests, rooms, bookings, date) {
    this.guests = guests,
    this.rooms = rooms;
    this.bookings = bookings;
    this.date = date;
    this.todaysBookings = this.findTodaysBookings();
  };

  setUpHotel() {
    this.sortBookingsByDate();
    this.findTodaysBookings();
    this.findTotalAvailableRooms();
    this.findAvailableRooms();
    this.findAvailableRoomNumbers();
    this.findTotalRevenueForToday();
    this.findPercentageOfOccupiedRooms();
  };

  findTodaysBookings() {
    this.addRoomInfoToBookings()
    let todaysBookings = this.bookings.bookings.filter(booking => booking.date === this.date)
    let todaySortedBookings = todaysBookings.sort((a, b) => a.roomNumber - b.roomNumber)
    domUpdates.displayTodaysBookings(todaySortedBookings)
    return todaySortedBookings
  };

  addRoomInfoToBookings() {
    let bookingInfo = this.bookings.bookings.forEach(booking => {
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
    return bookingInfo
  };

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
    return availableRooms
  };

  findAvailableRooms() {
    let todaysBookings = this.bookings.bookings.filter(booking => booking.date === this.date)
    let todaySortedBookings = todaysBookings.sort((a, b) => a.roomNumber - b.roomNumber)
    let todaysBookedRooms = todaySortedBookings.map(booking => booking.roomNumber)
    let todaysOpenRooms = [];
    this.rooms.rooms.forEach(room => {
      if (!todaysBookedRooms.includes(room.number)) {
        todaysOpenRooms.push(room)
      }
    })
    domUpdates.displayAvailableRooms(todaysOpenRooms)
    return todaysOpenRooms
  };

  findAvailableRoomNumbers() {
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
  };

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
  };

  findPercentageOfOccupiedRooms() {
    let numberOfRoomsBookedToday = this.bookings.bookings.filter(booking => booking.date === this.date).length
    let percentageOfOccupiedRooms = +((numberOfRoomsBookedToday/this.rooms.rooms.length).toFixed(2) * 100)
    domUpdates.displayPercentageOfOccupiedRooms(percentageOfOccupiedRooms.toFixed())
    return percentageOfOccupiedRooms.toFixed()
  };

  filterRoomsByType(roomType) {
    let availableRooms = this.findAvailableRooms()
    let filteredRooms = availableRooms.filter(room => room.roomType === roomType)

    if(roomType === 'all rooms') {
      domUpdates.displayFilteredRoomsByType(availableRooms)
      return availableRooms
    }

    if(filteredRooms.length > 0) {
      domUpdates.displayFilteredRoomsByType(filteredRooms)
      return filteredRooms
    } else {
      domUpdates.displayApologyMessage()
      return filteredRooms
    }
  };

  sortBookingsByDate() {
    let sortedBookings = this.bookings.bookings.sort((a,b) => new Moment(b.date).format('YYYYMMDD') - new Moment(a.date).format('YYYYMMDD'))
    sortedBookings = this.bookings
  };

};


export default Hotel;
