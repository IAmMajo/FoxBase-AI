# Ordnerstruktur

## middleware

In diesem Ordner liegt die Datei [auth.global.ts](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/middleware/auth.global.ts?ref_type=heads). In dieser Datei wird die Middleware von Nuxt konfiguriert. Im fall dieser Anwendung stellt die Middleware sicher, das nur eingelogte User auf die Admin Seite kommen und das man sich nicht einloggen muss, wenn noch eine Session besteht.

## server

### api

Dieser Ordner enthält alle Dateien die unsere API Endpunkte ausmachen. Eine genaue Erklärung zu allen Endpunkten gibt es im [Bereich API](./api/openapi).

### middleware

Dieser Ordner enthält die Datei [environment.ts](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/server/middleware/environment.ts?ref_type=heads), welche dafür zustandig ist das Vorhandensein aller notwendigen Umgebungsvariablen zu überprüfen. Zusätzlich speichert die Datei das Session Password, mit welchem der Login verschlüsselt wird, in der Runtime Config Variable session.password ab.

### utils

Dieser Ordner enthält unterschiedliche Utility Funktionen.

#### [changePassword.ts](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/server/utils/changePassword.ts?ref_type=heads)

Ändert das Passwort eines Users.

```ts
Parameter:
id: integer
newPassword: string
password?: string


return: void
```

Die ID ist die ID des Users dessen Passwort geändert werden soll. <br> Das original Passwort ist optional um es möglich zu machen, das ein Admin das Passwort zurücksetzen kann sollte es vergessen werden.

#### [checkApiResponse.ts](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/server/utils/checkApiResponse.ts?ref_type=heads)

Wird verwendet um zu prüfen, ob die API Response von der Semantic Search API von Foxbase korrekt ist und wirft einen Error falls es schief gelaufen ist.

```ts
Parameter:
response: Response

return: void
```

Die Response ist die Fetch Request Responst die von der API zurückgegeben wird.

#### [checkUserAuthority.ts](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/server/utils/checkUserAuthority.ts?ref_type=heads)

Prüft ob der User eine der übergebenen Rollen hat.

```ts
Parameter:
session: UserSession
neededRole: string[]

return: boolean
```

Mögliche Rollen sind: "observer", "curator" und "admin". <br>
[_UserSession_](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/server/utils/checkUserAuthority.ts?ref_type=heads)

#### [convertDbProductToProduct.ts](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/server/utils/convertDbProductToProduct.ts?ref_type=heads)

Konvertiert ein [DbProduct](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/types/DbProduct.d.ts?ref_type=heads) (die Form wie Produkte in der Datenbank vorliegen) in ein [Product](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/types/Product.d.ts?ref_type=heads) (die Form wie es im Frontend gebraucht wird).

```ts
Parameter:
dbProduct: DbProduct

return: Product
```

#### [getActiveCollections.ts](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/server/utils/getActiveCollection.ts?ref_type=heads)

Fetched die [Collection](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/types/Collection.d.ts?ref_type=heads) Informationen für die Momentan aktive Collection.

```ts
Parameter:
null

return: Collection
```

### [tsconfig.json](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/server/tsconfig.json)

TypeScript Einstellungen.

## types

Enthält mehrere Datentypen um die Einheitlichkeit des Backends zu vereinfachen.

- [ApiProduct](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main/types/ApiProduct.d.ts) <br> Die Produkte in der Form wie sie von Foxbase Semantic Search zurückgegeben werden.
- [UserSession](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/auth.d.ts) <br> Informationen über den eingelogten User um ihn zum Beispiel mit der Datenbank zu verknüpfen.
- [Collection](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/Collection.d.ts) <br> Informationen über eine Collection um die Collection in unseren Backend mit Foxbase zu Verknüpfen.
- [DbExecResult](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/DbExecResult.d.ts) <br> Wird verwendet um zu Prüfen, ob eine Datenbank Transaktion erfolgreich war.
- [DbProduct](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/DbProduct.d.ts) <br> Die Form in der Produkte in der Datenbank gespeichert werden.
- [DbResult](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/DbResult.d.ts) <br> Generisches Resultat einer Datenbank Transaktion.
- [Product](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/Product.d.ts) <br> Die Form in der Produkte im Frontend verwendet werden.
- [Prompt](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/Prompt.d.ts) <br> Ein Datentyp um unterschiedliche Infos für Prompts zu speichern.
- [Setting](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/Setting.d.ts) <br> Speichert zussamenhängde Informationen über einen Settings eintrag.
- [TextResponse](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/TextResponse.d.ts) <br> Die Form in der Text von Foxbase Semantic Search zurück gegeben wird.
- [User](https://gitlab.hsrw.eu/lv-webentwicklung/2024-25/mi/foxbase-semantische-suche/-/blob/main//types/User.d.ts) <br> Ein User in der Form wie er in der Datenbank abgespeichert wird.
