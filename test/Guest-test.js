import $ from 'jquery';
import chai from 'chai';
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);
import Guest from '../src/Guest';
import domUpdates from '../src/domUpdates'

let bookings;
let rooms;
let guest;

describe('Guest', function() {

  afterEach(() => {
  chai.spy.restore(domUpdates);
})

  beforeEach(() => {
  chai.spy.on(domUpdates, "displayFirstName", () => {});
  chai.spy.on(domUpdates, "displayMyBookings", () => {});
  chai.spy.on(domUpdates, "displayFoundGuestInfo", () => {});
  chai.spy.on(domUpdates, "displayTotalSpent", () => {});

  bookings = [
    {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 9,
      "date": "2020/02/04",
      "roomNumber": 15,
      "roomServiceCharges": [],
      "roomType": "residential suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 1,
      "costPerNight": 294.56
    },
    {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2020/01/24",
      "roomNumber": 24,
      "roomServiceCharges": [],
      "roomType": "suite",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 327.24
    },
    {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2020/01/10",
      "roomNumber": 12,
      "roomServiceCharges": [],
      "roomType": "single room",
      "bidet": false,
      "bedSize": "twin",
      "numBeds": 2,
      "costPerNight": 172.09
    },
    {
      "id": "5fwrgu4i7k55hl6t7",
      "userID": 20,
      "date": "2020/02/16",
      "roomNumber": 7,
      "roomServiceCharges": [],
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 231.46
    },
    {
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2020/02/05",
      "roomNumber": 1,
      "roomServiceCharges": [],
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },
    {
      "id": "5fwrgu4i7k55hl6t9",
      "userID": 38,
      "date": "2020/02/14",
      "roomNumber": 4,
      "roomServiceCharges": [],
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 429.44
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
      "number": 15,
      "roomType": "junior suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 397.02
    }
  ]

  guest = new Guest(1, 'Leatha Ullrich', bookings)

})
  it('should be a function', () => {
    expect(Guest).to.be.a('function')
  })

  it('should be an instance of Guest', () => {
    expect(guest).to.be.an.instanceof(Guest)
  })

  it('should be able to get guest first name', () => {
    expect(guest.findFirstName()).to.equal('Leatha')
    expect(domUpdates.displayFirstName).to.have.been.called(2)
  })

  it('should find a users bookings', () => {
    expect(guest.findMyBookings().length).to.equal(1)
    expect(domUpdates.displayMyBookings).to.have.been.called(1)
    expect(domUpdates.displayFoundGuestInfo).to.have.been.called(1)
  })

  it('should calculate total spent on hotel rooms', () => {
    expect(guest.calculateTotalSpent()).to.equal(358.40)
    expect(domUpdates.displayTotalSpent).to.have.been.called(1)
    expect(domUpdates.displayTotalSpent).to.have.been.called.with(358.40)

  })


});
