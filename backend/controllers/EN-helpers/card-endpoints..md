**Card Management Endpoints**


*Requires Authorization header -> Bearer token*


1. `GET /api/user/card/view?pin=1234`
    viewCardByPin: Retrieves the user's card details if the provided PIN matches the card's PIN.

2. `PATCH /api/user/card/rename`
    renameCard: Renames the user's bank card to a new custom name.

3. `PATCH /api/user/card/block/:id`
    blockCard: Blocks or unblocks the specified card based on its current state.

4. `PATCH /api/user/card/atm-limit`
    updateAtmLimit: Updates the ATM cash withdrawal limit to the specified amount.

5. `PATCH /api/user/card/transfer-limit`
    updateTransferLimit: Updates the daily transfer limit to the specified amount.

6. `PATCH /api/user/card/purchase-limit`
    updatePurchaseLimit: Updates the daily purchase limit to the specified amount.
