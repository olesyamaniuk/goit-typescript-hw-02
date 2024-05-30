
import axios from "axios";
axios.defaults.baseURL = "https://api.unsplash.com/";

const MyAccess = "AIK1kkcDQtr5tx71hXjaprpcLRmG884OQKAMFhDVvag";


export const fetchImages = async (searchQuery: string, currentPage: number) => {
  try {
    const response = await axios.get(`/search/photos`, {
      params: {
        client_id: MyAccess,
        query: searchQuery,
        page: currentPage,
        per_page: 12,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};