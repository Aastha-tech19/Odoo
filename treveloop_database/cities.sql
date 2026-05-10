-- CITIES TABLE
CREATE TABLE cities (
    city_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    cost_index NUMERIC(10,2),
    popularity_score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO cities (
    city_name,
    country,
    cost_index,
    popularity_score
)

VALUES
('Paris', 'France', 95.50, 98),
('Rome', 'Italy', 82.30, 92),
('London', 'United Kingdom', 99.00, 97),
('New York', 'USA', 100.00, 99),
('Tokyo', 'Japan', 91.20, 96),
('Dubai', 'UAE', 88.40, 94),
('Singapore', 'Singapore', 90.10, 95),
('Bangkok', 'Thailand', 55.60, 93),
('Istanbul', 'Turkey', 60.70, 89),
('Barcelona', 'Spain', 78.90, 91),
('Amsterdam', 'Netherlands', 87.50, 90),
('Sydney', 'Australia', 92.80, 94),
('Bali', 'Indonesia', 50.20, 96),
('Seoul', 'South Korea', 79.60, 92),
('Los Angeles', 'USA', 93.70, 90),
('Mumbai', 'India', 42.50, 88),
('Delhi', 'India', 40.30, 87),
('Goa', 'India', 48.90, 91),
('Venice', 'Italy', 84.10, 89),
('Berlin', 'Germany', 76.50, 88),
('Prague', 'Czech Republic', 58.70, 85),
('Vienna', 'Austria', 80.40, 86),
('Cape Town', 'South Africa', 52.80, 84),
('Rio de Janeiro', 'Brazil', 61.20, 90),
('Toronto', 'Canada', 85.90, 87);

