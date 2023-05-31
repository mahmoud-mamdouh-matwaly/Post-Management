import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import BaseLayOut from 'layout';
import { Spin } from 'antd';
const PostsPage = lazy(() => import('pages/posts'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayOut />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Spin />}>
              <PostsPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
