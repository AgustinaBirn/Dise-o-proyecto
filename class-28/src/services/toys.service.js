import toyModel from "../dao/models/toy.model.js";

const getToysService = async () => {
    return await toyModel.find().lean();
};

export default getToysService;