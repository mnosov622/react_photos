import { IPhoto } from "../../interfaces";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import "./Photo.css";

interface PhotoProps {
  photo: IPhoto;
  onTitleChange: (photoId: number, newTitle: string) => void;
}

function Photo({ photo, onTitleChange }: PhotoProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(photo.title);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onTitleChange(photo.id, editedTitle);
    setIsEditing(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
    onTitleChange(photo.id, editedTitle);
  };

  return (
    <div className="photo-card" onClick={handleEditClick}>
      {!imageLoaded && <LoadingSpinner />}
      <img
        src={photo.url}
        alt={photo.title}
        style={{ display: imageLoaded ? "block" : "none" }}
        onLoad={handleImageLoad}
      />
      <div className="photo-details">
        {isEditing ? (
          <form onSubmit={handleSaveClick}>
            <input type="text" value={editedTitle} onChange={handleTitleChange} />
            <button type="submit">Save</button>
          </form>
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
