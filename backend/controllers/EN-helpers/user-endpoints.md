**User Management Endpoints**


*Requires Authorization header -> Bearer token*


1. `GET /api/user/me`
    getUserData: Retrieves the public data of the currently logged-in user.

2. `PATCH /api/user/name`
    updateName: Updates the user's first and/or last name.

3. `PATCH /api/user/email`
    updateEmail: Updates the user's registered email address.

4. `PATCH /api/user/phone`
    updatePhone: Updates the user's phone number.

5. `PATCH /api/user/password`
    updatePassword: Changes the user's password after verifying the current one.

6. `PATCH /api/user/pin`
    updatePin: Updates the user's 4-digit PIN, required for accessing card information.

7. `DELETE /api/user/delete`
    deleteAccount: Permanently deletes the user's account after confirming the password.
