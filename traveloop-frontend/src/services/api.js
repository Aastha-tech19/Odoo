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
