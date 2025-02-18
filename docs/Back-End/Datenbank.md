Jeder hat automatisch bei sich lokal eine eigene leere Datenbank.

## Migrationen

Es gibt den Befehl `npm run migrate`, der ausgeführt werden muss. Der Befehl führt alle SQL-Dateien aus, die im Ordner `migrations` liegen und seit dem letzten Ausführen des Befehls neu dazugekommen sind. Dort liegt beispielsweise eine Datei namens `0001_create_settings_table.sql`, die eine Tabelle anlegt, um simple Key-Value-Einstellungen speichern zu können:

```sql
-- Migration number: 0001      2024-11-20T21:20:50.914Z

CREATE TABLE settings (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  UNIQUE(name)
) STRICT;
```

Wenn jemand Änderungen an der Struktur der Datenbank vornehmen möchte (beispielsweise eine neue Tabelle erstellen oder eine Spalte zu einer bestehenden Tabelle hinzufügen), kann mit `npm run create-migration <name>` eine neue Migration zum `migrations`-Ordner hinzufügt und diese anschließend mit dem gewünschten Inhalt befüllt werden. Alle führen dann bei sich `npm run migrate` aus, um die Änderungen in ihre eigene Datenbank zu übernehmen. Stage und Production haben auch jeweils eine eigene Datenbank. Beim Deployment auf Stage beziehungsweise Production werden auch automatisch immer alle neuen Migrationen auf der Stage-Datenbank beziehungsweise Production-Datenbank ausgeführt.

## Datenbanknutzung

Im App-Code kann beispielsweise so auf die Datenbank zugegriffen und ein neuer Eintrag in eine Tabelle eingefügt werden:

```ts
const db = useDatabase();
const result = await db.sql<DbExecResult>`
  INSERT INTO settings (name, value) VALUES (${body.name}, ${body.value})
  ON CONFLICT (name) DO UPDATE SET value = ${body.value}
`;
if (!result.success) {
  throw createError("Something went wrong during database operation");
}
```

Und so die Daten aus einer Tabelle abgerufen werden:

```ts
const db = useDatabase();
const { rows } = await db.sql<DbResult<Setting>>`SELECT * FROM settings`;
if (!rows.success) {
  throw createError("Something went wrong during database operation");
}
return rows.results;
```

Der SQL-Syntax sowohl für die Migrationen als auch für die SQL-Abfragen entspricht dabei dem [Syntax von SQLite](https://www.sqlite.org/lang.html).
