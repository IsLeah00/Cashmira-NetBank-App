**Transaction Management Endpoints**


*Requires Authorization header -> Bearer token*


1. `GET /api/transaction/balance`
    getCurrentBalance: Lekéri az aktuális egyenleget a felhasználó bankkártyája alapján.

2. `GET /api/transaction/all`
    getAllTransactions: Visszaadja az összes eddig végrehajtott tranzakciót, dátum szerint csökkenő sorrendben.

3. `POST /api/transaction/send`
    sendMoney: Elküld egy új tranzakciót egy másik kártyára (összeg, partner, üzenet megadásával). Az üzenetben lévő esetleges obszcén szavak automatikusan lecserélésre kerülnek alternatívákra.
