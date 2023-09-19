import React, { useEffect, useState } from "react";
import Photo from "../Photo/Photo";
import { getFetchPhotosUrl } from "../../utils";
import { IPhoto } from "../../interfaces";

import "./Photos.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function Photos() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch(getFetchPhotosUrl(0));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="photos-container">
      {photos.map((photo) => (
        <div className="photo-card" key={photo.id}>
          <img src={photo.url} alt={photo.title} />
          <div className="photo-details">
            <h2>{photo.title}</h2>
            <p>Album ID: {photo.albumId}</p>
            <p>Photo ID: {photo.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Photos;
