import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../models/Post";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        const postData: Post = await response.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        const commentsData: Comment[] = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      <div>
        {post && (
          <div>
            <p>UserID (TEST): {post.userId}</p>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
          </div>
        )}
      </div>

      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment: any) => (
            <li key={comment.id}>
              <p>Name: {comment.name}</p>
              <p>Email: {comment.email}</p>
              <p>Body: {comment.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/profile">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );
};

export default PostDetails;
