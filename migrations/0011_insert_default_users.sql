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

-- Migration number: 0011 	 2025-02-27T21:06:59.179Z

INSERT INTO users (username, password) VALUES
  (
    'curator',
    '$scrypt$n=16384,r=8,p=1$9nSslddgtz0fI+0IyAcbJQ$4FyxbFUO7pjJKQ9u2Ii/v/lysknw0q0wREMcixOHTF7sBW+pGnLyQa6wQhuwr0padPX3EMMM9es+PUV/7zd87g'
  ),
  (
    'observer',
    '$scrypt$n=16384,r=8,p=1$gwIoTJfBKWaKLbem4z137g$rI+Zab6fcfhCkFHLY7fGeDkZDS5mZ802iiFi27KbtQj8EkaWWHfj82OBH1B8hEBg6eG5dxsn/yyh8+/8V20r3w'
  );
