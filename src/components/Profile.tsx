import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/login";
import { User } from "../models/User";
import { Link } from "react-router-dom";
import "../styles/container.css";

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
      {user && (
        <div className="container mt-5">
          <h2>Profile</h2>

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
          <ul className="list-group view">
            {userPosts.map((post: any) => (
              <Link
                to={`/postDetails/${post.id}`}
                key={post.id}
                className="text-dark link-offset-2 link-underline link-underline-opacity-0"
              >
                <li key={post.id} className="list-group-item">
                  <p>Title: {post.title}</p>
                  <p>Body: {post.body}</p>
                </li>
              </Link>
            ))}
          </ul>

          <h2>User Albums</h2>
          <ul className="list-group view">
            {userAlbums.map((albums: any) => (
              <Link
                to={`/albumDetails/${albums.id}`}
                key={albums.id}
                className="text-dark link-offset-2 link-underline link-underline-opacity-0 black"
              >
                <li className="list-group-item" key={albums.id}>
                  <p>Title: {albums.title}</p>
                </li>
              </Link>
            ))}
          </ul>

          <Link to="/">
            <button className="btn btn-primary">Back</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
