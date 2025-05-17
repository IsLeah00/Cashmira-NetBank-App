**Card Management Endpoints**


*Requires Authorization header -> Bearer token*


1. `GET /api/user/card/view?pin=1234`
    viewCardByPin: Lekéri a kártyaadatokat PIN alapján, ha az egyezik a felhasználó kártyájával.

2. `PATCH /api/user/card/rename`
    renameCard: Átnevezi a felhasználó bankkártyáját egy új névre.

3. `PATCH /api/user/card/block/:id`
    blockCard: Blokkolja vagy feloldja a blokkolást a kártyán.

4. `PATCH /api/user/card/atm-limit`
    updateAtmLimit: Frissíti az ATM készpénzfelvételi limitet a megadott összegre.

5. `PATCH /api/user/card/transfer-limit`
    updateTransferLimit: Frissíti az utalási limitet a megadott összegre.

6. `PATCH /api/user/card/purchase-limit`
    updatePurchaseLimit: Frissíti a vásárlási limitet a megadott összegre.
