const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api"

async function request(path, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.detail ||
        data.message ||
        "Something went wrong while talking to the server."
    )
  }

  return data
}

export function signupUser(data) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function loginUser(data) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function getUsers() {
  return request("/users")
}

export function healthCheck() {
  return request("/health")
}

export function updateUserProfile(
  userId,
  data
) {
  return request(`/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function createTrip(data) {
  return request("/trips", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function getUserTrips(userId) {
  return request(`/users/${userId}/trips`)
}

export function getUserNotes(userId) {
  return request(`/users/${userId}/notes`)
}

export function createNote(data) {
  return request("/notes", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function getTripStops(tripId) {
  return request(`/trips/${tripId}/stops`)
}

export function createTripStop(data) {
  return request("/stops", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function getTripRecommendations(data) {
  try {
    return await request("/recommend-trip", {
      method: "POST",
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error("API Error:", error)
    return []
  }
}
