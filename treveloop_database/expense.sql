-- EXPENSES TABLE
-- Actual expense tracking
CREATE TABLE expenses (
    expense_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    trip_id UUID NOT NULL,

    category VARCHAR(100) NOT NULL,

    amount NUMERIC(10,2) NOT NULL,

    description TEXT,

    expense_date DATE DEFAULT CURRENT_DATE,

    CONSTRAINT fk_expense_trip
        FOREIGN KEY(trip_id)
        REFERENCES trips(trip_id)
        ON DELETE CASCADE
);