import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Photo } from "../models/Photo";
import { Album } from "../models/Album";
import "../styles/container.css";

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
    <div className="container">
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
        <ul className="list-unstyled d-flex flex-wrap">
          {photos.map((photos: any) => (
            <Link to={`/albumDetails/${albumId}/${photos.id}`}>
                <li key={photos.id} className="mx-2 my-2">
                  <img src={photos.thumbnailUrl} alt={photos.title} />
                </li>
            </Link>
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
