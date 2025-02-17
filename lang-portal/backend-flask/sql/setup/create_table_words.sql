CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  russian TEXT NOT NULL,
  english TEXT NOT NULL,
  latin TEXT NOT NULL,
  parts TEXT NOT NULL  -- Store parts as JSON string
);