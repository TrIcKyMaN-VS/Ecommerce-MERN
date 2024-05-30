const orderModel = require("../models/orderModel");
const productModel = require("../models/productModels");

exports.placeOrder = async (req, res, next) => {
    try {
        const cartItems = req.body.cartItems;


        // Validate that cartItems is an array
        if (!Array.isArray(cartItems)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid data format. Expected an array of cart items.",
            });
        }

        // Calculate the total amount
        const amount = cartItems.reduce((acc, item) => (
            acc + parseFloat(item.product.price) * item.qty
        ), 0).toFixed(2);

        const status = "pending";

        // Create the order
        const order = await orderModel.create({ cartItems, amount, status });
        res.json({
            status: "success",
            message: "Place order working!!!",
            order,
        });
        cartItems.forEach( async(item) => {
            const product = await productModel.findById(item.product._id);
            product.stock = product.stock - item.qty;
            await product.save();
        })
    } catch (error) {
        next(error);
    }
};
