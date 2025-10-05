import { Button } from "react-bootstrap";
import type Post from "../interfaces/Post";
import { useNavigate } from "react-router-dom";

interface Props {
  posts: Post[];
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
}

export default function PostList({ posts, handleEdit, handleDelete }: Props) {
  const navigate = useNavigate();

  if (posts.length === 0) return <p>You haven't created any posts yet.</p>;

  return (
    <ul className="list-unstyled">
      {posts.map(post => (
        <li key={post.id} className="border p-3 bg-light mb-3">
          <strong>{post.title}</strong>, {post.overview}
          <hr />
          <Button className="ms-2 btn btn-primary btn-sm" onClick={() => navigate('/posts/' + post.slug)}>Details</Button>
          <Button className="ms-2 btn btn-secondary btn-sm" onClick={() => handleEdit(post)}>Edit</Button>
          <Button className="ms-2 btn btn-danger btn-sm" onClick={() => handleDelete(post)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
}