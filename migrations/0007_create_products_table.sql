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
