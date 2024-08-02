const db = require("../../utils/db")

const Payment = async(req,res) =>{
    try {
        const paymentOptionContent = await db.execute(`SELECT pay_option FROM web_content`);
        res.render("payment",paymentOptionContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    Payment
}