import { Row, Col } from 'react-bootstrap';
import Image from '../parts/Image';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';


LogInPage.route = {
  path: '/log-in',
  menuLabel: 'Log in',
  index: 3
};

export default function LogInPage() {


  return <>
    <Row>
      <Col>
        <h2 className="text-primary">Log in</h2>
      </Col>
    </Row>
    <form>
      <label>Username:
        <input type="text" />
      </label>
      <label>Password:
        <input type="text" />
      </label>
    </form>
    <Row>
      <Col md={6}>
        <p>If you don't already have an account, please sign up by clicking the button below</p>
      </Col>
      <Col md={6}>
      </Col>
    </Row>
  </>;
}