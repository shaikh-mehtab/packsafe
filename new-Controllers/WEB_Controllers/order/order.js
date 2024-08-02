const db = require("../../../utils/db");
const clientIp = require("../../../utils/clientIp");
const Razorpay = require("razorpay");
const { fetch_main_menu, fetchCartData } = require("../utils/dbUtils");

exports.createOrder = async (req, res) => {
  try {
    var {
      addr_type,
      alt_phone,
      coupon_code,
      address,
      amount,
      city,
      email,
      ship_name,
      ship_address,
      ship_state,
      ship_city,
      ship_landmark,
      ship_pincode,
      ship_addr_type,
      ship_locality,
      ship_phone_no,
      ship_alt_phone,
      diffrent_ship_address,
      ship_email,
      landmark,
      locality,
      name,
      phone_no,
      pincode,
      state,
      user_id,
      savedAddress,
      shipSavedAddress,
    } = req.body;
    console.log(coupon_code);
    if (coupon_code) {
    const [coupon] = await db.query("select * from coupons where code=?",[coupon_code])
      if (coupon.length ==0) {
        throw new Error("Invalid Coupon")
      }
      const s_m = Number(amount) - Number(coupon[0].total_amount)
      const p_m = Number(amount)- Number(amount)/Number(coupon[0].discount)
      amount =  Math.round(s_m >p_m?p_m:s_m)
      console.log(amount,s_m,p_m);
    }
    if (!savedAddress) {
      if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error("Invalid amount");
      }
      if (!name || typeof name !== "string") {
        throw new Error("Invalid name");
      }
      if (!address || typeof address !== "string") {
        throw new Error("Invalid address");
      }
      if (!city || typeof city !== "string") {
        throw new Error("Invalid city");
      }
      if (!state || typeof state !== "string") {
        throw new Error("Invalid state");
      }
      if (!landmark || typeof landmark !== "string") {
        throw new Error("Invalid landmark");
      }
      if (!phone_no || !/^\d{10}$/.test(phone_no)) {
        throw new Error("Invalid phone number");
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email");
      }
      if (diffrent_ship_address) {
        if (!ship_name || typeof ship_name !== "string") {
          throw new Error("Invalid shipping name");
        }
        if (!ship_address || typeof ship_address !== "string") {
          throw new Error("Invalid shipping address");
        }
        if (!ship_state || typeof ship_state !== "string") {
          throw new Error("Invalid shipping state");
        }
        if (!ship_city || typeof ship_city !== "string") {
          throw new Error("Invalid shipping city");
        }
        if (!ship_landmark || typeof ship_landmark !== "string") {
          throw new Error("Invalid shipping landmark");
        }
        if (!ship_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ship_email)) {
          throw new Error("Invalid email");
        }
        if (!ship_phone_no || !/^\d{10}$/.test(ship_phone_no)) {
          throw new Error("Invalid shipping phone number");
        }
      }
    }

    const ip = clientIp.getIP(req);
    var address_id = null;
    var ship_address_id = null;
    let order_id = null;

    const cart = req.session.cart;
    // invertory checkkk
    for (const product of cart.products) {
      const data = await db.query(
        "select substract_stock, quantity as stock_quantity from products where id = ? ",
        [product.id]
      );
      if (
        data[0][0].substract_stock == 1 &&
        data[0][0].stock_quantity < product.quantity
      ) {
        throw new Error("Insufficient stock");
      }
    }

    if (!user_id) {
      if (diffrent_ship_address) {
        const newOrder = await db.execute(
          "insert into orders (user_id,payment_options,payment_status,status,ip,amount,name,address,city,state,landmark,phone_no,email,ship_name,ship_address,ship_state,ship_city,ship_email,ship_landmark,ship_phone_no,pincode,ship_pincode) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            0,
            0,
            0,
            0,
            ip,
            Number(amount),
            name,
            address,
            city,
            state,
            landmark,
            phone_no,
            email,
            ship_name,
            ship_address,
            ship_state,
            ship_city,
            ship_email,
            ship_landmark,
            ship_phone_no,
            pincode,
            ship_pincode,
          ]
        );
        order_id = newOrder[0].insertId;
      } else {
        const newOrder = await db.execute(
          "insert into orders (user_id,payment_options,payment_status,status,ip,amount,name,address,city,state,landmark,phone_no,email,ship_name,ship_address,ship_state,ship_city,ship_email,ship_landmark,ship_phone_no,pincode,ship_pincode) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            0,
            0,
            0,
            0,
            ip,
            Number(amount),
            name,
            address,
            city,
            state,
            landmark,
            phone_no,
            email,
            name,
            address,
            state,
            city,
            email,
            landmark,
            phone_no,
            pincode,
            pincode,
          ]
        );
        order_id = newOrder[0].insertId;
      }
    } else {
      if (!savedAddress) {
        const newAddress = await db.execute(
          "insert into addresses (addr_type,address,alt_phone,city,email,landmark,locality,name,phone_no,pincode,state,user_id,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            addr_type,
            address,
            alt_phone,
            city,
            email,
            landmark,
            locality,
            name,
            phone_no,
            pincode,
            state,
            user_id,
            1,
          ]
        );
        address_id = newAddress[0].insertId;
        if (diffrent_ship_address) {
          const newShipAddress = await db.execute(
            "insert into addresses (addr_type,address,alt_phone,city,email,landmark,locality,name,phone_no,pincode,state,user_id,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              ship_addr_type,
              ship_address,
              ship_alt_phone,
              ship_city,
              ship_email,
              ship_landmark,
              ship_locality,
              ship_name,
              ship_phone_no,
              ship_pincode,
              ship_state,
              user_id,
              1,
            ]
          );
          ship_address_id = newShipAddress[0].insertId;
        } else ship_address_id = newAddress[0].insertId;
      } else {
        address_id = savedAddress;
        ship_address_id = shipSavedAddress || savedAddress;
      }
      const newOrder = await db.execute(
        "insert into orders (user_id,payment_options,payment_status,ip,amount,address_id,ship_address_id) values(?,?,?,?,?,?,?)",
        [user_id, 0, 0, ip, amount, address_id, ship_address_id]
      );
      order_id = newOrder[0].insertId;
    }

    const [razorpay_credentials] = await db.execute(
      "select razorpay_id,razorpay_secret_key from setting"
    );

    var razorpay = new Razorpay({
      key_id: razorpay_credentials[0].razorpay_id,
      key_secret: razorpay_credentials[0].razorpay_secret_key,
    });

    const rzp_options = {
      amount: amount * 100 ,
      receipt: Date.now() + "packsafe" + order_id,
    };

    console.log(rzp_options);

    const razorpayOrder = await razorpay.orders.create(rzp_options);

    //insert ordered products into table
    for (let x = 0; x < cart.products.length; x++) {
      const qwert = await db.query(
        "insert into ordered_products (product_id,order_id,price,quantity) values(?,?,?,?)",
        [
          cart.products[x].id,
          order_id,
          cart.products[x].spl_price,
          cart.products[x].quantity,
        ]
      );
    }

    // await db.query("update orders set razorpay_id =?", [razorpayOrder.id]);
    // const cart = req.session.cart;
    // for (let x = 0; x < cart.products.length; x++) {
    //   const qwert = await db.query(
    //     "insert into ordered_products (product_id,order_id,price,quantity) values(?,?,?,?)",
    //     [
    //       cart.products[x].id,
    //       order_id,
    //       cart.products[x].price,
    //       cart.products[x].quantity,
    //     ]
    //   );
    //   console.log({ msg: "insert or not", qwert });
    // }
    // // cart filter
    // await db.query("DELETE from cart WHERE user_id =?", [user_id]);
    // req.session.cart = {
    //   totalAmount: 0,
    //   totalCount: 0,
    //   products: [],
    // };
    res.json({
      status: "success",
      order_id: order_id,
      coupon_code:coupon_code,
      razorpayOrder,
      razorpay_credentials: razorpay_credentials[0],
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { order_id,coupon_code, paymentId, payment_status } = req.body;

    if (payment_status !== "failed") {
      //update stock inventory
      const cart = req.session.cart;
      for (let q = 0; q < cart.products.length; q++) {
        try {
          const { id, quantity } = cart.products[q];
          await db.execute(
            "Update products set quantity = quantity - ? where id=?",
            [quantity, id]
          );
        } catch (error) {
          throw new Error(error);
        }
      }
      const user_id = req.session.user ? req.session.user.id : null;

      //update coupon
      await db.execute("update coupons set remaining_uses= remaining_uses-1 where code =?",[coupon_code])
      const [update_coupon] =await db.execute("select * from coupons where code=?",[coupon_code])

      //insert in used_coupons
      if (user_id) {
        console.log(user_id);
      const [insert_cdata] = await db.execute("insert into coupons_used (coupon_id,user_id,order_id) values(?,?,?)",[update_coupon[0].id,user_id,order_id])
      }else{
        console.log(user_id);
        const [insert_cdata] = await db.execute("insert into coupons_used (coupon_id,user_id,order_id) values(?,?,?)",[update_coupon[0].id,0,order_id])
      }

      //filter cart items
      if (user_id) {
        await db.query("DELETE from cart WHERE user_id =?", [user_id]);
        req.session.cart = {
          totalAmount: 0,
          totalCount: 0,
          products: [],
        };
      } else {
        req.session.cart = {
          totalAmount: 0,
          totalCount: 0,
          products: [],
        };
      }
    }

    // Update order status in the database
    const updatedOrder = await db.query(
      "UPDATE orders SET payment_status = ?,status=?, razorpay_id = ? WHERE id = ?",
      [
        payment_status === "failed" ? -1 : 1,
        payment_status === "failed" ? -1 : 1,
        paymentId,
        order_id,
      ]
    );

    res.json({ status: "success", order_id: order_id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.query("select * from orders where id =?", [id]);
    const ordered_products = await db.query(
      "select p.*,op.quantity as quantity, op.price as price, op.coupon from ordered_products op join products p on op.product_id = p.id where order_id =?",
      [id]
    );

    const order_data = { ...data[0][0], prodcuts: ordered_products[0] };
    res.json({ status: "success", order_data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.ordersController = async (req, res) => {
  try {
    const user_id = req.session.user ? req.session.user.id : null;
    if (!user_id) {
      throw new Error("login required");
    }
    const [orders] = await db.execute(
      "select o.*, o.id as order_id,o.status as order_status ,a.* from orders o join addresses a on o.ship_address_id=a.id where o.user_id =?",
      [user_id]
    );
    const globalContent = {
      page_title: "Orders",
      page_meta_title: "Packsafe user orders list",
      page_meta_desc: "Packsafe user orders list",
    };
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    const main_menu = await fetch_main_menu();
    const cart = await fetchCartData(req);
    const user = req.session.user || {};
    res.render("orders", {
      globalContent,
      main_menu,
      cart,
      store_setting: store_setting[0],
      user,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};

exports.orderDetailsController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await db.query("select * from orders where id =?", [id]);
    if (data[0][0].address_id) {
      const address = await db.query("select * from addresses where id =?", [
        data[0][0].address_id,
      ]);
      data[0][0] = {
        ...data[0][0],
        name: address[0][0].name,
        phone_no: address[0][0].phone_no,
        locality: address[0][0].locality,
        address: address[0][0].address,
        city: address[0][0].city,
        state: address[0][0].state,
        pincode: address[0][0].pincode,
        landmark: address[0][0].landmark,
        alt_phone: address[0][0].alt_phone,
        addr_type: address[0][0].addr_type,
        pincode: address[0][0].pincode,
      };
      if (data[0][0].ship_address_id) {
        const address = await db.query("select * from addresses where id =?", [
          data[0][0].ship_address_id,
        ]);
        data[0][0] = {
          ...data[0][0],
          ship_name: address[0][0].name,
          ship_phone_no: address[0][0].phone_no,
          ship_locality: address[0][0].locality,
          ship_address: address[0][0].address,
          ship_city: address[0][0].city,
          ship_state: address[0][0].state,
          ship_pincode: address[0][0].pincode,
          ship_landmark: address[0][0].landmark,
          ship_alt_phone: address[0][0].alt_phone,
          ship_addr_type: address[0][0].addr_type,
          ship_pincode: address[0][0].pincode,
        };
      }
    }
    const ordered_products = await db.query(
      "select p.*,op.quantity as quantity, op.price as price, op.coupon from ordered_products op join products p on op.product_id = p.id where order_id =?",
      [id]
    );
    const globalContent = {
      page_title: "Order Details",
      page_meta_title: "Packsafe order details",
      page_meta_desc: "Packsafe order details",
    };
    const main_menu = await fetch_main_menu();
    const cart = await fetchCartData(req);
    const user = req.session.user || {};
    const [store_setting] = await db.execute(
      "select s.logo,s.dark_logo,s.favicon,sl.* from setting s join store_location sl "
    );

    const order_data = { ...data[0][0], products: ordered_products[0] };
    res.render("orderDetails", {
      order_data,

      store_setting: store_setting[0],
      globalContent,
      main_menu,
      cart,
      user,
    });
  } catch (error) {
    console.error(error);
    res.render("500");
  }
};

exports.verifyCoupon = async (req, res) => {
  try {
    const { user_id,amount, code } = req.body
    const [coupon] = await db.execute("select * from coupons where code = ?", [code])
    if (coupon.length > 0 && amount) {
      const todayDate = new Date()
      const startDate = new Date(coupon[0].start_date)
      const endDate = new Date(coupon[0].end_date)
      const [used_status] = await db.execute("select * from coupons_used where user_id=? and coupon_id=?", [user_id, coupon[0].id])
      if (used_status.length > 0) {
        throw new Error("Coupon Already Used")
      } else if (!(todayDate >= startDate && todayDate <= endDate && coupon[0].status == 1)) {
        throw new Error("Coupon Expired")
      }
      res.json({
        status: true,
        data: coupon[0]
      })
    } else {
      throw new Error("Invalid Coupon Code")
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
}