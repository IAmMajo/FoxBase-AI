-- Migration number: 0002 	 2024-11-24T16:18:04.982Z

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  UNIQUE(username)
) STRICT;

INSERT INTO users (username, password) VALUES (
  'admin',
  '$scrypt$n=16384,r=8,p=1$tt9A4C4tdMiHhi0Or4gp1A$RSHwCkXv8HjpviRMpdlc6aMPf6KDh1i2n/tuKb+veepODDW1QPX1if8NQikgfyiErV7WGx0wvse5YonpzGQwDg'
);
