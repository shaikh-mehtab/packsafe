const db = require("../../utils/db")

const Header = async(req,res) =>{
    try {
        const headerContent = await db.execute(`SELECT header_logo FROM web_content`);

        res.render("header",headerContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    Header
}