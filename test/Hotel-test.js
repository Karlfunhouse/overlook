import $ from 'jquery';
import chai from 'chai';
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);
import Hotel from '../src/Hotel';
import domUpdates from '../src/domUpdates'

let bookings;
let allBookingInfo;
let rooms;
let hotel;

describe('Hotel', () => {

  afterEach(() => {
    chai.spy.restore(domUpdates);
  })

  beforeEach(() => {
    chai.spy.on(domUpdates, "displayTodaysBookings", () => {});
    chai.spy.on(domUpdates, "displayNumberOfAvailableRooms", () => {});
    chai.spy.on(domUpdates, "displayAvailableRooms", () => {});
    chai.spy.on(domUpdates, "displayOpenRoomsForToday", () => {});
    chai.spy.on(domUpdates, "displayTodaysRevenue", () => {});
    chai.spy.on(domUpdates, "displayPercentageOfOccupiedRooms", () => {});
    chai.spy.on(domUpdates, "displayFilteredRoomsByType", () => {});
    chai.spy.on(domUpdates, "displayApologyMessage", () => {});

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

  allBookingInfo = [
  {
    id: '5fwrgu4i7k55hl6sz',
    userID: 9,
    date: '2020/02/04',
    roomNumber: 15,
    roomServiceCharges: [],
    roomType: 'junior suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 397.02
  },
  {
    id: '5fwrgu4i7k55hl6t5',
    userID: 43,
    date: '2020/01/24',
    roomNumber: 24,
    roomServiceCharges: [],
    roomType: 'junior suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 397.02
  },
  {
    id: '5fwrgu4i7k55hl6t6',
    userID: 13,
    date: '2020/01/10',
    roomNumber: 12,
    roomServiceCharges: [],
    roomType: 'junior suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 397.02
  },
  {
    id: '5fwrgu4i7k55hl6t7',
    userID: 20,
    date: '2020/02/16',
    roomNumber: 7,
    roomServiceCharges: [],
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 231.46
  },
  {
    id: '5fwrgu4i7k55hl6t8',
    userID: 1,
    date: '2020/02/05',
    roomNumber: 1,
    roomServiceCharges: [],
    roomType: 'residential suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 358.4
  },
  {
    id: '5fwrgu4i7k55hl6t9',
    userID: 38,
    date: '2020/02/14',
    roomNumber: 4,
    roomServiceCharges: [],
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 429.44
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
  {
    "number": 12,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
  },
]

  hotel = new Hotel(rooms, bookings, '2020/02/04')
  // hotel.addRoomInfoToBookings()
})




  it('should be a function', () => {
    expect(Hotel).to.be.a('function')
  })

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel)
  })

  it('should be able to find bookings for today', () => {
    expect(hotel.findTodaysBookings().length).to.equal(1)
    expect(domUpdates.displayTodaysBookings).to.have.been.called(1)
  })

  it('should be able to add room info to booking', () => {
    expect(hotel.addRoomInfoToBookings()).to.deep.equal(allBookingInfo)
  })

  it('should be able to find number of Available Rooms', () => {
    expect(hotel.findTotalAvailableRooms()).to.equal(10)
    expect(domUpdates.displayNumberOfAvailableRooms).to.have.been.called(1)
  })

  it('should be able to find Open Rooms', () => {
    expect(hotel.findAvailableRooms().length).to.equal(10)
    expect(domUpdates.displayAvailableRooms).to.have.been.called(1)
  })

  it('should be able to find available room numbers', () => {
    expect(hotel.findAvailableRoomNumbers()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 24, 80, 12])
    expect(domUpdates.displayOpenRoomsForToday).to.have.been.called(1)
  })

  it('should be able to calculate total revenue for the day', () => {
    expect(hotel.findTotalRevenueForToday()).to.equal(397.02)
    expect(domUpdates.displayTodaysRevenue).to.have.been.called(1)
  })

  it('should be able to calculate percentage of occupied rooms', () => {
    expect(hotel.findPercentageOfOccupiedRooms()).to.equal(9)
    expect(domUpdates.displayPercentageOfOccupiedRooms).to.have.been.called(1)
  })

  it('should be able to filter rooms by type', () => {
    expect(hotel.filterRoomsByType('single room').length).to.equal(4)
    expect(domUpdates.displayFilteredRoomsByType).to.have.been.called(1)
  })

  it('should return nothing if there are no matching available rooms', () => {
    expect(hotel.filterRoomsByType('king suite').length).to.equal(0)
    expect(domUpdates.displayApologyMessage).to.have.been.called(1)
  })
})
