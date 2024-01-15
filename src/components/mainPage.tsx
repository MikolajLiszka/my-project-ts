import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/login";
import { User } from "../models/User";
import ProfilePic from "../photos/user.png";
import { Photo } from "../models/Photo";
import Nav from "./Nav";

const MainPage = () => {
  const { user } = useContext(AuthContext) as { user: User | null };
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
    <div>
      <h1>Main Page</h1>
      <Nav />
      <div>
        {user ? (
          <div>
            <h2>{user.name}</h2>
            <Link to="/profile">
              <img src={ProfilePic} alt="" />
            </Link>
            <Link to="/login" className="btn btn-primary">
              Logout
            </Link>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Search user"
          value={searchName}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {searchName && filteredUsers.length > 0 && (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <Link to={`/profile/${user.id}`}>
                <p>Name: {user.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div>
        <h2>All photos</h2>
        <ul>
          {photos.map((photos: any) => (
            <li key={photos.id}>
              <img src={photos.url} alt={photos.title} />
              <p>Title: {photos.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
