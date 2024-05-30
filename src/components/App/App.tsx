// import { useEffect, useState } from "react";
// import ImageGallery from "../ImageGallery/ImageGallery";
// import SearchBar from "../SearchBar/SearchBar";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
// import ImageModal from "../ImageModal/ImageModal";
// import { fetchImages } from "../showImage";
// import { Image } from "./App.types"

// interface ImageDataPromise{
//   query:Image[];
//   page:number;

// }

// function App(): JSX.Element {
//   const [images, setImages] = useState<Image[]>([]);
//   const [isLoader, setIsLoader] = useState<boolean>(false);
//   const [error, setError] = useState<boolean>(false);
//   const [page, setPage] = useState<number>(1);
//   const [query, setQuery] = useState<string>("");

//   const handleSearch = (newQuery: string): void => {
//     setQuery(newQuery);
//     setPage(1);
//     setImages([]);
//   };

//   const hanleLoadMore = (): void => {
//     setPage(page + 1);
//   };

//   useEffect(() => {
//     if (query === "") {
//       return;
//     }
//     async function getNewImages(): Promise<void> {
//       try {
//         setError(false);
//         setIsLoader(true);
//         const data: ImageDataPromise = await fetchImages(query, page);
//         setImages((prevImages) => {
//           return [...prevImages, ...data.query];
//         });
//       } catch (error) {
//         setError(true);
//       } finally {
//         setIsLoader(false);
//       }
//     }
//     getNewImages();
//   }, [page, query]);

//   // ===========================Modal=====================================
//   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
//   const [selectedImage, setSelectedImage] = useState<Image | null>(null);
//   const openModal = (image: Image): void => {
//     setSelectedImage(image);
//     setModalIsOpen(true);
//   };

//   const closeModal = (): void => {
//     setSelectedImage(null);
//     setModalIsOpen(false);
//   };

//   return (
//     <div>
//       <SearchBar onSubmit={handleSearch} />
//       {images.length > 0 && (
//         <ImageGallery items={images} openModal={openModal} />
//       )}
//       {images.length > 0 && (
//         <ImageModal
//           open={modalIsOpen}
//           closeModal={closeModal}
//           selectedImage={selectedImage}
//         />
//       )}

//       {error && <ErrorMessage />}
//       {isLoader && <Loader />}
//       {images.length > 0 && !isLoader && <LoadMoreBtn onLoad={hanleLoadMore} />}
//     </div>
//   );
// }
// export default App;
import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../showImage";
import { Image } from "./App.types";

function App(): JSX.Element {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    const getNewImages = async (): Promise<void> => {
      try {
        setError(false);
        setIsLoader(true);
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoader(false);
      }
    };

    getNewImages();
  }, [page, query]);

  // Modal State
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <>
          <ImageGallery items={images} openModal={openModal} />
          <ImageModal open={modalIsOpen} closeModal={closeModal} selectedImage={selectedImage} />
        </>
      )}
      {error && <ErrorMessage />}
      {isLoader && <Loader />}
      {images.length > 0 && !isLoader && <LoadMoreBtn onLoad={handleLoadMore} />}
    </div>
  );
}

export default App;