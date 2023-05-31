import { lazy, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import BaseLayOut from 'layout';
import { Spin } from 'antd';
import getStore from 'store';
import { Provider as StoreProvider } from 'react-redux';

const PostsPage = lazy(() => import('pages/posts'));
const EditPostPage = lazy(() => import('pages/posts/edit'));

function App() {
  const store = useMemo(() => {
    return getStore();
  }, []);

  return (
    <StoreProvider store={store}>
      <Routes>
        <Route path="/posts-management" element={<BaseLayOut />}>
          <Route
            path="/posts-management"
            element={
              <Suspense fallback={<Spin />}>
                <PostsPage />
              </Suspense>
            }
          />
          <Route
            path="/posts-management/edit-post/:id"
            element={
              <Suspense fallback={<Spin />}>
                <EditPostPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </StoreProvider>
  );
}

export default App;
