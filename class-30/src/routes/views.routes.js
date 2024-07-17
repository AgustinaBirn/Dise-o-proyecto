import { Router } from "express";
import fs from "fs";

import messagesModel from "../models/messages.model.js";
import productsModel from "../models/products.model.js";
import { ProductsManager } from "../controllers/products.manager.js";
import { CartsManager } from "../controllers/cart.manager.js";
import cartsModel from "../models/carts.model.js"
import { verifyToken, handlePolicies} from "../services/utils.js";



const router = Router();
const productManager = new ProductsManager();
const cartManager = new CartsManager();

router.get("/products", async (req, res) => {
  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;
  const query = req.query.query;
  const sort = +req.query.sort || 1;

  let products;
  if(query){
    products = await productsModel.paginate({category: query}, {page: page, limit: limit, sort: {price : sort}, lean: true});
  } else {
    products = await productsModel.paginate({}, {page: page, limit: limit, sort: {price : sort}, lean: true});
  }

  products = products.docs

  const user = req.session.user? { firstName : req.session.user.firstName,
     lastName  : req.session.user.lastName, role: req.session.user.role} : "no existe usuario";
  

  // const products = await productManager.getProducts(limit, page, query, sort);
  console.log("PRODUCTS :", products.docs);
  console.log(user);
  res.render("home", {products, user: user});
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);
  
  res.render("cartId", {data : cart});
});

router.get("/welcome", async (req, res) => {
  const user = { name: "Agustina" };

  res.render("index", user);
});

router.get("/realtimeproducts", async (req, res) => {

  const limit = +req.query.limit || 10;

  const page = +req.query.page || 1;

  const query = req.query.query;

  const sort = +req.query.sort || 1;

  const products = await productManager.getProducts(limit, page, query, sort);

  res.render("realTimeProducts", { ...products,docs:products.docs.map(ed=>{return({title:ed.title,price:ed.price,thumbnail:ed.thumbnail,description:ed.description,id:ed._id+""})}) });;

});

router.get("/chat", verifyToken, handlePolicies(["USER"]), async (req, res) => {
  const messagesDb = await messagesModel.find().lean();
  res.render("chat", {data : messagesDb});
});

router.get("/register", (req, res) => {
  res.render("register", {})
});

router.get("/login", (req, res) => {
  if(req.session.user) return res.redirect("/profile");
  res.render("login", {});
});

router.get("/profile", (req, res) => {
  console.log("pasa por profile", req.session.user);
  if(!req.session.user) return res.redirect("/pplogin");
  res.render("profile", {user: req.session.user});
});

export default router;
