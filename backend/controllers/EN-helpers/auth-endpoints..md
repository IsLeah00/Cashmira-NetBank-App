**Auth Endpoints**


1. `POST /api/auth/register`
    registerUser: Registers a new user with strong password criteria and a 4-digit PIN. During registration, a bank card is automatically generated with a 5-year validity and default daily limits (ATM withdrawal, transfers, purchases). The account is initially inactive and requires admin approval.

2. `POST /api/auth/login`
    loginUser: Logs in the user if the email and password are correct, the account has been approved, and it is not suspended. On successful login, returns a JWT token valid for 2 hours.
