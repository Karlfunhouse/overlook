# Welcome to Casa de la Luna

## This is a variation on the Overlook Hotel, which is the final solo project for Module 2 at Turing School of Software & Design.

Casa de la Luna is a hotel management software with a guest interface and a management interface.  

When logging in as a guest, the guest's total spendings as well as bookings with the hotel are displayed.  If a guest would like to book a future reservation they may do so by selecting the date and filtering for which room type they would like.  Upon clicking "Book Room" the reservation added to the Hotel's database.

When logging in as a manager, the bookings for the current day will be displayed.  The manager can navigate through the calendar dropdown menu to select any date and view all bookings past and future.  The manager can search for a guest by first name to view how much they have spent at Casa de la Luna as well as all of their bookings, and is able to cancel any future booking if they need to.  The manager is also able to book a room for whatever guest they have searched for.

## UI/UX Screenshots
Manager Login
![manager login](manager-login.gif)
Guest Login
![guest login](guest-login.gif)
Manager Dashboard
![search for guest as manager](manager-search-guest.gif)
Manager Delete Booking
![Manager deleting a booking](manager-cancel-booking.gif)
Guest Booking a Room
![Guest booking a room](guest-book-room.gif)


## Setup

To install this app, clone the repository and enter the following into the terminal:
```bash
npm install
```

To start the server run 
```bash
npm start
```

### Technologies Used
- Fetch API to get users, rooms & bookings from respective endpoints.
- OOP to keep each class encapsulated and only taking care of their own functionality.
- Webpack as a compiler for SCSS.
- jQuery for all DOM updates & event handlers.

## Wins
* Creating a functioning app that utilizes many new technologies which are listed above.
* Clean UI/UX that could use a little bit of polish but has full functionality.
* Completing the project in 7 days and having something that I am proud of to add to my portfolio.

## Challenges
* Using fetch was a tricky part of this project, especially when booking a room or deleting a booking.  Being able to update the DOM with the data as soon as it changed was particularly challenging.
* Making use of a domUpdates class which hosted all DOM updates methods.  Each class method calls the corresponding domUpdate method which ended up being a bit of a confusing web to navigate.
* Utilizing the domUpdates class also made it challenging to work on testing later in the project.  Though all classes were set up and tested at the start of the project, incorporating the domUpdates method (and this jQuery) gave a persistent error that the window was not defined and thus the test suite could not run.  I spent over 5 hours on the last day trying to debug this and was unable to figure it out.  

## Future Iterations
* Implementing media queries to be responsive across multiple devices
* Implementing cross browser compatibility
* Testing with Spies

## Contributors

**[Karl Nielsen](https://github.com/karlfunhouse)**

## Licensing
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
