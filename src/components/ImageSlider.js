import React, { useState, useEffect } from "react";

const ImageSlider = ({ images }) => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="image-slider">
      <img
        src={BASE_URL + "/uploads/" + images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        className="slider-image"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ImageSlider;
