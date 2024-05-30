// import axios from "axios";
// axios.defaults.baseURL = "https://api.unsplash.com/";

// const MyAccess = "AIK1kkcDQtr5tx71hXjaprpcLRmG884OQKAMFhDVvag";

// export const fetchImages = async (searchQuery: string, currenPage: number) => {
//   const response = await axios.get(`search/photos/?client_id=${MyAccess}`, {
//     params: {
//       query: searchQuery,
//       page: currenPage,
//       per_page: 12,
//     },
//   });
//   console.log(response.data.results);
//   return response.data.results;
// };
import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

const MyAccess = "AIK1kkcDQtr5tx71hXjaprpcLRmG884OQKAMFhDVvag";

interface Image {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
  };
}

export const fetchImages = async (searchQuery: string, currentPage: number): Promise<Image[]> => {
  try {
    const response = await axios.get(`/search/photos`, {
      params: {
        client_id: MyAccess,
        query: searchQuery,
        page: currentPage,
        per_page: 12,
      },
    });
    return response.data.results; // Ensure this returns an array of images
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};