import { useLoaderData } from 'react-router-dom';
import { Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useStateContext } from '../utils/useStateObject';
import { getHelpers } from '../utils/postPageHelpers';
import Select from '../parts/Select';
import PostCard from '../parts/PostCard';
import postsAndCategoryLoader from '../utils/postsAndCategoryLoader.tsx';



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
    { categoryChoice, sortChoice },
    setState
  ] = useStateContext();

  // get the chosen category without the product count part
  const categoryValue = categoryChoice;
  // get the key and order to from the chosen sort option
  const foundSort = sortOptions.find(x => x.description === sortChoice)
    || sortOptions[0]; // fallback to first option

  const { key: sortKey, order: sortOrder } = foundSort;
  const [showDate, setShowDate] = useState(false);


  return <>
    <Row>
      <Col>
        <h2 className="text-primary text-center">Community Board</h2>
        <p>
          Welcome to our Community Board! Here, you can explore a variety of posts and updates from members of our community.
          Whether you're looking to share your own news, find local events, or connect with others, you've come to the right place.
          Browse through the posts below and stay informed about what's happening around you.
        </p>
      </Col>
    </Row>
    <Row>
      <Col className="px-4 pt-1 pb-4">
        <Row className=" pt-3 bg-secondary-subtle">
          <Col md="5" >
            <Select
              label="Category"
              value={categoryChoice}
              changeHandler={(x: string) => setState('categoryChoice', x)}
              options={categories}
            />
          </Col>
          <Col md="5">
            <Select
              label="Sort by"
              value={sortChoice}
              changeHandler={(x: string) => setState('sortChoice', x)}
              options={sortDescriptions.map(desc => ({ label: desc, value: desc }))}
            />
          </Col>
          <Col md="2" className="align-items-end d-flex">
            <Form.Check
              type="checkbox"
              label="Show Date"
              checked={showDate}
              onChange={(e) => setShowDate(e.target.checked)}
            />
          </Col>
        </Row>
      </Col >
    </Row >
    <Row className="mt-1 mb-3 board">
      {posts
        // filter by the chosen category
        .filter(x => categoryValue === 'All' || String(x.categoryID) === categoryValue)
        // sort by the chosen choice for sorting
        .sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * sortOrder)
        // map to product cards
        .map(post => <Col xs={12} md={6} lg={4} key={post.id}>
          <PostCard {...post} showDate={showDate} />
        </Col>)
      }
    </Row>

  </>;
};
