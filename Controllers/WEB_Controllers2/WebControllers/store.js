const db = require("../../utils/db")

const Store = async(req,res) =>{
    try {
        const storeContent = await db.execute(`SELECT store_title, store, store_meta_title, store_meta_desc, store_status, store_name FROM web_content`);
        res.render("store",storeContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}


module.exports={
    Store
}