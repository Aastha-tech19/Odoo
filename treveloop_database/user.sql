-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,

    country VARCHAR(100),
    travel_preference VARCHAR(100),
    profile_photo TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
