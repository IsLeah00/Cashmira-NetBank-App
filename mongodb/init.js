db = db.getSiblingDB('cashmira');

db.dropDatabase();

const aliceId = ObjectId("65f0c1b2a6d4f2b4b267f912");
const aliceCardId = ObjectId("65f0c1b3a6d4f2b4b267f913");

const claraId = ObjectId("65f0c1b2a6d4f2b4b267f914");
const danielId = ObjectId("65f0c1b2a6d4f2b4b267f915");

const claraCardId = ObjectId("65f0c1b3a6d4f2b4b267f916");
const danielCardId = ObjectId("65f0c1b3a6d4f2b4b267f917");

db.users.insertMany([
  {
    _id: aliceId,
    firstName: "Alice",
    lastName: "Mira",
    email: "alice@qwe.com",
    password: "$2b$10$T5gxbhQvSk5mlEWKwGfp..ujrKEYE.2DQP25XIzXVHXTGz8tFLnJK",
    phone: "+41781244567",
    role: "user",
    pin: 1234,
    approved: true,
    suspended: false,
    restricted: false,
    restrictedTransfers: false,
  },
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@cashmira.com",
    password: "$2b$10$kGhqmL4CNZwfBtp3EV8HJeAydav233MzaBZ4wFAr1kieqnvkTBZWS",
    phone: "+41787654321",
    role: "admin",
    approved: true,
  },
  {
    firstName: "Bob",
    lastName: "Pending",
    email: "bob@asd.com",
    password: "$2b$10$KyEVPdFlIXF.KJ0EUEl0KuOKn0nd1Ae8shtDaUAD8Nb0mO5pIdJ.6",
    phone: "+41782345678",
    role: "user",
    pin: 5678,
    approved: false,
    suspended: false,
    restricted: false,
    restrictedTransfers: false,
  },
  {
    _id: claraId,
    firstName: "Clara",
    lastName: "Smith",
    email: "clara@cashmira.com",
    password: "$2b$10$kGhqmL4CNZwfBtp3EV8HJeAydav233MzaBZ4wFAr1kieqnvkTBZWS",
    phone: "+41781230001",
    role: "user",
    pin: 1111,
    approved: true,
    suspended: false,
    restricted: false,
    restrictedTransfers: false,
  },
  {
    _id: danielId,
    firstName: "Daniel",
    lastName: "Lee",
    email: "daniel@cashmira.com",
    password: "$2b$10$kGhqmL4CNZwfBtp3EV8HJeAydav233MzaBZ4wFAr1kieqnvkTBZWS",
    phone: "+41781230002",
    role: "user",
    pin: 2222,
    approved: true,
    suspended: false,
    restricted: false,
    restrictedTransfers: false,
  }
]);

db.transactions.insertMany([
  // Transactions for Alice
  {
    userId: aliceId,
    cardId: aliceCardId,
    payee: "Coop Grocery Store",
    invoiceNumber: "INV-10001",
    amount: -45.80,
    currency: "CHF",
    statement: "Weekly groceries",
    createdAt: new Date("2025-03-01T12:34:00Z")
  },
  {
    userId: aliceId,
    cardId: aliceCardId,
    payee: "Rent Zurich",
    invoiceNumber: "INV-10002",
    amount: -1200.00,
    currency: "CHF",
    statement: "March rent",
    createdAt: new Date("2025-03-01T08:00:00Z")
  },
  {
    userId: aliceId,
    cardId: aliceCardId,
    payee: "Starbucks",
    invoiceNumber: "INV-10003",
    amount: -5.50,
    currency: "CHF",
    statement: "Coffee",
    createdAt: new Date("2025-03-02T09:12:00Z")
  },
  {
    userId: aliceId,
    cardId: aliceCardId,
    payee: "Netflix",
    invoiceNumber: "INV-10004",
    amount: -15.90,
    currency: "CHF",
    statement: "Monthly subscription",
    createdAt: new Date("2025-03-03T21:00:00Z")
  },
  {
    userId: aliceId,
    cardId: aliceCardId,
    payee: "Salary Credit",
    invoiceNumber: "SAL-10001",
    amount: 4000.00,
    currency: "CHF",
    statement: "March salary",
    createdAt: new Date("2025-03-04T08:00:00Z")
  },
  // Transactions for Clara
  {
    userId: claraId,
    cardId: claraCardId,
    payee: "Clara's Company",
    invoiceNumber: "SAL-20001",
    amount: 4200,
    currency: "CHF",
    statement: "April salary",
    createdAt: new Date("2025-04-01T08:00:00Z")
  },
  {
    userId: claraId,
    cardId: claraCardId,
    payee: "Daniel Lee",
    fromCardNumber: "4111-2222-3333-4444",
    toCardNumber: "4111-5555-6666-7777",
    invoiceNumber: "INV-CL2DL",
    amount: -100,
    currency: "CHF",
    statement: "Thanks for the lunch!",
    createdAt: new Date("2025-04-02T14:00:00Z")
  },
  // Transactions for Daniel
  {
    userId: danielId,
    cardId: danielCardId,
    payee: "Clara's Company",
    invoiceNumber: "SAL-20002",
    amount: 3150,
    currency: "CHF",
    statement: "April salary",
    createdAt: new Date("2025-04-01T09:00:00Z")
  },
  {
    userId: danielId,
    cardId: danielCardId,
    payee: "Clara Smith",
    fromCardNumber: "4111-2222-3333-4444",
    toCardNumber: "4111-5555-6666-7777",
    invoiceNumber: "INV-CL2DL",
    amount: 100,
    currency: "CHF",
    statement: "Thanks for the lunch!",
    createdAt: new Date("2025-04-02T14:00:00Z")
  }
]);

