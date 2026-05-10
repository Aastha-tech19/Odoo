-- TRIP ACTIVITIES TABLE
-- Activities selected for a trip stop
CREATE TABLE activities (
    activity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    city_id UUID NOT NULL,

    activity_name VARCHAR(150) NOT NULL,

    category VARCHAR(100),

    description TEXT,

    estimated_cost NUMERIC(10,2),

    duration_hours NUMERIC(5,2),

    image_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_activity_city
        FOREIGN KEY(city_id)
        REFERENCES cities(city_id)
        ON DELETE CASCADE
);