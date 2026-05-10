import os
import sqlite3
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(
    Path(__file__).resolve().parents[1] / ".env"
)


def get_database_path() -> Path:
    configured_path = os.getenv("DATABASE_PATH")

    if configured_path:
        return Path(configured_path)

    return (
        Path(__file__).resolve().parents[1]
        / "traveloop.db"
    )


def get_connection():
    connection = sqlite3.connect(
        get_database_path(),
        check_same_thread=False,
    )
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON;")
    return connection


def init_database():
    with get_connection() as connection:
        cursor = connection.cursor()

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                user_id TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                country TEXT,
                travel_preference TEXT,
                profile_photo TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS trips (
                trip_id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                trip_name TEXT NOT NULL,
                description TEXT,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                cover_photo TEXT,
                is_public INTEGER DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id)
                    REFERENCES users(user_id)
                    ON DELETE CASCADE
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS trip_notes (
                note_id TEXT PRIMARY KEY,
                trip_id TEXT NOT NULL,
                title TEXT NOT NULL,
                note_text TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (trip_id)
                    REFERENCES trips(trip_id)
                    ON DELETE CASCADE
            )
            """
        )

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS trip_stops (
                stop_id TEXT PRIMARY KEY,
                trip_id TEXT NOT NULL,
                city_name TEXT NOT NULL,
                arrival_date TEXT NOT NULL,
                departure_date TEXT NOT NULL,
                stop_order INTEGER NOT NULL,
                activities TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (trip_id)
                    REFERENCES trips(trip_id)
                    ON DELETE CASCADE
            )
            """
        )

        connection.commit()
