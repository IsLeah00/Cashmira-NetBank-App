**Transaction Management Endpoints**


*Requires Authorization header -> Bearer token*


1. `GET /api/transaction/balance`
    getCurrentBalance: Retrieves the current balance based on the user's bank card.

2. `GET /api/transaction/all`
    getAllTransactions: Returns all past transactions in descending order by date.

3. `POST /api/transaction/send`
    sendMoney: Sends a new transaction to another card, including the amount, recipient, and message. Any obscene words in the message are automatically replaced with appropriate alternatives.
