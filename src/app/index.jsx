import { useMemo } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes';
import getStore from 'store';

function App() {
  const store = useMemo(() => {
    return getStore();
  }, []);

  return (
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
