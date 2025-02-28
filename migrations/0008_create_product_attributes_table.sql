-- Migration number: 0008 	 2025-01-12T19:11:22.529Z

CREATE TABLE product_attributes (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  product INTEGER NOT NULL,
  UNIQUE (name, product),
  FOREIGN KEY (product) REFERENCES products (id) ON DELETE CASCADE
) STRICT;
