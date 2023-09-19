import { sendStats } from "../../utils";
import { IPhoto } from "../../interfaces";
import Photo from "../Photo/Photo";
import "./Photos.css";
import { useState, useEffect } from "react";

interface PhotosProps {
  photos: IPhoto[] | undefined;
}

function Photos({ photos }: PhotosProps) {
  const [photoTitles, setPhotoTitles] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const cachedTitles = localStorage.getItem("photoTitles");
    if (cachedTitles) {
      setPhotoTitles(JSON.parse(cachedTitles));
    }
  }, []);

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
