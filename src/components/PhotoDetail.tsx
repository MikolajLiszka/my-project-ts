import { Photo } from "../models/Photo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import "../styles/listStyles.css";

const PhotoDetail = () => {
  const { photoId } = useParams();
  const { albumId } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/photos/${photoId}`
          );
          const photoData: Photo = await response.json();
          setPhotos([photoData]);
        } catch (error) {
          console.error("Error fetching photo:", error);
        }
      };

    fetchPhotos();
  }, [photoId]);

  return (
    <div>
      <Nav />
      <h2>All photos</h2>
      <ul className="list-unstyled d-flex flex-wrap">
        {photos.map((photo: Photo) => (
          <li key={photo.id} className="mx-2 my-2">
            <img src={photo.url} alt={photo.title} />
            <p>Title: {photo.title}</p>
          </li>
        ))}
      </ul>

      <Link to={`/album/${albumId}`}>
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
};

export default PhotoDetail;
