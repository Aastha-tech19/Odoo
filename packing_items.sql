-- PACKING CHECKLIST TABLE

CREATE TABLE packing_items (
    item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    trip_id UUID NOT NULL,

    item_name VARCHAR(150) NOT NULL,

    category VARCHAR(100),

    is_packed BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_packing_trip
        FOREIGN KEY(trip_id)
        REFERENCES trips(trip_id)
        ON DELETE CASCADE
);
