import { lazy, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import BaseLayOut from 'layout';
import { Spin } from 'antd';
import { Provider as StoreProvider } from 'react-redux';
import getStore from 'store';

const PostsPage = lazy(() => import('pages/posts'));

function App() {
  const store = useMemo(() => {
    return getStore();
  }, []);
  return (
    <StoreProvider store={store}>
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
    </StoreProvider>
  );
}

export default App;
