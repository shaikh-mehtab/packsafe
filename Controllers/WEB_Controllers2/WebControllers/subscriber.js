const db = require("../../utils/db")

const Subscriber = async(req,res)=>{
    try {
        const subscribeContent = await db.execute(`SELECT subscribe_title FROM web_content`);
        res.render("subscriber",subscribeContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports={
    Subscriber
}