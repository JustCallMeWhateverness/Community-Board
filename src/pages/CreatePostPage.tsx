import { Row, Col, Form, Button } from 'react-bootstrap';
import type Category from '../interfaces/Category';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import categoriesLoader from '../utils/categoriesLoader';


CreatePostPage.route = {
  path: '/create-post',
  menuLabel: 'Create Post',
  index: 2,
  loader: categoriesLoader
};

export default function CreatePostPage() {

  const { categories } = useLoaderData() as { categories: Category[] };

  const [post, setPost] = useState({
    title: '',
    overview: '',
    description: '',
    categoryID: 0
  });

  const navigate = useNavigate();

  function setProperty(event: React.ChangeEvent) {
    let { name, value } = event.target as HTMLInputElement;
    setPost({
      ...post,
      [name]: name === 'categoryID' ? Number(value) : value
    });
  }


  async function sendForm(event: React.FormEvent) {

    event.preventDefault();

    const payload: any = { ...post, date: Date.now(), slug: post.title.toLowerCase().replace(/\s+/g, '-') };

    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    // navigate to
    navigate('/');
  }

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
      <Form onSubmit={sendForm}>
        <Form.Group>
          <Form.Label className="d-block">
            <p>Title:</p>
            <Form.Control required
              onChange={setProperty}
              type="text" name="title" placeholder="Title" />
          </Form.Label>
          <Form.Label className="d-block">
            <p>Overview:</p>
            <Form.Control required
              onChange={setProperty}
              type="text" name="overview" placeholder="Overview" />
          </Form.Label>
          <Form.Label className="d-block">
            <p>Description:</p>
            <Form.Control required
              onChange={setProperty}
              type="text" name="description" placeholder="Description" />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <p>Category</p>
            <Form.Select required
              onChange={setProperty}
              name="categoryID" defaultValue="">
              <option value="" disabled >
                Select a category
              </option>
              {categories.map(({ id, name }) => <option
                key={id}
                value={id}
              >
                {name}
              </option>)}
            </Form.Select>
          </Form.Label></Form.Group>

        <Button type="submit" className="float-end">Create Post</Button>
      </Form>
    </Row>
  </>;
}