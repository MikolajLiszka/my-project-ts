import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Post } from "../models/Post";
// import { User } from "../models/User";

const Posts = () => {
  const [posts, setPosts] = useState([]);
//   const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postData = await response.json();
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(
//           "https://jsonplaceholder.typicode.com/users"
//         );
//         const userData: User[] = await response.json();
//         setUsers(userData);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              <p>Title: {post.title}</p>
              {/* <p>Author: {user}</p> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
