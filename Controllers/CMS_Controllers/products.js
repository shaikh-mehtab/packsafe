const connection = require("../../utils/db");
const clientIp = require("./clientIp");

const getallProducts = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from products where status>=0"
    );
    if (!data && data.length == 0) {
      return res.status(400).send({
        status: false,
        message: "No records founds",
      });
    }
    res.status(200).send({
      status: true,
      message: "All data found",
      totaldata: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const getByIdProducts = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or Provide an id",
      });
    }

    const data = await connection.query(
      `select * from products where id=${id} && status>=0`
    );
    if (!data[0][0]?.id) {
      res.status(400).send({
        status: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      status: true,
      message: "Single data found",
      totaldata: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const createProducts = async (req, res) => {
  try {
    const {
      name,
      slug,
      short_desc,
      long_desc,
      product_tag,
      meta_title,
      meta_desc,
      sort_order,
      status,
      data_image,
      model,
      sku,
      price,
      quantity,
      min_quantity,
      substract_stock,
      stock_status,
      required_shipping,
      dimension,
      length_class,
      weight_class,
      weight,
      manufacturer,
      brochure,
      category,
      related_product,
      attributes,
      filters,
      filter_options,
      images,
      video,
    } = req.body;

    const updated_by = "packsafe";
    const inserted_by = "packsafe";
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);

    const ip = clientIp.getIP(req);

    const data = await connection.query(
      "INSERT into products( name, slug, short_desc, long_desc, product_tag, meta_title, meta_desc,sort_order,status,data_image,model, sku, price, quantity,min_quantity, substract_stock, stock_status, required_shipping, dimension, length_class, weight_class, weight, manufacturer, brochure, category, related_product, attributes, inserted_by, updated_on, updated_by, ip, filters, filter_options, images, video) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        name,
        slug,
        short_desc,
        long_desc,
        product_tag,
        meta_title,
        meta_desc,
        sort_order,
        status,
        data_image,
        model,
        sku,
        price,
        quantity,
        min_quantity,
        substract_stock,
        stock_status,
        required_shipping,
        dimension,
        length_class,
        weight_class,
        weight,
        manufacturer,
        brochure,
        category,
        related_product,
        attributes,
        inserted_by,
        updated_on,
        updated_by,
        ip,
        filters,
        filter_options,
        images,
        video,
      ]
    );
    res.status(200).send({
      status: true,
      data: data[0],
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdProducts = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const updated_by = "packsafe";
    const inserted_by = "packsafe";
    const updated_on = new Date().toISOString().replace("T", " ").slice(0, 19);
    const ip = clientIp.getIP(req);

    const {
      name,
      slug,
      short_desc,
      long_desc,
      product_tag,
      meta_title,
      meta_desc,
      sort_order,
      status,
      data_image,
      model,
      sku,
      price,
      quantity,
      min_quantity,
      substract_stock,
      stock_status,
      required_shipping,
      dimension,
      length_class,
      weight_class,
      weight,
      manufacturer,
      brochure,
      category,
      related_product,
      attributes,
      filters,
      filter_options,
      images,
      video,
    } = req.body;

    const query = `
      UPDATE products SET 
      name=?,
      slug=?,
      short_desc=?,
      long_desc=?,
      product_tag=?,
      meta_title=?,
      meta_desc=?,
      sort_order=?,
      status=?,
      data_image=?,
      model=?,
      sku=?,
      price=?,
      quantity=?,
      min_quantity=?,
      substract_stock=?,
      stock_status=?,
      required_shipping=?,
      dimension=?,
      length_class=?,
      weight_class=?,
      weight=?,
      manufacturer=?,
      brochure=?,
      category=?,
      related_product=?,
      attributes=?,
      inserted_by=?,
      updated_on=?,
      updated_by=?,
      ip=?,
      filters=?,
      filter_options=?,
      images=?,
      video=?
      WHERE id=?
    `;

    const values = [
      name,
      slug,
      short_desc,
      long_desc,
      product_tag,
      meta_title,
      meta_desc,
      sort_order,
      status,
      data_image,
      model,
      sku,
      price,
      quantity,
      min_quantity,
      substract_stock,
      stock_status,
      required_shipping,
      dimension,
      length_class,
      weight_class,
      weight,
      manufacturer,
      brochure,
      category,
      related_product,
      attributes,
      inserted_by,
      updated_on,
      updated_by,
      ip,
      filters,
      filter_options,
      images,
      video,
      id,
    ];

    const data = await connection.query(query, values);

    if (data[0].changedRows) {
      return res.status(200).send({
        status: true,
        message: "Successfully Updated data",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).send({
        status: false,
        message: "Something went wrong",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const deleteByIdProducts = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "Invalid or provide an Id",
      });
    }

    const data = await connection.query(
      `UPDATE products SET status=-1 WHERE id=${id}`,
      [id]
    );

    if (data[0].affectedRows) {
      return res.status(200).send({
        status: true,
        message: "Deleted successfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).send({
        status: false,
        message: "Something Went Wrong",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const createImages = async (req, res) => {
  try {
    const imageData = req.body.map((item) => ({
      img: item.img[0], // Assuming 'img' is an array with a single URL
      title: item.title,
    }));

    const data = await connection.query(
      `INSERT INTO products (images) VALUES (?)`,
      [JSON.stringify(imageData)]
    );

    res.status(200).send({
      status: true,
      data: data[0],
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const updateImages = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }
    const images = req.body;

    const data = await connection.query(
      `UPDATE products SET images=? WHERE id=?`,
      [JSON.stringify(images), id]
    );

    res.status(201).send({
      status: true,
      data: data[0],
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

const updateByIdSortOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).send({
        status: false,
        message: "ID not found",
      });
    }

    const { sort_order } = req.body;

    const data = await connection.query(
      `UPDATE products SET sort_order=? WHERE id= ?`,
      [sort_order, id]
    );

    if (data[0].changedRows) {
      return res.status(200).send({
        status: true,
        message: "Successfully Updated Sort Order",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).send({
        status: false,
        message: "Something Went wrong",
      });
    } else {
      return res.status(400).send({
        status: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getallProducts,
  getByIdProducts,
  createProducts,
  createImages,
  updateByIdProducts,
  deleteByIdProducts,
  updateImages,
  updateByIdSortOrder,
};
