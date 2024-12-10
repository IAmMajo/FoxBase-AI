-- Migration number: 0004 	 2024-12-10T16:21:52.446Z

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
  INSERT INTO prompts_fts (rowid, text) VALUES (LAST_INSERT_ROWID(), new.text);
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
