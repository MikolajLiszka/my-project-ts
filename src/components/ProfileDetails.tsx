import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "../models/User";
import "../styles/container.css";

const ProfileDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const profileData: User = await response.json();
        setUser(profileData);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, [userId]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const postsData = await response.json();
        setUserPosts(postsData);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  useEffect(() => {
    const fetchUserAlbums = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
        const albumsData = await response.json();
        setUserAlbums(albumsData);
      } catch (error) {
        console.error("Error fetching user albums:", error);
      }
    };

    if (userId) {
      fetchUserAlbums();
    }
  }, [userId]);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div className="container mt-5">
          <ul>
            <li className="list-group">
              <p>Name: {user.name}</p>
            </li>
            <li className="list-group">
              <p>Username: {user.username}</p>
            </li>
            <li className="list-group">
              <p>Email: {user.email}</p>
            </li>
            <li className="list-group">
              <p>Street: {user.address.street}</p>
            </li>
            <li className="list-group">
              <p>Suite: {user.address.suite}</p>
            </li>
            <li className="list-group">
              <p>City: {user.address.city}</p>
            </li>
            <li className="list-group">
              <p>Zipcode: {user.address.zipcode}</p>
            </li>
          </ul>

          <h2>User Posts</h2>
          <ul>
            {userPosts.map((post: any) => (
              <Link to={`/postDetails/${post.id}`} key={post.id}>
                  <li key={post.id}>
                    <p>UserID (TEST): {post.userId}</p>
                    <p>Title: {post.title}</p>
                    <p>Body: {post.body}</p>
                  </li>
              </Link>
            ))}
          </ul>

          <h2>User Albums</h2>
          <ul>
            {userAlbums.map((albums: any) => (
              <Link to={`/albumDetails/${albums.id}`} key={albums.id}>
                <li key={albums.id}>
                  <p>UserID (TEST): {albums.userId}</p>
                  <p>Title: {albums.title}</p>
                </li>
              </Link>
            ))}
          </ul>

          <div>
            <Link to="/">
              <button className="btn btn-primary">Back</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
