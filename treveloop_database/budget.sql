-- BUDGETS TABLE
-- Overall trip budget
CREATE TABLE budgets (
    budget_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    trip_id UUID UNIQUE NOT NULL,

    total_budget NUMERIC(12,2) NOT NULL,

    transport_budget NUMERIC(12,2) DEFAULT 0,
    stay_budget NUMERIC(12,2) DEFAULT 0,
    food_budget NUMERIC(12,2) DEFAULT 0,
    activities_budget NUMERIC(12,2) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_budget_trip
        FOREIGN KEY(trip_id)
        REFERENCES trips(trip_id)
        ON DELETE CASCADE
);
