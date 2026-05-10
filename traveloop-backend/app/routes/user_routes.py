from uuid import uuid4

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.db import get_connection
from app.security import (
    hash_password,
    verify_password,
)

router = APIRouter(prefix="/api", tags=["users"])


class SignupPayload(BaseModel):
    full_name: str
    email: str
    password: str


class LoginPayload(BaseModel):
    email: str
    password: str


class ProfileUpdatePayload(BaseModel):
    full_name: str
    email: str
    country: str | None = None
    travel_preference: str | None = None


class TripCreatePayload(BaseModel):
    user_id: str
    trip_name: str
    description: str | None = None
    start_date: str
    end_date: str
    cover_photo: str | None = None
    is_public: bool = False


class NoteCreatePayload(BaseModel):
    trip_id: str
    title: str
    note_text: str


class TripStopCreatePayload(BaseModel):
    trip_id: str
    city_name: str
    arrival_date: str
    departure_date: str
    activities: str | None = None


def row_to_dict(row):
    return dict(row) if row else None


@router.get("/users")
def get_users():
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT
                user_id,
                full_name,
                email,
                country,
                travel_preference,
                profile_photo,
                created_at
            FROM users
            ORDER BY created_at DESC
            """
        )
        users = [
            dict(row) for row in cursor.fetchall()
        ]

    return {"users": users}


@router.get("/health")
def health_check():
    return {"status": "ok"}


@router.post("/auth/signup", status_code=201)
def signup(payload: SignupPayload):
    email = payload.email.strip().lower()
    full_name = payload.full_name.strip()

    if not full_name:
        raise HTTPException(
            status_code=400,
            detail="Full name is required.",
        )

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email is required.",
        )

    if len(payload.password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters long.",
        )

    password_hash = hash_password(payload.password)
    user_id = str(uuid4())

    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT user_id
            FROM users
            WHERE email = ?
            """,
            (email,),
        )
        existing_user = cursor.fetchone()

        if existing_user:
            raise HTTPException(
                status_code=409,
                detail="An account with this email already exists.",
            )

        cursor.execute(
            """
            INSERT INTO users (
                user_id,
                full_name,
                email,
                password_hash
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                user_id,
                full_name,
                email,
                password_hash,
            ),
        )
        connection.commit()

        cursor.execute(
            """
            SELECT
                user_id,
                full_name,
                email,
                country,
                travel_preference,
                profile_photo
            FROM users
            WHERE user_id = ?
            """,
            (user_id,),
        )
        user = row_to_dict(cursor.fetchone())

    return {
        "message": "Account created successfully.",
        "user": user,
    }


@router.post("/auth/login")
def login(payload: LoginPayload):
    email = payload.email.strip().lower()

    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT
                user_id,
                full_name,
                email,
                password_hash,
                country,
                travel_preference,
                profile_photo
            FROM users
            WHERE email = ?
            """,
            (email,),
        )
        user = row_to_dict(cursor.fetchone())

    if user is None or not verify_password(
        payload.password, user["password_hash"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    return {
        "message": "Login successful.",
        "user": {
            "user_id": user["user_id"],
            "full_name": user["full_name"],
            "email": user["email"],
            "country": user["country"],
            "travel_preference": user["travel_preference"],
            "profile_photo": user["profile_photo"],
        },
    }


@router.put("/users/{user_id}")
def update_user_profile(
    user_id: str, payload: ProfileUpdatePayload
):
    email = payload.email.strip().lower()
    full_name = payload.full_name.strip()

    if not full_name:
        raise HTTPException(
            status_code=400,
            detail="Full name is required.",
        )

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email is required.",
        )

    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT user_id
            FROM users
            WHERE email = ?
              AND user_id <> ?
            """,
            (email, user_id),
        )
        existing_user = cursor.fetchone()

        if existing_user:
            raise HTTPException(
                status_code=409,
                detail="Another account already uses this email.",
            )

        cursor.execute(
            """
            UPDATE users
            SET
                full_name = ?,
                email = ?,
                country = ?,
                travel_preference = ?
            WHERE user_id = ?
            """,
            (
                full_name,
                email,
                payload.country,
                payload.travel_preference,
                user_id,
            ),
        )
        connection.commit()

        cursor.execute(
            """
            SELECT
                user_id,
                full_name,
                email,
                country,
                travel_preference,
                profile_photo
            FROM users
            WHERE user_id = ?
            """,
            (user_id,),
        )
        user = row_to_dict(cursor.fetchone())

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "message": "Profile updated successfully.",
        "user": user,
    }


@router.get("/users/{user_id}/trips")
def get_user_trips(user_id: str):
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT
                trip_id,
                user_id,
                trip_name,
                description,
                start_date,
                end_date,
                cover_photo,
                is_public,
                created_at
            FROM trips
            WHERE user_id = ?
            ORDER BY start_date DESC, created_at DESC
            """,
            (user_id,),
        )
        trips = [
            {
                **dict(row),
                "is_public": bool(row["is_public"]),
            }
            for row in cursor.fetchall()
        ]

    return {"trips": trips}


