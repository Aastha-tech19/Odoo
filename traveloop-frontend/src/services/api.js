const API_BASE_URL = "http://127.0.0.1:8000"

export async function getTripRecommendations(data) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/recommend-trip`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )

    const result = await response.json()
    return result
  } catch (error) {
    console.error("API Error:", error)
    return []
  }
}