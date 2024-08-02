const db = require("../../utils/db")


const Contact = async(req,res) =>{
    try {
        const contactContent = await db.execute(`SELECT contact_details, contact_cover_title, contact_breadcrumb_title, contact_title, contact_desc, contact_cover_image, contact_meta_title, contact_meta_desc FROM web_content`);
        res.render("contact",contactContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
        
    }
}

module.exports ={
    Contact
}