@router.post("/trips", status_code=201)
def create_trip(payload: TripCreatePayload):
    trip_name = payload.trip_name.strip()
    description = (
        payload.description.strip()
        if payload.description
        else None
    )

    if not trip_name:
        raise HTTPException(
            status_code=400,
            detail="Trip name is required.",
        )

    trip_id = str(uuid4())

    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT user_id
            FROM users
            WHERE user_id = ?
            """,
            (payload.user_id,),
        )
        user = cursor.fetchone()

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found.",
            )

        cursor.execute(
            """
            INSERT INTO trips (
                trip_id,
                user_id,
                trip_name,
                description,
                start_date,
                end_date,
                cover_photo,
                is_public
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                trip_id,
                payload.user_id,
                trip_name,
                description,
                payload.start_date,
                payload.end_date,
                payload.cover_photo,
                int(payload.is_public),
            ),
        )
        connection.commit()

        cursor.execute(
            """
            SELECT
                trip_id,
                user_id,
                trip_name,
                description,
                start_date,
                end_date,
                cover_photo,
                is_public,
                created_at
            FROM trips
            WHERE trip_id = ?
            """,
            (trip_id,),
        )
        row = cursor.fetchone()
        trip = {
            **dict(row),
            "is_public": bool(row["is_public"]),
        }

    return {
        "message": "Trip created successfully.",
        "trip": trip,
    }


@router.get("/users/{user_id}/notes")
def get_user_notes(user_id: str):
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT
                n.note_id,
                n.trip_id,
                n.title,
                n.note_text,
                n.created_at,
                t.trip_name
            FROM trip_notes n
            JOIN trips t
              ON t.trip_id = n.trip_id
            WHERE t.user_id = ?
            ORDER BY n.created_at DESC
            """,
            (user_id,),
        )
        notes = [
            dict(row) for row in cursor.fetchall()
        ]

    return {"notes": notes}


@router.post("/notes", status_code=201)
def create_note(payload: NoteCreatePayload):
    title = payload.title.strip()
    note_text = payload.note_text.strip()

    if not title:
        raise HTTPException(
            status_code=400,
            detail="Note title is required.",
        )

    if not note_text:
        raise HTTPException(
            status_code=400,
            detail="Note text is required.",
        )

    note_id = str(uuid4())

    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT
                trip_id,
                trip_name
            FROM trips
            WHERE trip_id = ?
            """,
            (payload.trip_id,),
        )
        trip = cursor.fetchone()

        if trip is None:
            raise HTTPException(
                status_code=404,
                detail="Trip not found.",
            )

        cursor.execute(
            """
            INSERT INTO trip_notes (
                note_id,
                trip_id,
                title,
                note_text
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                note_id,
                payload.trip_id,
                title,
                note_text,
            ),
        )
        connection.commit()

        cursor.execute(
            """
            SELECT
                n.note_id,
                n.trip_id,
                n.title,
                n.note_text,
                n.created_at,
                t.trip_name
            FROM trip_notes n
            JOIN trips t
              ON t.trip_id = n.trip_id
            WHERE n.note_id = ?
            """,
            (note_id,),
        )
        note = row_to_dict(cursor.fetchone())

    return {
        "message": "Note saved successfully.",
        "note": note,
    }


@router.get("/trips/{trip_id}/stops")
def get_trip_stops(trip_id: str):
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT
                stop_id,
                trip_id,
                city_name,
                arrival_date,
                departure_date,
                stop_order,
                activities,
                created_at
            FROM trip_stops
            WHERE trip_id = ?
            ORDER BY stop_order ASC, arrival_date ASC
            """,
            (trip_id,),
        )
        stops = [
            dict(row) for row in cursor.fetchall()
        ]

    return {"stops": stops}


@router.post("/stops", status_code=201)
def create_trip_stop(
    payload: TripStopCreatePayload,
):
    city_name = payload.city_name.strip()
    activities = (
        payload.activities.strip()
        if payload.activities
        else None
    )

    if not city_name:
        raise HTTPException(
            status_code=400,
            detail="City name is required.",
        )

    stop_id = str(uuid4())

    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT trip_id
            FROM trips
            WHERE trip_id = ?
            """,
            (payload.trip_id,),
        )
        trip = cursor.fetchone()

        if trip is None:
            raise HTTPException(
                status_code=404,
                detail="Trip not found.",
            )

        cursor.execute(
            """
            SELECT COALESCE(MAX(stop_order), 0) + 1 AS next_order
            FROM trip_stops
            WHERE trip_id = ?
            """,
            (payload.trip_id,),
        )
        next_order = cursor.fetchone()["next_order"]

        cursor.execute(
            """
            INSERT INTO trip_stops (
                stop_id,
                trip_id,
                city_name,
                arrival_date,
                departure_date,
                stop_order,
                activities
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                stop_id,
                payload.trip_id,
                city_name,
                payload.arrival_date,
                payload.departure_date,
                next_order,
                activities,
            ),
        )
        connection.commit()

        cursor.execute(
            """
            SELECT
                stop_id,
                trip_id,
                city_name,
                arrival_date,
                departure_date,
                stop_order,
                activities,
                created_at
            FROM trip_stops
            WHERE stop_id = ?
            """,
            (stop_id,),
        )
        stop = row_to_dict(cursor.fetchone())

    return {
        "message": "Stop added successfully.",
        "stop": stop,
    }
