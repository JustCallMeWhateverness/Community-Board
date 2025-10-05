import { Row, Col } from 'react-bootstrap';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import postsCategoryAndUserLoader from '../utils/postsCategoryAndUserLoader.tsx';
import type PostDetailsViewRow from '../interfaces/PostDetailsView.ts';
import CommentSection from '../components/CommentSection.tsx';

PostDetailsPage.route = {
  path: '/posts/:slug',
  parent: '/',
  loader: postsCategoryAndUserLoader
};

export default function PostDetailsPage() {
  const { slug } = useParams();
  const { posts } = useLoaderData() as { posts: PostDetailsViewRow[] };

  // Find the post by slug
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  const { title, overview, description, date, categoryName, authorUsername } = post;

  return (
    <article className="post-details">
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
              <span className="d-block d-sm-inline ms-2">{description}</span>
            </Col>

            <Col xs={12} className="mb-2">
              <strong className="d-block">Date created:</strong>
              <span className="d-block d-sm-inline ms-2">
                {new Date(date).toLocaleDateString()}
              </span>
            </Col>

            <Col xs={12} className="mb-2">
              <strong className="d-block">Category:</strong>
              <span className="d-block d-sm-inline ms-2">{categoryName || 'Uncategorized'}</span>
            </Col>

            <Col xs={12} className="mb-2">
              <strong className="d-block">Created by:</strong>
              <span className="d-block d-sm-inline ms-2">
                {authorUsername ?? "Unknown user"}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col>
          <Link to="/" className="btn btn-primary float-end">
            Back to the post list
          </Link>
        </Col>
      </Row>
      {/* Comment section */}
      <CommentSection postID={post.postID} />
    </article>
  );
}
