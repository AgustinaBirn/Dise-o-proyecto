import getToysService from "../services/toys.service.js";

const getToys = async () => {
    return await getToysService();
}

export default getToys;