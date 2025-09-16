import type Post from '../interfaces/Post';
import { Row, Col } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Image from '../parts/Image';
import postsLoader from '../utils/postsLoader';

PostDetailsPage.route = {
  path: '/posts/:slug',
  parent: '/',
  loader: postsLoader
};

export default function PostDetailsPage() {

  const post =
    useLoaderData().posts[0] as Post;

  // if no post found, show 404
  if (!post) {
    return <NotFoundPage />;
  }

  const { id, title, date, description, categories } = post;

  return <article className="post-details">
    <Row>
      <Col>
        <h2 className="text-primary">{title}</h2>
        {description.split('\n').map((x, i) => <p key={i}>{x}</p>)}
      </Col>
    </Row>
    <Row>
      <Col className="px-4 pb-4">
        <Row className="p-3 bg-primary-subtle rounded">
          <Col className="pe-4 pe-sm-5 border-end border-primary">
            <strong>Description</strong>:
            <span
              className="d-block d-sm-inline float-sm-end"
            >
              {description}
            </span>
          </Col>
          <Col className="ps-4 ps-sm-5 text-end text-sm-start">
            <strong>Date:</strong>
            <span
              className="d-block d-sm-inline float-sm-end"
            >
              {new Date(date).toLocaleDateString()}
            </span>
          </Col>
          <Col>
            <strong>Categories</strong>
            <span
              className="d-block d-sm-inline float-sm-end"
            >
              { }
            </span>
          </Col>
        </Row>
      </Col>
    </Row >
    <Row>
      <Col>
        <Link to="/" className="btn btn-primary float-end">
          Back to the post list
        </Link>
      </Col>
    </Row>
  </article >;
}