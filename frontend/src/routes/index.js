import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import OnOrder from '../pages/OnOrder';
import AllOrders from '../pages/AllOrders';
import Checkout from '../pages/Checkout';
import OrderSuccess from '../pages/OrderSuccess';
import MyOrders from '../pages/MyOrders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'product-category',
        element: <CategoryProduct />,
      },
      {
        path: 'product/:id',
        element: <ProductDetails />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'search',
        element: <SearchProduct />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
      {
        path: 'on-order',
        element: <OnOrder />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: '/order-success',
        element: <OrderSuccess />,
      },
      {
        path: '/my-orders',
        element: <MyOrders />,
      },
      {
        path: 'admin-panel',
        element: <AdminPanel />,
        children: [
          {
            path: 'all-users',
            element: <AllUsers />,
          },
          {
            path: 'all-products',
            element: <AllProducts />,
          },
          {
            path: 'all-orders',
            element: <AllOrders />,
          },
        ],
      },
    ],
  },
]);

export default router;
