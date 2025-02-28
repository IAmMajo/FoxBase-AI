-- Migration number: 0001 	 2024-11-20T21:20:50.914Z

CREATE TABLE settings (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  UNIQUE (name)
) STRICT;
