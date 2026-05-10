-- TRIPS TABLE
CREATE TABLE trips (
    trip_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    trip_name VARCHAR(150) NOT NULL,
    description TEXT,

    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    cover_photo TEXT,

    is_public BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_trip_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);