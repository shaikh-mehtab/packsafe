const db = require("../../utils/db")


const Career = async(req,res) =>{
    try {
        const careerContent = await db.execute(`SELECT career_title, career_meta_title, career_meta_desc, career_status FROM web_content`);

        res.render("career",careerContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    Career
}