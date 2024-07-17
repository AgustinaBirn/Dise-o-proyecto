import userModel from "../models/user.model.js";
// import { ProductManager } from "./manager.mdb.js";


// const manager = new ProductManager();

export class UsersService {
  constructor() {
  }

  async getUsers() {

    try {

        let data = await userModel.find().lean();
        this.users = data;
        // return limit === 0 ? this.carts : this.carts.slice(0, limit);
        } 
        
        catch (err) {
          console.log("Error al obtener los usuarios", err);
          return [];
        }
  }

  async getUserById(id) {

    try {
        const userId = { _id : id};
        // const cartsDb = await cartsModel.findOne(cartId).lean();
        const userDb = await userModel.findOne(userId).populate({path: "user._id", model: userModel}).lean();

          return userDb;

        } catch (err) {
          console.log("No se encontró el usuario", err);
          return [];
        }
  }


  async findUserByEmail(email) {
    try {
      const user = await userModel.findOne({ email }).lean();
      return user;
    } catch (err) {
      console.log('No se encontró el usuario', err);
      return null;
    }
  }

  async addUser(user) {

    try {
        const newUser = await userModel.create(user);
        console.log(newUser);
    } catch (err) {
        console.log("no se pudo agregar el usuario", err);
    }
  }

  update = async (filter, update, options) => {
    try {
        return await userModel.findOneAndUpdate(filter, update, options);
    } catch (err) {
        return err.message;
    };
};
}