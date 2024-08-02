const db = require("../../utils/db")

const  Checkout = async(req,res)=>{
    try {
        const checkoutContent = await db.execute(`SELECT checkout_title, checkout_meta_title, checkout_meta_desc FROM web_content`);
        res.render("checkout",checkoutContent);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    Checkout
}