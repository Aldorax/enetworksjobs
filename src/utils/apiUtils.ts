export const fetcher = async (url: string) => {
  const token = window.localStorage.getItem("access_token");
  console.log("Token:", token); // Debugging

  if (!token) {
    throw new Error("No access token found");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status); // Debugging

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data); // Debugging
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
