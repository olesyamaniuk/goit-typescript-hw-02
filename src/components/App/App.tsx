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
        const data : Image[] = await fetchImages(query, page);
        setImages((prevImages: Image[]) => {
          const updatedImages: Image[] = [...prevImages, ...data];
          return updatedImages;
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoader(false);
      }
    };

    getNewImages();
  }, [page, query]);

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