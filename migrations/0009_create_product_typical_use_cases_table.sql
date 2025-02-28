-- Migration number: 0009 	 2025-01-12T19:11:54.249Z

CREATE TABLE product_typical_use_cases (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  product INTEGER NOT NULL,
  UNIQUE (name, product),
  FOREIGN KEY (product) REFERENCES products (id) ON DELETE CASCADE
) STRICT;
