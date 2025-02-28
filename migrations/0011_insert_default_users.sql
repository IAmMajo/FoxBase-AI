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
