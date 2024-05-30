import React from "react";
import { Image as ImageItem } from "../App/App.types";

interface ImageCardProps {
  item: ImageItem;
  openModal: (item: ImageItem) => void;
}
const ImageCard: React.FC<ImageCardProps> = ({ item, openModal }) => {
  return (
    <div>
      <img
        src={item.urls.small}
        alt={item.alt_description}
        onClick={() => openModal(item)}
      />
    </div>
  );
};
export default ImageCard;