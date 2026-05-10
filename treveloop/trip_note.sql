-- TRIP NOTES TABLE

CREATE TABLE trip_notes (
    note_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    trip_id UUID NOT NULL,

    stop_id UUID,

    note_text TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_note_trip
        FOREIGN KEY(trip_id)
        REFERENCES trips(trip_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_note_stop
        FOREIGN KEY(stop_id)
        REFERENCES trip_stops(stop_id)
        ON DELETE SET NULL
);