import { Photo } from "../models/Photo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import "../styles/listStyles.css";

const AlbumDetailsAll = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
        );
        const photosData: Photo[] = await response.json();
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [albumId]);

  return (
    <div>
      <Nav />
      <h2>All photos</h2>
      <ul className="list-unstyled d-flex flex-wrap">
        {photos.map((photo: Photo) => (
          <li key={photo.id} className="mx-2 my-2">
            <Link to={`/album/${albumId}/${photo.id}`}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </Link>
          </li>
        ))}
      </ul>

      <Link to={"/albums"}>
            <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
};

export default AlbumDetailsAll;
