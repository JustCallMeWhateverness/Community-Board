import type Post from '../interfaces/Post';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function PostCard(
  { title, overview, date, slug }: Post
) {
  const navigate = useNavigate();
  return <Card
    className="mb-4 border-0"
    role="button" /*sets the cursor to pointer*/
    onClick={() => navigate('/posts/' + slug)}
  >
    <Card.Body as={Row} >
      <Col className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="mb-0">
          <span className="ms-2">{overview}</span>
        </Card.Text>
        <Card.Title></Card.Title>
        <Card.Text className="mb-0">
          <strong>Date created:</strong>
          <span
            className="d-block d-sm-inline ms-2"
          >
            {new Date(date).toLocaleDateString()}
          </span>
        </Card.Text>
      </Col>
    </Card.Body>
  </Card >;
}
//<Link to={'/posts/' + slug}> </Link>