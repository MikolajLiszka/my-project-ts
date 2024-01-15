import { Photo } from "../models/Photo";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";

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
      <ul>
        {photos.map((photo: Photo) => (
          <li key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <p>Title: {photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetailsAll;
