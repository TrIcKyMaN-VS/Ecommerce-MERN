const productModel = require("../models/productModels")

exports.getProducts = async(req, res, next) => {

    const query = req.query.keyword?{
        name : {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }:{}

     const products = await productModel.find(query)
    res.json({
        status : "success",
        Msg : "get PROD working !!!",
        products,
    })
}

exports.getSingleProduct = async(req, res, next) => {

    

    try {
        const singleProduct = await productModel.findById(req.params.id);

        res.json({
            status : "success",
            Msg : "get single prod working !!!",
            singleProduct,
        })

    } catch (error) {
        res.status(404).json({
        status : "Failed",
        Msg : "Failed to fetch the product with the " + req.params.id,
    })
    }

    

}