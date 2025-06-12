const backendDomin = process.env.REACT_APP_BACKEND_URL;

const SummaryApi = {
  SignUP: {
    url: `${backendDomin}/api/signup`,
    method: 'post',
  },

  signIn: {
    url: `${backendDomin}/api/signin`,
    method: 'post',
  },

  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: 'get',
  },

  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: 'get',
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: 'get',
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: 'post',
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: 'post',
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: 'get',
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: 'post',
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: 'get',
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: 'post',
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: 'post',
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: 'post',
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: 'get',
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: 'get',
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: 'post',
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: 'post',
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: 'get',
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: 'post',
  },
  // === APIs de gestion de commandes ===

  adminAllOrders: {
    url: `${backendDomin}/api/admin/all-orders`,
    method: 'get',
  },

  orderItemsByOrderId: {
    url: `${backendDomin}/api/order-items`, // on ajoutera l'ID dynamiquement
    method: 'get',
  },

  updateOrderStatus: {
    url: `${backendDomin}/api/admin/update-order-status`,
    method: 'put',
  },

  createOrder: {
    url: `${backendDomin}/api/create-order`,
    method: 'post',
  },

  shippingAddress: {
    url: `${backendDomin}/api/shipping-address`,
    method: 'post',
  },

  myOrders: {
    url: `${backendDomin}/api/my-orders`,
    method: 'get',
  },

  paymentMethods: {
    url: `${backendDomin}/api/payment-methods`,
    method: 'get',
  },
};

export default SummaryApi;
