import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Photo } from "../models/Photo";
import { Album } from "../models/Album";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/albums/${albumId}`
          );
          const albumData: Album = await response.json();
          setAlbum(albumData);
        } catch (error) {
          console.error("Error fetching album details:", error);
        }
      };      

    fetchAlbumDetails();
  }, [albumId]);

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
      <div>
        {album && (
          <div>
            <p>UserID (TEST): {album.userId}</p>
            <p>Title: {album.title}</p>
          </div>
        )}
      </div>

      <div>
        <h2>Photos</h2>
        <ul>
          {photos.map((photos: any) => (
            <li key={photos.id}>
              <img src={photos.thumbnailUrl} alt={photos.title} />
              <p>Title: {photos.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/profile">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
};

export default AlbumDetails;
