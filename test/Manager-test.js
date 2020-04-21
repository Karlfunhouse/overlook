import $ from 'jquery';
const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);
import Guest from '../src/Guest';
import domUpdates from '../src/DomUpdates'

let bookings;
let rooms;
let users

beforeEach(() => {
  // chai.spy.on(domUpdates, "displayFirstName", () => {});
  // chai.spy.on(domUpdates, "displayMyBookings", () => {});
  // chai.spy.on(domUpdates, "displayTotalSpent", () => {});

  users: [
    {
    "id": 1,
    "name": "Leatha Ullrich"
    },
    {
    "id": 2,
    "name": "Rocio Schuster"
    },
    {
    "id": 3,
    "name": "Kelvin Schiller"
    },
    {
    "id": 4,
    "name": "Kennedi Emard"
    },
    {
    "id": 5,
    "name": "Rhiannon Little"
    },
    {
    "id": 6,
    "name": "Fleta Schuppe"
    },
    {
    "id": 7,
    "name": "Dell Rath"
    },
    {
    "id": 8,
    "name": "Era Hand"
    },
    {
    "id": 9,
    "name": "Faustino Quitzon"
    },
    {
    "id": 10,
    "name": "Tony Armstrong"
    }
]

  bookings = [
    {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 9,
      "date": "2020/02/04",
      "roomNumber": 15,
      "roomServiceCharges": [],
      "roomInfo": {
        "number": 15,
        "roomType": "residential suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 1,
        "costPerNight": 294.56
      }
    },
    {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2020/01/24",
      "roomNumber": 24,
      "roomServiceCharges": [],
      "roomInfo": {
        "number": 24,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 327.24
      }
    },
    {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2020/01/10",
      "roomNumber": 12,
      "roomServiceCharges": [],
      "roomInfo": {
        "number": 12,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 2,
        "costPerNight": 172.09
      }
    },
    {
      "id": "5fwrgu4i7k55hl6t7",
      "userID": 20,
      "date": "2020/02/16",
      "roomNumber": 7,
      "roomServiceCharges": [],
      "roomInfo": {
        "number": 7,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 231.46
      }
    },
    {
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2020/02/05",
      "roomNumber": 1,
      "roomServiceCharges": [],
      "roomInfo": {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      }
    },
    {
      "id": "5fwrgu4i7k55hl6t9",
      "userID": 38,
      "date": "2020/02/14",
      "roomNumber": 4,
      "roomServiceCharges": [],
      "roomInfo": {
        "number": 4,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 429.44
      }
    }
  ];

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
    },
  ]

  manager = new Manager(users, 0, 'Boss', rooms, bookings)
  hotel = new Hotel(users, rooms, bookings)
})


  describe('Guest', () => {
    it('should be a function', () => {
      expect(Manager).to.be.a('function')
    })

    it('should be an instance of Guest', () => {
      expect(manager).to.be.an.instanceof(Manager)
    })

    it('should be able to delete a booking', () => {
      expect(manager.deleteBooking(hotel))
    })

    it.only('should be able to find a guest by name', () => {
      expect(manager.findGuestByName('Leatha')).to.equal('Leatha')
    });
  });
