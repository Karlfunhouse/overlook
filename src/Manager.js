import {hotelFetch} from './index'

class Manager {
  constructor(guests, id, name, rooms, bookings) {
    this.guests = guests;
    this.id = id;
    this.name = name;
    this.bookings = bookings;
    this.rooms = rooms;
  };

  deleteBooking(hotel) {
    let date = $('.selected-date-manager').val().split('-').join('/')
      let bookingId = event.target.parentNode.id
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: +bookingId
        })
      })
      .then(response => console.log(response))
      .then(() => {hotelFetch(date)})
      .catch(err => console.log(err));
    };

  findGuestByName(name) {
    let guestName =  name.charAt(0).toUpperCase() + name.slice(1)
    let foundGuest = this.guests.find(guest => guest.name.includes(guestName))
    return foundGuest
  };

};

export default Manager;
