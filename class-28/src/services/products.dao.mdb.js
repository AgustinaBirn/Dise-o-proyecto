export class ProductsService {
  constructor() {
  }

  async getProducts(limit, page, query, sort) {

    try {
     
      let filter = {};
      if (query) {
        filter.category = query;
      }
      
      const options = {
        page: page,
        limit: limit,
        sort: { price: sort }
      };
      
      const products = await productsModel.paginate({}, {filter, options, lean: true});
      console.log(products);
      
      return products
  } catch (err) {
      return err.message;
  };
  };

  async getProductById(id) {
    try {
    
    const productId = { _id : id};

    const productsDb = await productsModel.findOne(productId);

    return productsDb;

    } catch (err) {
      console.log("No se encontró el producto", err);
      return [];
    }
  }
  
  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.status ||
      !product.code ||
      !product.category ||
      !product.stock ) {
      console.log("Todos los campos son obligatorios.");
      }

      product.thumbnail ;
        
      try {
          const newProduct = await productsModel.findOne({code: product.code}) ? console.log("El código de producto ya existe.") : await productsModel.create(product);
          console.log(newProduct);
      } catch (err) {
        console.log("no se pudo agregar el producto", err);
      }
    }

  async updateProduct(filter, body, options) {
            
    try {
        const productsDb = await productsModel.findOneAndUpdate( filter, body, options );
        console.log(productsDb);
        console.log("Se actualizo el producto correctamente");
      } catch (err) {
        console.error("Error al actualizar el producto", err);
      }
  }

  async deleteProduct(id) {

      try {
        const process = await productsModel.findOneAndDelete(id);
        console.log("Se elimino correctamente el producto");
      } catch (err) {
        console.error("Error al eliminar el producto", err);
      }
  }
}