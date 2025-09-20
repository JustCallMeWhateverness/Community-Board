import type { SortOption } from '../utils/postPageHelpers';
import { useLoaderData } from 'react-router-dom';
import { Row, Col, Form } from 'react-bootstrap';
import { useStateContext } from '../utils/useStateObject';
import Select from '../parts/Select';
import PostCard from '../parts/PostCard';
import postsAndCategoryLoader from '../utils/postsAndCategoryLoader.tsx';
import { getHelpers } from '../utils/postPageHelpers';
import Image from '../parts/Image';

PostsPage.route = {
  path: '/',
  menuLabel: 'Posts',
  index: 1,
  parent: '/',
  loader: postsAndCategoryLoader
};

export default function PostsPage() {

  let {
    posts,
    categories,
    sortOptions,
    sortDescriptions
  } = getHelpers(useLoaderData().posts, useLoaderData().categories);

  // get state object and setter from the outlet context
  const [
    { categoryChoice, sortChoice, bwImages },
    setState
  ] = useStateContext();

  // get the chosen category without the product count part
  const categoryValue = categoryChoice;
  // get the key and order to from the chosen sort option
  const foundSort = sortOptions.find(x => x.description === sortChoice)
    || sortOptions[0]; // fallback to first option

  const { key: sortKey, order: sortOrder } = foundSort;


  return <>
    <Row>
      <Col>
        <h2 className="text-primary">Community Board</h2>
        <p>
          Welcome to our Community Board! Here, you can explore a variety of posts and updates from members of our community.
          Whether you're looking to share your own news, find local events, or connect with others, you've come to the right place.
          Browse through the posts below and stay informed about what's happening around you.
        </p>
      </Col>
    </Row>
    <Row>
      <Col className="px-4 pt-1 pb-4">
        <Row className="bg-primary-subtle pt-3 rounded">
          <Col md="4">
            <label className="d-block">
              <div className="d-none d-md-block">
                Color images:
              </div>
              <div
                className={'form-switch-text position-absolute' +
                  ' d-md-none px-5' + (bwImages ? '' : ' text-white')}
              >
                B/W Images
                <span className="float-end">Color Images</span>
              </div>
              <Form.Switch
                className="mt-2 mb-4 mb-md-2"
                defaultChecked={!bwImages}
                onChange={e => setState('bwImages', !e.target.checked)}
              />
            </label>
          </Col>
          <Col md="4">
            <Select
              label="Category"
              value={categoryChoice}
              changeHandler={(x: string) => setState('categoryChoice', x)}
              options={categories}
            />
          </Col>
          <Col md="4">
            <Select
              label="Sort by"
              value={sortChoice}
              changeHandler={(x: string) => setState('sortChoice', x)}
              options={sortDescriptions.map(desc => ({ label: desc, value: desc }))}
            />
          </Col>
        </Row>
      </Col >
    </Row >
    <Row className="mt-1 mb-n3">
      {posts
        // filter by the chosen category
        .filter(x => categoryValue === 'All' || String(x.categoryID) === categoryValue)
        // sort by the chosen choice for sorting
        .sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * sortOrder)
        // map to product cards
        .map(post => <Col xs={12} lg={6} key={post.id}>
          <PostCard {...post} />
        </Col>)
      }
    </Row>

  </>;
};
