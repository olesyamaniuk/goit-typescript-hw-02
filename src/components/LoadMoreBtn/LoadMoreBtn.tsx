import React from "react";

interface LoadMoreProps {
  onLoad: () => void;
}
const LoadMoreBtn: React.FC<LoadMoreProps> = ({ onLoad }) => {
  return (
    <button onClick={onLoad}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;