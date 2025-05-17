**Admin Endpoints**

*Requires Authorization header -> Bearer token*


1. `GET /admin/logs`
    getLogs: Lekéri a rendszeradminisztrációs naplóbejegyzéseket időrendi sorrendben.

2. `GET /admin/registrations`
    getPendingUsers: Lekéri az összes még nem jóváhagyott (pending) regisztrált felhasználót.

3. `PATCH /admin/approve/:id`
    approveUser: Jóváhagy egy adott felhasználót azonosító alapján.

4. `DELETE /admin/deny/:id`
    denyUser: Elutasítja és törli a megadott azonosítójú regisztrációt.

5. `GET /admin/users`
    getApprovedUsers: Visszaadja az összes már jóváhagyott felhasználó listáját.

6. `PATCH /admin/suspense/:id`
    suspenseUser: Felfüggeszti vagy visszaállítja egy felhasználó fiókját.

7. `PATCH /admin/restrict/:id`
    restrictUser: Korlátozza vagy engedélyezi egy felhasználó általános hozzáférését.

8. `PATCH /admin/restrict-transfers/:id`
    restrictUserTransfers: Korlátozza vagy újra megengedi az utalások végrehajtását az adott felhasználónak.

9. `GET /admin/transactions/:id`
    getTransactionsById: Lekéri az adott felhasználó összes tranzakcióját időrendi sorrendben.
