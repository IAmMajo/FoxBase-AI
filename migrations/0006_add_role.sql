-- Migration number: 0006 	 2025-01-12T16:01:55.572Z

ALTER TABLE
  users
ADD
  COLUMN role TEXT NOT NULL DEFAULT 'observer';

UPDATE users SET role = "admin" WHERE username = "admin"; 
