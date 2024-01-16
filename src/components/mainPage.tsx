import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/User";
import { Photo } from "../models/Photo";
import "../styles/container.css";
import Nav from "./Nav";

const MainPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchName, setSearchName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const userData: User[] = await response.json();
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        const photosData: Photo[] = await response.json();
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const handleSearch = (sName: string) => {
    setSearchName(sName);
    const filtered = users.filter((user: any) =>
      user.name.toLowerCase().startsWith(sName.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="container">
      <Nav />

      <div className="text-center my-3 inputContainer">
        <input
          type="text"
          placeholder="Search user"
          value={searchName}
          onChange={(e) => handleSearch(e.target.value)}
          className="form-control"
        />
      </div>

      {searchName && filteredUsers.length > 0 && (
        <ul className="list-group listGroup">
          {filteredUsers.map((user) => (
            <li key={user.id} className="list-group-item">
              <Link to={`/profile/${user.id}`} className="text-decoration-none">
                <p className="mb-0">Name: {user.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="text-center my-4">
        <h2>All Photos</h2>
        {photos.map((photo: any) => (
          <div key={photo.id} className="col-md-6 mx-auto mb-3">
            <div className="card">
              <img src={photo.url} alt={photo.title} className="card-img-top" />
              <div className="card-body">
                <p className="card-text">{photo.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
