**Auth Endpoints**


1. `POST /api/auth/register`
    registerUser: Regisztrál egy új felhasználót erős jelszókritériumokkal és 4 jegyű PIN-nel. A regisztráció során automatikusan generál egy bankkártyát, amely 5 évig érvényes, és az alapértelmezett napi limitekkel rendelkezik (ATM, utalás, vásárlás). A fiók kezdetben nem aktív, admin jóváhagyása szükséges.

2. `POST /api/auth/login`
    loginUser: Bejelentkezteti a felhasználót, ha az email-cím és a jelszó helyes, a fiók jóvá van hagyva, és nincs felfüggesztve. Sikeres belépés esetén 2 órás érvényességű JWT tokent ad vissza a kliensnek.
