const chai = require('chai');
const expect = chai.expect;
import Hotel from '../src/Hotel';

let bookings;
let rooms;
let hotel;

beforeEach(() => {


    bookings = [
    {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 9,
    "date": "2020/02/04",
    "roomNumber": 15,
    "roomServiceCharges": []
    },
    {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 43,
    "date": "2020/01/24",
    "roomNumber": 24,
    "roomServiceCharges": []
    },
    {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 13,
    "date": "2020/01/10",
    "roomNumber": 12,
    "roomServiceCharges": []
    },
    {
    "id": "5fwrgu4i7k55hl6t7",
    "userID": 20,
    "date": "2020/02/16",
    "roomNumber": 7,
    "roomServiceCharges": []
    },
    {
    "id": "5fwrgu4i7k55hl6t8",
    "userID": 1,
    "date": "2020/02/05",
    "roomNumber": 1,
    "roomServiceCharges": []
    },
    {
    "id": "5fwrgu4i7k55hl6t9",
    "userID": 38,
    "date": "2020/02/14",
    "roomNumber": 4,
    "roomServiceCharges": []
    }
  ]


  rooms = [
    {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
    },
    {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
    },
    {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
    },
    {
    "number": 4,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 429.44
    },
    {
    "number": 5,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 340.17
    },
    {
    "number": 6,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
    },
    {
    "number": 7,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 231.46
  },
  {
    "number": 24,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
  },
  {
  "number": 80,
  "roomType": "suite",
  "bidet": false,
  "bedSize": "full",
  "numBeds": 2,
  "costPerNight": 477.38
  },
  {
    "number": 15,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
  },
  ]

  hotel = new Hotel(rooms, bookings, '2020/02/04')
})
//
// afterEach(() => {
//   chai.spy.restore(domUpdates);
// })

describe('Hotel', () => {
  it('should be a function', () => {
    expect(Hotel).to.be.a('function')
  })

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel)
  })

  it('should be able to find bookings for today', () => {
    expect(hotel.findTodaysBookings().length).to.equal(1)
  })

  it('should be able to find Available Rooms', () => {
    expect(hotel.findTotalAvailableRooms()).to.equal(9)
  })

  it('should be able to calculate total revenue for the day', () => {
    expect(hotel.findTotalRevenueForToday()).to.equal(397.02)
  })

  it('should be able to calculate percentage of occupied rooms', () => {
    expect(hotel.findPercentageOfOccupiedRooms()).to.equal(10)
  })
})
