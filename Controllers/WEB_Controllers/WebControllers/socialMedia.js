const db = require("../../utils/db")

const SocialMedia  = async(req,res)=>{
    try {
        const socialMediaContent = await db.execute(`SELECT social_media_links, socialmedia_status FROM web_content`);
        res.render("socialmedia",socialMediaContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
        
    }
}

module.exports={
    SocialMedia
}

