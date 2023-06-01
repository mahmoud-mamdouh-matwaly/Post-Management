import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Spin, Row } from 'antd';

const PostsPage = lazy(() => import('pages/posts'));
const PostDetailsPage = lazy(() => import('pages/posts/Details'));
const BaseLayOut = lazy(() => import('layout'));

export const router = createBrowserRouter([
  {
    path: 'posts-management',
    parent: true,
    element: (
      <Suspense
        fallback={
          <Row align={'middle'} justify="center">
            <Spin />
          </Row>
        }
      >
        <BaseLayOut />
      </Suspense>
    ),
    children: [
      {
        path: '/posts-management',
        element: (
          <Suspense
            fallback={
              <Row align={'middle'} justify="center">
                <Spin />
              </Row>
            }
          >
            <PostsPage />
          </Suspense>
        ),
      },
      {
        path: '/posts-management/post-details/:id',
        element: (
          <Suspense
            fallback={
              <Row align={'middle'} justify="center">
                <Spin />
              </Row>
            }
          >
            <PostDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
]);
