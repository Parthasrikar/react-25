/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./styles.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function ImageSlider({ url, limit }) {
  const [images, setimages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImage(getURL) {
    try {
      setLoading(true);
      const response = await fetch(`${getURL}?page=1&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setimages(data);
        setLoading(false);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  function handlePre() {
    currentSlide == 0 ? setCurrentSlide(images.length-1) : setCurrentSlide(currentSlide-1)
  }
  function handleNext() {
    currentSlide === images.length-1? setCurrentSlide(0) : setCurrentSlide(currentSlide+1)
  }

  useEffect(() => {
    if (url != "") {
      fetchImage(url);
    }
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error != null) {
    return <div>Error </div>;
  }

  return (
    <div className="container w-[50%] ml-[25%] mt-0 mb-20">
      <BsArrowLeftCircleFill onClick={handlePre} className="arrow arrow-left"></BsArrowLeftCircleFill>
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.download_url}
              src={imageItem.download_url}
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right"></BsArrowRightCircleFill>
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}

export { ImageSlider };
