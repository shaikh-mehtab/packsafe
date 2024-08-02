const db = require("../../utils/db")

const Enquiry = async(req,res) =>{
    try {
        const enquiryContent = await db.execute(`SELECT enquiry_title, enquiry_btn_name, enquiry_status FROM web_content`);
        res.render("enquiry",enquiryContent)
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    Enquiry
}