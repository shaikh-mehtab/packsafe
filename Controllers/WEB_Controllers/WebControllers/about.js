const db = require("../../utils/db")

const About = async(req,res)=>{
    try {
        const aboutContent = await db.execute(`SELECT about_title, about_name, about_short_desc, about_long_desc, about_meta_title, about_page_img, about_meta_desc FROM web_content`);

        res.render("about",aboutContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    About
}