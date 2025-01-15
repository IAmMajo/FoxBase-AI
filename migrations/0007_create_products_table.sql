-- Migration number: 0007 	 2025-01-12T19:11:11.364Z

CREATE UNIQUE INDEX collection_creator_relation_unique_collection_key
ON collection_creator_relation (collection_key);

ALTER TABLE collection_creator_relation DROP COLUMN collection_creator;

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  foxbase_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  collection INTEGER NOT NULL,
  UNIQUE (foxbase_id, collection),
  FOREIGN KEY (collection) REFERENCES collection_creator_relation (id)
  ON DELETE CASCADE
) STRICT;
