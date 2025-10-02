import type Post from '../interfaces/Post';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotFoundPage from './NotFoundPage';
import postsAndCategoryLoader from '../utils/postsAndCategoryLoader.tsx';
import type User from '../interfaces/User.ts';
import { useUser } from "../context/UserContext.tsx";

PostDetailsPage.route = {
  path: '/posts/:slug',
  parent: '/',
  loader: postsAndCategoryLoader
};

export default function PostDetailsPage() {

  const { slug } = useParams();
  const { posts, categories, } = useLoaderData() as {
    posts: Post[],
    categories: any[],
  };
  const post = posts.find(p => p.slug === slug);
  const [author, setAuthor] = useState<User | null>(null);
  const { user } = useUser();
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {
    if (post) {
      fetch(`/api/users/${post.userID}`)
        .then(res => res.json())
        .then(data => setAuthor(data))
    }
  }, [post, showAuthor, user]);


  // if no post found, show 404
  if (!post) {
    return <NotFoundPage />;
  }


  const { title, overview, date, description, categoryID } = post;

  return <article className="post-details">
    <Row className="text-center">
      <Col>
        <h2 className="text-primary">{title}</h2>
        {overview.split('\n').map((x, i) => <p key={i}>{x}</p>)}
      </Col>
    </Row>
    <Row className="text-center">
      <Col className="px-4 pb-4">
        <Row className="p-3 bg-light">
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
            {!showAuthor ? (
              <Button
                className="ms-2 btn btn-sm "
                onClick={() => setShowAuthor(true)}
              >
                Show User
              </Button>
            ) : (
              <span className="d-block d-sm-inline ms-2">
                {!user
                  ? "Have to be logged in to see user information"
                  : author?.username ?? "Unknown user"}
              </span>
            )}
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