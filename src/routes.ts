import type Route from './interfaces/Route.ts';
import { createElement } from 'react';

// page components
import CreatePostPage from './pages/CreatePostPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

import PostDetailsPage from './pages/PostDetailsPage.tsx';
import PostsPage from './pages/PostsPage.tsx';
import UserPage from './pages/UserPage.tsx';
import AccountRoute from './routes/AccountRoute.tsx';
import AdminPage from './pages/AdminPage.tsx'

export default [
  CreatePostPage,
  NotFoundPage,
  PostDetailsPage,
  PostsPage,
  UserPage,
  AccountRoute,
  AdminPage
]
  // map the route property of each page component to a Route
  .map(x => (({ element: createElement(x), ...x.route }) as Route))
  // sort by index (and if an item has no index, sort as index 0)
  .sort((a, b) => (a.index || 0) - (b.index || 0));