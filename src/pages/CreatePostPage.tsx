import { Row, Col, Form, Button } from 'react-bootstrap';
import type Create from '../interfaces/Create';
import Image from '../parts/Image';
import type Post from '../interfaces/Post';
import type Category from '../interfaces/Category';
import { useLoaderData } from 'react-router-dom';


CreatePostPage.route = {
  path: '/create-post',
  menuLabel: 'Create Post',
  index: 2
};

export default function CreatePostPage() {


  return <>

    <Row>
      <Col>
        <h2 className="text-primary">Create Post</h2>
      </Col>
    </Row>

    <Row>
      <Col md={6}>
        <p> Start creating you own post for the Community board!</p>
      </Col>
      <Col md={6}>
      </Col>
      <Form>
        <Form.Group>
          <Form.Label className="d-block">
            <p>Title:</p>
            <Form.Control type="text" name="postTitle" placeholder="Title" />
          </Form.Label>
          <Form.Label className="d-block">
            <p>Overview:</p>
            <Form.Control type="text" name="postOverview" placeholder="Overview" />
          </Form.Label>
          <Form.Label className="d-block">
            <p>Description:</p>
            <Form.Control type="text" name="postDescription" placeholder="Description" />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <p>Category</p>
            <Form.Select >
              <option>1</option>
            </Form.Select>
          </Form.Label></Form.Group>

        <Button className="float-end">Create Post</Button>
      </Form>
    </Row>
  </>;
}