-- Migration number: 0004 	 2024-12-10T19:24:26.003Z
DROP TABLE collection_creator_relation;
CREATE TABLE collection_creator_relation (
  id INTEGER PRIMARY KEY,
  collection_name TEXT NOT NULL UNIQUE,
  collection_key TEXT NOT NULL,
  collection_creator TEXT NOT NULL,
  collection_description TEXT
) STRICT;