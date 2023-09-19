import React, { useEffect, useState } from "react";
import { getFetchPhotosUrl } from "../../utils";
import { IPhoto } from "../../interfaces";
import "./Photos.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Pagination from "../Pagination/Pagination";

function Photos() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1); // Start from page 1
  const [totalPages, setTotalPages] = useState<number>(5); // Total number of pages
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const abortController = new AbortController();

  useEffect(() => {
    async function fetchPhotos() {
      if (isFetching) {
        abortController.abort();
      }

      setIsFetching(true);

      try {
        const response = await fetch(getFetchPhotosUrl(page - 1), {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      } finally {
        setIsFetching(false);
      }
    }

    fetchPhotos();

    return () => {
      abortController.abort();
    };
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
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
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}

export default Photos;
