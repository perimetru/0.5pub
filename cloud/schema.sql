CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY CHECK(id=1), payload TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS reservations (id TEXT PRIMARY KEY, payload TEXT NOT NULL, created_at TEXT NOT NULL, delivered INTEGER NOT NULL DEFAULT 0);
CREATE INDEX IF NOT EXISTS reservation_delivery ON reservations(delivered, created_at);
CREATE TABLE IF NOT EXISTS request_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS website_settings (id INTEGER PRIMARY KEY CHECK(id=1), payload TEXT NOT NULL, updated_at TEXT NOT NULL);
