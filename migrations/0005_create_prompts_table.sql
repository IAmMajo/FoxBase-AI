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

-- Migration number: 0005 	 2024-12-10T22:44:18.719Z

CREATE TABLE prompts (
  id INTEGER PRIMARY KEY,
  text TEXT NOT NULL,
  user INTEGER NOT NULL,
  UNIQUE(text),
  FOREIGN KEY (user) REFERENCES users (id)
) STRICT;

CREATE VIRTUAL TABLE prompts_fts USING fts5(
  text,
  content = prompts,
  content_rowid = id,
  tokenize = 'porter unicode61 remove_diacritics 2'
);

-- https://www.sqlite.org/fts5.html#external_content_tables

CREATE TRIGGER prompts_ai AFTER INSERT ON prompts BEGIN
  INSERT INTO prompts_fts (rowid, text) VALUES (new.id, new.text);
END;

CREATE TRIGGER prompts_au AFTER UPDATE ON prompts BEGIN
  INSERT INTO prompts_fts (prompts_fts, rowid, text) VALUES (
    'delete',
    old.id,
    old.text
  );
  INSERT INTO prompts_fts (rowid, text) VALUES (new.id, new.text);
END;

CREATE TRIGGER prompts_ad AFTER DELETE ON prompts BEGIN
  INSERT INTO prompts_fts (prompts_fts, rowid, text) VALUES (
    'delete',
    old.id,
    old.text
  );
END;
