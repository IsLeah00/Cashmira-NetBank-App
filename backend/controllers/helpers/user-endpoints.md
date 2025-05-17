**User Management Endpoints**


*Requires Authorization header -> Bearer token*


1. `GET /api/user/me`
    getUserData:  Lekéri a jelenlegi bejelentkezett felhasználó publikus adatait.

2. `PATCH /api/user/name`
    updateName: Frissíti a felhasználó kereszt- és/vagy vezetéknevét.

3. `PATCH /api/user/email`
    updateEmail: Módosítja a felhasználó regisztrált email-címét.

4. `PATCH /api/user/phone`
    updatePhone: Frissíti a felhasználó telefonszámát.

5. `PATCH /api/user/password`
    updatePassword: Jelszócsere a jelenlegi jelszó megadásával.

6. `PATCH /api/user/pin`
    updatePin: Frissíti a felhasználó PIN kódját, amely a kártyainformációkhoz szükséges.

7. `DELETE /api/user/delete`
    deleteAccount: Véglegesen törli a felhasználói fiókot a megadott jelszó ellenőrzése után.
