#!/bin/bash

# Copyright 2025 Alina Marie Hartmann, Max Josef Overlack, Nils Paaßen,
# Nico Puelacher, Hanna Steffen, Lena Weuste
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

foxbase_collection=553BCD50-71D5-11EF-B48C-9BF348DF607F

echo "Importing products from FoxBase's API..."

echo 'Trying to login with username and password "admin"...'
login_response=$(curl localhost:3000/api/login -H 'Content-Type: application/json' -d '{"username": "admin", "password": "admin"}' --no-progress-meter -c cookies.txt -w %{http_code})
login_status_code=${login_response: -3}
if [[ $login_status_code -eq 401 ]]; then
    echo "Couldn't login with username and password \"admin\". Did you change the default password? Now assuming that the products have already been imported and that no action is needed."
    exit 0
fi
if [[ $login_status_code -lt 200 || $login_status_code -ge 300 ]]; then
    echo "An error occcured during login:"
    echo ${login_response:0:${#login_response} - 3}
    exit 1
fi
echo 'Successfully logged in'

echo 'Starting import (this might take a while)...'
import_response=$(curl localhost:3000/api/collections -b cookies.txt -H 'Content-Type: application/json' -d "{\"collectionName\": \"Default\", \"description\": \"Default collection\", \"key\": \"$foxbase_collection\"}" --no-progress-meter -w %{http_code})
import_status_code=${import_response: -3}
if [[ $import_status_code -eq 409 ]]; then
    echo "Collection already exists. Now assuming that the products have already been imported and that no action is needed."
    exit 0
fi
if [[ $import_status_code -lt 200 || $import_status_code -ge 300 ]]; then
    echo "An error occcured during import:"
    echo ${import_response:0:${#import_response} - 3}
    exit 1
fi
echo 'Successfully imported products'
