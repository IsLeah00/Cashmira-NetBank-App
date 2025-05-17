**Admin Endpoints**

*Requires Authorization header -> Bearer token*


1. `GET /admin/logs`
    getLogs: Retrieves system administration logs in chronological order.

2. `GET /admin/registrations`
    getPendingUsers: Fetches all users who have registered but are still pending approval.

3. `PATCH /admin/approve/:id`
    approveUser: Approves a user based on their unique identifier.

4. `DELETE /admin/deny/:id`
    denyUser: Denies and deletes a user registration by ID.

5. `GET /admin/users`
    getApprovedUsers: Returns a list of all users who have already been approved.

6. `PATCH /admin/suspense/:id`
    suspenseUser: Suspends or reactivates a user account.

7. `PATCH /admin/restrict/:id`
    restrictUser: Restricts or grants general access for a user.

8. `PATCH /admin/restrict-transfers/:id`
    restrictUserTransfers: Disables or re-enables the ability to make transfers for a specific user.

9. `GET /admin/transactions/:id`
    getTransactionsById: Retrieves all transactions of the specified user in chronological order.
