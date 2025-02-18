/*
 * Copyright 2025 Alina Marie Hartmann, Max Josef Overlack, Nils Paaßen,
 * Nico Puelacher, Hanna Steffen, Lena Weuste
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

-- Migration number: 0002 	 2024-11-24T16:18:04.982Z

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  UNIQUE (username)
) STRICT;

INSERT INTO users (username, password) VALUES (
  'admin',
  '$scrypt$n=16384,r=8,p=1$tt9A4C4tdMiHhi0Or4gp1A$RSHwCkXv8HjpviRMpdlc6aMPf6KDh1i2n/tuKb+veepODDW1QPX1if8NQikgfyiErV7WGx0wvse5YonpzGQwDg'
);
