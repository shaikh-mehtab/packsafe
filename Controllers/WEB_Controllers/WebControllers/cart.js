const db = require("../../utils/db")


const Cart  = async(req,res) =>{
    try {
        const cartContent = await db.execute(`SELECT cart_title, cart_meta_title, cart_meta_desc FROM web_content`);

        res.render("cart",cartContent);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    Cart
}