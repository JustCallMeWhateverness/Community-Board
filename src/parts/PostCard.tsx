import type Post from '../interfaces/Post';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function PostCard(
  { id, title, overview, date, slug }: Post
) {
  const navigate = useNavigate();
  return <Card
    className="mb-4 border-0"
    role="button" /*sets the cursor to pointer*/
    onClick={() => navigate('/posts/' + slug)}
  >
    <Card.Body as={Row} >
      <Col>

        <Card.Title>{title}</Card.Title>
        <Card.Text className="mb-0">
          <strong className="d-none d-none d-sm-inline-block">Overview:</strong>
          <span className="float-end">{overview}</span>
        </Card.Text>
        <Card.Title></Card.Title>
        <Card.Text className="mb-0">
          <strong>Date created:</strong>
          <span
            className="d-block d-sm-inline float-sm-end"
          >
            {new Date(date).toLocaleDateString()}
          </span>
        </Card.Text>
        <Button variant="primary">More info</Button>
      </Col>
    </Card.Body>
  </Card >;
}