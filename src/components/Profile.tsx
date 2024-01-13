import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/login";
import { User } from "../models/User";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [userPosts, setUserPosts] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postsData = await response.json();

        const filteredPosts = postsData.filter(
          (post: any) => post.userId === user?.id
        );

        setUserPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  useEffect(() => {
    const fetchUserAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const albumsData = await response.json();

        const filteredAlbums = albumsData.filter(
          (album: any) => album.userId === user?.id
        );

        setUserAlbums(filteredAlbums);
      } catch (error) {
        console.error("Error fetching user albums:", error);
      }
    };

    if (user) {
      fetchUserAlbums();
    }
  }, [user]);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <ul>
            <li>
              <p>Name: {user.name}</p>
            </li>
            <li>
              <p>Username: {user.username}</p>
            </li>
            <li>
              <p>Email: {user.email}</p>
            </li>
            <li>
              <p>Street: {user.address.street}</p>
            </li>
            <li>
              <p>Suite: {user.address.suite}</p>
            </li>
            <li>
              <p>City: {user.address.city}</p>
            </li>
            <li>
              <p>Zipcode: {user.address.zipcode}</p>
            </li>
          </ul>

          <h2>User Posts</h2>
          <ul>
            {userPosts.map((post: any) => (
              <li key={post.id}>
                <p>UserID (TEST): {post.userId}</p>
                <p>Title: {post.title}</p>
                <p>Body: {post.body}</p>
              </li>
            ))}
          </ul>

          <h2>User Albums</h2>
          <ul>
            {userAlbums.map((albums: any) => (
              <Link to="/albumDetails">
                <li key={albums.id}>
                  <p>UserID (TEST): {albums.userId}</p>
                  <p>Title: {albums.title}</p>
                </li>
              </Link>
            ))}
          </ul>

          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
