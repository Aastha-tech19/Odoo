-- TRIP STOPS TABLE
-- Connects trips with cities

CREATE TABLE trip_stops (
    stop_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    trip_id UUID NOT NULL,
    city_id UUID NOT NULL,

    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,

    stop_order INTEGER NOT NULL,

    notes TEXT,

    CONSTRAINT fk_stop_trip
        FOREIGN KEY(trip_id)
        REFERENCES trips(trip_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_stop_city
        FOREIGN KEY(city_id)
        REFERENCES cities(city_id)
        ON DELETE CASCADE
);