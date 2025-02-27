# Ordnerstruktur

## middleware

In diesem Ordner liegt die Datei [auth.global.ts](../middleware/auth.global.ts). In dieser Datei wird die Middleware von Nuxt konfiguriert. Im fall dieser Anwendung stellt die Middleware sicher, das nur eingelogte User auf die Admin Seite kommen und das man sich nicht einloggen muss, wenn noch eine Session besteht.

## server

### api

Dieser Ordner enthält alle Dateien die unsere API Endpunkte ausmachen. Eine genaue Erklärung zu allen Endpunkten gibt es im [Bereich API](./api/openapi.yaml).

### middleware

Dieser Ordner enthält die Datei [sessionPassword.ts](../server/middleware/sessionPassword.ts), welche dafür zustandig ist das Session Password, mit welchem der Login verschlüsselt wird vom Cloudflare Backend zu ziehen und in der Runtime Config Variable session.password abzuspeichern.

### utils

Dieser Ordner enthält unterschiedliche Utility Funktionen.

#### [changePassword.ts](../server/utils/changePassword.ts)

Ändert das Passwort eines Users.

```ts
Parameter:
id: integer
newPassword: string
password?: string


return: void
```

Die ID ist die ID des Users dessen Passwort geändert werden soll. <br> Das original Passwort ist optional um es möglich zu machen, das ein Admin das Passwort zurücksetzen kann sollte es vergessen werden.

#### [checkApiResponse.ts](../server/utils/checkApiResponse.ts)

Wird verwendet um zu prüfen, ob die API Response von der Semantic Search API von Foxbase korrekt ist und wirft einen Error falls es schief gelaufen ist.

```ts
Parameter:
response: Response

return: void
```

Die Response ist die Fetch Request Responst die von der API zurückgegeben wird.

#### [checkUserAuthority.ts](../server/utils/checkUserAuthority.ts)

Prüft ob der User eine der übergebenen Rollen hat.

```ts
Parameter:
session: UserSession
neededRole: string[]

return: boolean
```

Mögliche Rollen sind: "observer", "curator" und "admin". <br>
[_UserSession_](../types/auth.d.ts)

#### [convertDbProductToProduct.ts](../server/utils/convertDbProductToProduct.ts)

Konvertiert ein [DbProduct](../types/DbProduct.d.ts) (die Form wie Produkte in der Datenbank vorliegen) in ein [Product](../types/Product.d.ts) (die Form wie es im Frontend gebraucht wird).

```ts
Parameter:
dbProduct: DbProduct

return: Product
```

#### [getActiveCollections.ts](../server/utils/getActiveCollection.ts)

Fetched die [Collection](../types/Collection.d.ts) Informationen für die Momentan aktive Collection.

```ts
Parameter:
null

return: Collection
```

### [tsconfig.json](../server/tsconfig.json)

TypeScript Einstellungen.

## types

Enthält mehrere Datentypen um die Einheitlichkeit des Backends zu vereinfachen.

- [ApiProduct](../types/ApiProduct.d.ts) <br> Die Produkte in der Form wie sie von Foxbase Semantic Search zurückgegeben werden.
- [UserSession](../types/auth.d.ts) <br> Informationen über den eingelogten User um ihn zum Beispiel mit der Datenbank zu verknüpfen.
- [Collection](../types/Collection.d.ts) <br> Informationen über eine Collection um die Collection in unseren Backend mit Foxbase zu Verknüpfen.
- [DbExecResult](../types/DbExecResult.d.ts) <br> Wird verwendet um zu Prüfen, ob eine Datenbank Transaktion erfolgreich war.
- [DbProduct](../types/DbProduct.d.ts) <br> Die Form in der Produkte in der Datenbank gespeichert werden.
- [DbResult](../types/DbResult.d.ts) <br> Generisches Resultat einer Datenbank Transaktion.
- [Product](../types/Product.d.ts) <br> Die Form in der Produkte im Frontend verwendet werden.
- [Prompt](../types/Prompt.d.ts) <br> Ein Datentyp um unterschiedliche Infos für Prompts zu speichern.
- [Setting](../types/Setting.d.ts) <br> Speichert zussamenhängde Informationen über einen Settings eintrag.
- [TextResponse](../types/TextResponse.d.ts) <br> Die Form in der Text von Foxbase Semantic Search zurück gegeben wird.
- [User](../types/User.d.ts) <br> Ein User in der Form wie er in der Datenbank abgespeichert wird.
