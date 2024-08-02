const db = require("../../utils/db")

const Products = async(req,res) =>{
    try {
        const productsContent = await db.execute(`SELECT products_title, products_meta_title, products_meta_desc FROM web_content`);
        res.render("product",productsContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    Products
}