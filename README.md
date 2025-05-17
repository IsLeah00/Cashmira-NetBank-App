#                           Cashmira NetBank

## 1. Rendszerspecifikáció

### Feladat
A **Cashmira NetBank** egy modern, reszponzív online banki alkalmazás, amely lehetőséget nyújt:
- Felhasználók regisztrációjára és hitelesítésére
- Bankkártya-kezelésre (limitbeállítás, blokkolás, átnevezés, stb.)
- Pénzügyi tranzakciók biztonságos lebonyolítására
- Adminisztrátori jogosultságok kezelésére

### Fejlesztői eszközök
- **Visual Studio Code**, Postman, MongoDB Compass
- **Yarn** (helyettesíti az npm-et), Docker, Git
- VS Code kiegészítők: Angular Language Service, ESLint, Prettier

### Környezet
- **Frontend**: Angular 17 + Angular Material
- **Backend**: Node.js + Express.js
- **Adatbázis**: MongoDB (Docker konténerben)
- **Platform**: Linux (Ubuntu), Windows 10+, vagy macOS

## 2. Követelményspecifikáció

### Vágyálom rendszer leírása
A rendszer támogatja a felhasználók regisztrációját PIN-kóddal, kártyagenerálással és biztonságos hitelesítéssel. Tranzakciók során obszcén szavak szűrése történik automatikusan, helyettesítő szavakkal. Az adminok jóváhagyhatják, korlátozhatják vagy törölhetik a felhasználókat, valamint naplózhatják az eseményeket.

### Igényelt üzleti folyamatok
- Teljes körű felhasználói pénzügykezelés webes felületen:
        - számla aktuális státusz
        - menedzsment
        - tranzakciók
        - profilkezelés

- Adminisztrációs funkciók:
        - új regisztrációk jóváhagyása
        - meglévő fiókok korlátozása
        - meglévő fiókok felfüggesztése
        - tranzakciók felügyelete
        - tranzakciók ellenőrzése

### Követelménylista
- Docker és Docker Compose telepítése
- Git, Yarn és Node.js környezet
- Ajánlott operációs rendszer: Ubuntu 20.04+, Windows 10+, macOS

## 3. Funkcionális specifikáció

### Program célkitűzése
A cél egy gyors, biztonságos és átlátható webes banki rendszer, amely minimalista, de funkciókban gazdag kezelőfelületet biztosít a végfelhasználók és az adminisztrátorok számára is.

### Funkciók listája
- Regisztráció (PIN, jelszószabályok)
- Bejelentkezés (JWT alapú hitelesítés)
- Kártyakezelés (név, blokk, limitek – ATM, vásárlás, utalás)
- Tranzakciók lebonyolítása (összeg, partner, üzenet, obszcén szavak automatikus szűrése és helyettesítése)
- Kártya automatikus létrehozása regisztrációkor
- Tranzakciós statisztika és történet
- Admin felület: felhasználók kezelése, hozzáférés szabályozása, naplózás

### Tesztelés
- Az alkalmazás minden funkciója manuálisan tesztelve lett fejlesztés közben (UI, validációk, státuszválaszok, hibakezelés stb.)
- A backend végpontjai Postmannel és frontend UI-val is lettek tesztelve
- Karma alapú Angular unit tesztelés beállítható

## 4. Telepítés és futtatás

### Függőségek telepítése

```sh
cd cashmira-app
yarn install
```

Ez a parancs telepíti a backend és frontend összes függőségét (nem `node_modules`-t, hanem a `yarn.lock` alapján).

### Indítás

```sh
yarn start
```

Ez egyszerre elindítja az adatbázist Docker konténerben, a backendet és a frontendet.

## 5. Elérhető végpontok

Az összes API végpont listája elérhető a következő `.md` fájlokban:

```
backend/controllers/helpers/
├── admin-endpoints.md
├── auth-endpoints.md
├── card-endpoints.md
├── transaction-endpoints.md
└── user-endpoints.md
```

## 6. Git és fájlkezelés

- A `.gitignore` tartalmazza a `node_modules/`, `dist/`, `.env` fájlokat.
- Az `npm` helyett **Yarn** van használatban.
- Verziókezelés: Git & GitHub

## 7. License

**UNLICENSED**

Ez a projekt oktatási/demó céllal készült, éles környezetbe helyezés előtt további biztonsági, audit és megfelelőségi lépések szükségesek.
