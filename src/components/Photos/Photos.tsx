import useSWR from "swr";
import { getFetchPhotosUrl, sendStats } from "../../utils";
import { IPhoto } from "../../interfaces";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Photo from "../Photo/Photo";
import "./Photos.css";
import { useState, useEffect } from "react";

function Photos({ page }: { page: number }) {
  const [photoTitles, setPhotoTitles] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const cachedTitles = localStorage.getItem("photoTitles");
    if (cachedTitles) {
      setPhotoTitles(JSON.parse(cachedTitles));
    }
  }, []);

  const { data: photos, error } = useSWR<IPhoto[]>(getFetchPhotosUrl(page - 1), async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  const loading = !photos && !error;

  const debounceDelay = 300;
  let debounceTimeout: NodeJS.Timeout | null = null;

  const handleTitleChange = (photoId: number, newTitle: string) => {
    setPhotoTitles((prevTitles) => ({
      ...prevTitles,
      [photoId]: newTitle,
    }));

    // Debounce the function call
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {
      sendStats(newTitle);
      debounceTimeout = null;
    }, debounceDelay);

    localStorage.setItem("photoTitles", JSON.stringify({ ...photoTitles, [photoId]: newTitle }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error fetching photos: {error.message}</div>;
  }

  return (
    <>
      <h1 className="center">Photos</h1>
      <div className="photos-container">
        {photos?.map((photo) => (
          <Photo
            photo={{ ...photo, title: photoTitles[photo.id] || photo.title }}
            key={photo.id}
            onTitleChange={handleTitleChange}
          />
        ))}
      </div>
    </>
  );
}

export default Photos;
