import React, { useEffect, useState } from "react";
import { Album } from "../models/Album";
import { Link } from "react-router-dom";

const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const albumData: Album[] = await response.json();
        setAlbums(albumData);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      <h2>All Albums</h2>
      <ul>
        {albums.map((album) => (
          <Link to={`/album/${album.id}`} key={album.id}>
            <li>
              <p>Title: {album.title}</p>
            </li>
          </Link>
        ))}
      </ul>

      <Link to="/">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
};

export default Albums;
