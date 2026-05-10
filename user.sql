-- USERS TABLE
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,

    profile_photo TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
