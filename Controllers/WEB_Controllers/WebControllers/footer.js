const db = require("../../utils/db")

const Footer = async(req,res) =>{
    try {
        const footerContent = await db.execute(`SELECT footer_logo FROM web_content`);
        res.render("footer",footerContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    Footer
}