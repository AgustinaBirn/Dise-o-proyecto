import {TicketsService} from '../services/tickets.dao.mdb.js';

const service = new TicketsService();

export class TicketsManager {
    constructor() {
    }
    
    getTickets = async (limit) => {
        try {
            return await service.getTickets(limit);
        } catch (err) {
            return err.message;
        };
    };

    getTicketById = async (filter) => {
        try {
            return await service.getTicketById(filter);
        } catch (err) {
            return err.message;
        };
    };

    addTicket = async (ticket) => {
        try {
            return await service.addTicket(ticket);
        } catch (err) {
            return err.message;
        };
    };

    updateTicket = async (tid, cid, pid, quantity) => {
        try {
            return await service.updateTicket(tid, cid, pid, quantity);
        } catch (err) {
            return err.message;
        };
    };

    deleteTicket = async (filter) => {
        try {
            return await service.deleteTicket(filter);
        } catch (err) {
            return err.message;
        };
    };

    // addProductsToCart = async (cid, pid) => {
    //     try {
    //         return await service.addProductsToCart(cid, pid);
    //     } catch (err) {
    //         return err.message;
    //     };
    // };

    // removeProductToCart = async (cid, pid) => {
    //     try {
    //         return await service.removeProductToCart(cid, pid);
    //     } catch (err) {
    //         return err.message;
    //     };
    // };

    // removeAllProductsFromCart = async (cid) => {
    //     try {
    //         return await service.removeAllProductsFromCart(cid);
    //     } catch (err) {
    //         return err.message;
    //     };
    // };

}