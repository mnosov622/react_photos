import { IPhoto } from "../../interfaces"; // Import the IPhoto interface from your types file

interface PhotoProps {
  photo: IPhoto; // Prop for passing the photo data
  key: number;
}

function Photo({ photo }: PhotoProps) {
  return (
    <div className="photo-card">
      <img src={photo.url} alt={photo.title} />
      <div className="photo-details">
        <h2>{photo.title}</h2>
        <p>Album ID: {photo.albumId}</p>
        <p>Photo ID: {photo.id}</p>
      </div>
    </div>
  );
}

export default Photo;
