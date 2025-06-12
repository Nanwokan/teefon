const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getproductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const createShippingAddress = require("../controller/user/createShippingAddress");
const createOrder = require("../controller/user/createOrder");
const getUserOrders = require("../controller/user/getUserOrders");
const getOrderItems = require("../controller/user/getOrderItems");
const getAllOrders = require("../controller/user/getAllOrders");
const updateOrderStatus = require("../controller/user/updateOrderStatus");
const getPaymentMethods = require("../controller/payment/getPaymentMethods");



router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details", authToken ,userDetailsController)
router.get("/userLogout",userLogout)


//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


router.post("/shipping-address", authToken, createShippingAddress);

router.post("/create-order", authToken, createOrder);
router.get("/my-orders", authToken, getUserOrders);
router.get("/order-items/:order_id", authToken, getOrderItems);
router.get("/admin/all-orders", authToken, getAllOrders);
router.put("/admin/update-order-status", authToken, updateOrderStatus);


router.get("/payment-methods", getPaymentMethods);





module.exports = router 