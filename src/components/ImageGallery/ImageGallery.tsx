import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import { Image as GalleryImage } from "../App/App.types";

interface ImageGallerydProps {
  items: GalleryImage[];
  openModal: (item: GalleryImage) => void;
}
const ImageGallery: React.FC<ImageGallerydProps> = ({ items, openModal }) => {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ImageCard item={item} openModal={openModal} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ImageGallery;