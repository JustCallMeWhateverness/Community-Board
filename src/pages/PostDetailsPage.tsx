import type Post from '../interfaces/Post';
import { Row, Col } from 'react-bootstrap';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import postsAndCategoryLoader from '../utils/postsAndCategoryLoader.tsx';
import { useUser } from "../hooks/UserContext";

PostDetailsPage.route = {
  path: '/posts/:slug',
  parent: '/',
  loader: postsAndCategoryLoader
};

export default function PostDetailsPage() {

  const { user } = useUser();
  const { slug } = useParams();
  const { posts } = useLoaderData() as { posts: Post[] };
  const post = posts.find(p => p.slug === slug);
  const { categories } = useLoaderData() as { categories: any[] };

  // if no post found, show 404
  if (!post) {
    return <NotFoundPage />;
  }
  if (!user) return <p className="text-danger">No user is logged in.</p>;
  const { title, overview, date, description, categoryID, userID } = post;

  return <article className="post-details">
    <Row className="text-center">
      <Col>
        <h2 className="text-primary">{title}</h2>
        {overview.split('\n').map((x, i) => <p key={i}>{x}</p>)}
      </Col>
    </Row>
    <Row className="text-center">
      <Col className="px-4 pb-4">
        <Row className="p-3 bg-primary-subtle rounded">
          <Col xs={12} className="mb-2">
            <strong className="d-block">Description:</strong>
            <span
              className="d-block d-sm-inline ms-2"
            >
              {description}
            </span>
          </Col>
          <Col xs={12} className="mb-2">
            <strong className="d-block">Date created:</strong>
            <span
              className="d-block d-sm-inline ms-2"
            >
              {new Date(date).toLocaleDateString()}
            </span>
          </Col>
          <Col xs={12} className=" mb-2">
            <strong className="d-block">Category:</strong>
            <span
              className="d-block d-sm-inline ms-2"
            >
              {categories.find(c => c.id === categoryID)?.name || 'Uncategorized'}

            </span>
          </Col>
          <Col xs={12} className="mb-2">
            <strong className="d-block">Created by:</strong>
            <span
              className="d-block d-sm-inline ms-2"
            >
              {userID === user.id ? user.username : 'Redacted'}

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