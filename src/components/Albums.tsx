import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Album } from "../models/Album";
import Nav from "./Nav";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const albumsData = await response.json();
        setAlbums(albumsData);
        setFilteredAlbums(albumsData); 
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSearch = (title: any) => {
    setSearchTitle(title);
    const filtered = albums.filter((album: Album) =>
      album.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilteredAlbums(filtered);
  };

  return (
    <div className="container">
      <Nav />

      <div>
        <input
          type="text"
          placeholder="Search album by title"
          value={searchTitle}
          onChange={(e) => handleSearch(e.target.value)}
          className="form-control"
        />
      </div>

      <ul>
        {filteredAlbums.map((album: Album) => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>
              <p>Title: {album.title}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div>
            <Link to="/">
              <button className="btn btn-primary">Back</button>
            </Link>
          </div>
    </div>
  );
};

export default Albums;
