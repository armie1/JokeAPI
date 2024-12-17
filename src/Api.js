import axios from 'axios';

const BASE_URL = "https://official-joke-api.appspot.com/jokes/random/10";

export const fetchJokes = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching jokes:", error);
    throw new Error("Failed to fetch jokes. Please try again later.");
  }
};