// Cards
db.cards.insertMany([
  {
    _id: aliceCardId,
    userId: aliceId,
    cardName: "Daily Card",
    cardOwner: "Alice Mira",
    cardNumber: "4111-1111-1111-1111",
    expireDate: "04/27",
    cvv: 432,
    pin: 1234,
    blocked: false,
    balance: 5000,
    atmLimitDaily: 1000,
    transferLimitDaily: 5000,
    purchaseLimitDaily: 2000
  },
  {
    _id: claraCardId,
    userId: claraId,
    cardName: "Company Card",
    cardOwner: "Clara Smith",
    cardNumber: "4111-2222-3333-4444",
    expireDate: "05/28",
    cvv: 111,
    pin: 1111,
    blocked: false,
    balance: 4200,
    atmLimitDaily: 1000,
    transferLimitDaily: 3000,
    purchaseLimitDaily: 1500
  },
  {
    _id: danielCardId,
    userId: danielId,
    cardName: "Party",
    cardOwner: "Daniel Lee",
    cardNumber: "4111-5555-6666-7777",
    expireDate: "06/28",
    cvv: 222,
    pin: 2222,
    blocked: false,
    balance: 3150,
    atmLimitDaily: 800,
    transferLimitDaily: 2500,
    purchaseLimitDaily: 1200
  }
]);

// Logs for Admin dashboard
db.logs.insertMany([
  {
    title: "Maintenance Completed",
    message: "Database backup completed on 2025-03-01.",
    createdAt: new Date("2025-01-01T23:00:00Z")
  },
  {
    title: "Feature Update",
    message: "Users can now rename cards in the Management section.",
    createdAt: new Date("2025-02-02T10:30:00Z")
  },
  {
    title: "Bug Fix",
    message: "Fixed issue where transaction filters were not applying correctly.",
    createdAt: new Date("2025-03-03T15:45:00Z")
  },
  {
    title: "Feature Update",
    message: "Users can now block and unblock their cards from the dashboard.",
    createdAt: new Date("2025-03-05T09:00:00Z")
  },
  {
    title: "Maintenance Completed",
    message: "Server restart and log rotation completed successfully.",
    createdAt: new Date("2025-03-06T03:30:00Z")
  },
  {
    title: "Bug Fix",
    message: "Corrected display issue for expired cards on the card page.",
    createdAt: new Date("2025-03-07T11:00:00Z")
  },
  {
    title: "Feature Update",
    message: "Transaction statements now support profanity filtering.",
    createdAt: new Date("2025-03-08T14:20:00Z")
  },
  {
    title: "Bug Fix",
    message: "Resolved incorrect PIN validation for card details.",
    createdAt: new Date("2025-03-09T17:45:00Z")
  },
  {
    title: "Feature Update",
    message: "Added monthly spending chart to the user home page.",
    createdAt: new Date("2025-03-10T08:30:00Z")
  },
  {
    title: "Maintenance Completed",
    message: "Updated security packages to latest versions.",
    createdAt: new Date("2025-03-11T02:15:00Z")
  },
  {
    title: "Bug Fix",
    message: "Fixed redirect after password update in profile settings.",
    createdAt: new Date("2025-03-12T16:10:00Z")
  },
  {
    title: "Feature Update",
    message: "Admins can now view and restrict user transfers.",
    createdAt: new Date("2025-03-13T13:00:00Z")
  },
  {
    title: "Bug Fix",
    message: "Fixed chart label mismatch in transaction statistics.",
    createdAt: new Date("2025-03-14T09:40:00Z")
  },
  {
    title: "Feature Update",
    message: "Registration form now enforces stronger password rules.",
    createdAt: new Date("2025-03-15T07:20:00Z")
  },
  {
    title: "Maintenance Completed",
    message: "Optimized database indexes for transaction queries.",
    createdAt: new Date("2025-03-16T04:50:00Z")
  },
  {
    title: "Bug Fix",
    message: "Fixed logout issue on token expiration.",
    createdAt: new Date("2025-03-17T18:15:00Z")
  },
  {
    title: "Feature Update",
    message: "User transaction history now grouped by date.",
    createdAt: new Date("2025-03-18T12:00:00Z")
  },
  {
    title: "Maintenance Completed",
    message: "Cleaned up old logs and unused records from database.",
    createdAt: new Date("2025-03-19T23:10:00Z")
  },
  {
    title: "Feature Update",
    message: "Admins can now suspend or unsuspend users.",
    createdAt: new Date("2025-03-20T08:00:00Z")
  },
  {
    title: "Bug Fix",
    message: "Resolved layout bug on card management page for mobile view.",
    createdAt: new Date("2025-03-21T15:45:00Z")
  },
  {
    title: "Feature Update",
    message: "Added transaction filtering by date.",
    createdAt: new Date("2025-04-10T10:25:00Z")
  },
  {
    title: "Bug Fix",
    message: "Fixed incorrect currency formatting in transactions.",
    createdAt: new Date("2025-04-12T14:00:00Z")
  },
  {
    title: "Maintenance Completed",
    message: "Weekly system check completed successfully.",
    createdAt: new Date("2025-04-16T01:00:00Z")
  }
]);
