import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './routes/home';
import PostPage from './routes/post';
import AboutPage from './routes/about';
import FaqPage from './routes/faq';
import NotFoundPage from './routes/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'post/:slug', element: <PostPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
