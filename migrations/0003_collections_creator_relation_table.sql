-- Migration number: 0003 	 2024-12-02T14:20:44.336Z

CREATE TABLE collection_creator_relation (
  id INTEGER PRIMARY KEY,
  collection_name TEXT NOT NULL,
  collection_key TEXT NOT NULL,
  collection_creator TEXT NOT NULL
) STRICT;
