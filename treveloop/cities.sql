-- CITIES TABLE
CREATE TABLE cities (
    city_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    city_name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,

    cost_index NUMERIC(10,2),

    popularity_score INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);