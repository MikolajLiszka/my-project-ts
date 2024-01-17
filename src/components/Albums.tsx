import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Album } from "../models/Album";
import Nav from "./Nav";
import "../styles/container.css"

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [searchUserName, setSearchUserName] = useState<string>("");

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

  const fetchUserName = async (userId: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const userData = await response.json();
      return userData.name;
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "";
    }
  };

  const handleSearchUserName = async (userName: string) => {
    setSearchUserName(userName);
    const filtered = await Promise.all(
      albums.map(async (album: Album) => {
        const albumUserName = await fetchUserName(album.userId);
        return { ...album, userName: albumUserName };
      })
    );
    const result = filtered.filter((album: any) =>
      album.userName.toLowerCase().includes(userName.toLowerCase())
    );
    setFilteredAlbums(result);
  };

  return (
    <div className="container">
      <Nav />

      <div>
        <input
          type="text"
          placeholder="Search album by user name"
          value={searchUserName}
          onChange={(e) => handleSearchUserName(e.target.value)}
          className="form-control"
        />
      </div>

      <ul className="list-group">
        {filteredAlbums.map((album: Album) => (
          <li className="list-group-item" key={album.id}>
            <Link to={`/album/${album.id}`} className="link-offset-2 link-underline link-underline-opacity-0">
              <p className="titleAlbum">Title: {album.title}</p>
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
