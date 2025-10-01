import { Row, Col } from "react-bootstrap";
import type Post from "../interfaces/Post";
import PostList from "../components/PostList";

interface Props {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export default function UserPostsSection({ posts, onEdit, onDelete }: Props) {
  return (
    <Row className="mt-4 text-center">
      <Col>
        <h4>Your Posts</h4>
        <PostList posts={posts} handleEdit={onEdit} handleDelete={onDelete} />
      </Col>
    </Row>
  );
}