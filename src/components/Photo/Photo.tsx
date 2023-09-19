import { IPhoto } from "../../interfaces";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import "./Photo.css";

interface PhotoProps {
  photo: IPhoto;
  onTitleChange: (photoId: number, newTitle: string) => void;
}

function Photo({ photo, onTitleChange }: PhotoProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");

  useEffect(() => {
    const localStorageTitle = localStorage.getItem("photoTitles");
    const parsedLocalStorage = localStorageTitle ? JSON.parse(localStorageTitle) : {};
    setEditedTitle(parsedLocalStorage[photo.id] || photo.title);
  }, [photo.id]);

  const handleSaveClick = () => {
    onTitleChange(photo.id, editedTitle);
    setIsEditing(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(photo.id, editedTitle);
    setEditedTitle(e.target.value);
  };

  return (
    <div className="photo-card" onClick={() => setIsEditing(true)}>
      {!imageLoaded && <LoadingSpinner />}
      <img
        src={photo.url}
        alt={photo.title}
        style={{ display: imageLoaded ? "block" : "none" }}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="photo-details">
        {isEditing ? (
          <>
            <form className="form-container" onSubmit={handleSaveClick}>
              <input type="text" value={editedTitle} onChange={handleTitleChange} />
              <button type="submit">Save</button>
            </form>
          </>
        ) : (
          <>
            <h2>{photo.title}</h2>
          </>
        )}
      </div>
    </div>
  );
}

export default Photo;
