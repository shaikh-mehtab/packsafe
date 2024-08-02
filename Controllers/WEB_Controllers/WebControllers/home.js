const db = require("../../utils/db")

const Home = async(req,res) =>{
    try {
        const homeContent = await db.execute(`SELECT home_title, home_slider, home_grid1, home_grid_image, home_meta_title FROM web_content`);

        const productsContent = await db.execute(`SELECT products_title, products_meta_title, products_meta_desc FROM web_content`);

        const combinedContent ={
            home:homeContent,
            products:productsContent
        }

        res.render("index",combinedContent)

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports ={
    Home
}