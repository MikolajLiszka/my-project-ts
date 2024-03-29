import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Post } from "../models/Post";
import Nav from "./Nav";
import { User } from "../models/User";
import { AuthContext } from "./login";
import { Comment } from "../models/Comment";
import "../styles/container.css";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [addedComments, setAddedComments] = useState<{
    [postId: number]: string;
  }>({});
  const [addedPostTitle, setAddedPostTitle] = useState("");
  const [addedPostBody, setAddedPostBody] = useState("");
  const { user } = useContext(AuthContext);
  
  

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postsData: Post[] = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPostData();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersData: User[] = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersData();
  }, []);

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const commentsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const commentsData: Comment[] = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCommentsData();
  }, []);

  const getUserName = (userId: any) => {
    const user = users.find((user: any) => user.id === userId);
    return user?.name;
  };

  const renderComments = (postId: number) => {
    const postComments = comments.filter(
      (comment) => comment.postId === postId
    );

    return (
      <ul>
        {postComments.map((comment: Comment) => (
          <li key={comment.id}>
            <p>Name: {comment.name}</p>
            <p>Email: {comment.email}</p>
            <p>Body: {comment.body}</p>
            {user && user.name === comment.name && (
              <div className="deleteCommentContainer">
                <button
                  onClick={() => deleteComment(postId, comment.id)}
                  className="btn btn-primary btn-danger btnCss"
                >
                  Delete Comment
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const addedPostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddedPostTitle(e.target.value);
  };

  const addedPostBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddedPostBody(e.target.value);
  };

  const findNextAvailableId = () => {
    const allPostIds = posts.map((post) => post.id);
    let nextId = 1;
  
    while (allPostIds.includes(nextId)) {
      nextId++;
    }
  
    return nextId;
  };
  
  const addNewPost = () => {
    if (!user) {
      console.warn("User is not logged in. Cannot add posts.");
      return;
    }
  
    const newPost: Post = {
      userId: user.id,
      id: findNextAvailableId(),
      title: addedPostTitle,
      body: addedPostBody,
    };
  
    setPosts((prevPosts) => [...prevPosts, newPost]);
  
    setAddedPostTitle("");
    setAddedPostBody("");
  
    console.log(`Added new post: ${JSON.stringify(newPost)}`);
  };

  const commentChange = (
    postId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddedComments((prevComments) => ({
      ...prevComments,
      [postId]: e.target.value,
    }));
  };

  const addComment = (postId: number) => {
    const commentText = addedComments[postId];
    console.log(`Adding comment "${commentText}" for post ${postId}`);

    setComments((prevComments: any) => [
      ...prevComments,
      {
        postId,
        id: prevComments.length + 1,
        name: user?.name,
        email: user?.email,
        body: commentText,
      },
    ]);

    setAddedComments((prevComments) => ({
      ...prevComments,
      [postId]: "",
    }));
  };

  const deleteComment = (postId: number, commentId: number) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );

    setComments(updatedComments);
  };

  const deletePost = (postId: number) => {
    if (!user) {
      console.warn("User is not logged in. Cannot delete posts.");
      return;
    }

    const updatedPosts = posts.filter((post) => post.id !== postId);

    setPosts(updatedPosts);
  
    console.log(`Deleted post with postId: ${postId}`);
  };
  
  

  return (
    <div className="container">
      <Nav />
      <div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={addedPostTitle}
            onChange={addedPostTitleChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Body:</label>
          <input
            type="text"
            value={addedPostBody}
            onChange={addedPostBodyChange}
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-center align-items-center btnCss">
          <button onClick={addNewPost} className="btn btn-primary">
            Add Post
          </button>
        </div>
      </div>
      <ul>
      {posts.slice().reverse().map((post: Post) => (
          <li key={post.id} className="container p-5 my-5 border">
            <div>
              <h2>Post</h2>
              <Link to={"/profileDetails"} className="text-decoration-none">
                <p>{getUserName(post.userId)}</p>
              </Link>
              <p>{post.id}</p>
              <p>Title: {post.title}</p>
              <p>Body: {post.body}</p>
              {user && user.id === post.userId && (
                <button
                onClick={() => deletePost(post.id)}
                className="btn btn-danger"
              >
                Delete Post
              </button>
              )}
            </div>
            <div>
              <h2>Comments</h2>
              {renderComments(post.id)}
            </div>

            {user ? (
              <div className="form-group">
                <input
                  type="text"
                  value={addedComments[post.id] || ""}
                  onChange={(e) => commentChange(post.id, e)}
                  placeholder="Add a comment"
                  className="form-control"
                />
                <div className="d-flex justify-content-center align-items-center btnCss">
                  <button
                    onClick={() => addComment(post.id)}
                    className="btn btn-primary"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            ) : (
              <Link to={"/login"}>
                <p>You must log in to comment</p>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
