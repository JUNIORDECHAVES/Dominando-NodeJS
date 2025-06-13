import { Op } from "sequelize";
import { parseISO } from "date-fns";
import * as Yup from "yup";

import Customer from "../models/customer";
import Contact from "../models/customer";

class CustomersController {

    // retorna listagem de customers
    async index(req, res) {
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = {};
        let order = [];

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.like]: name,
                },
            };
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.like]: email,
                },
            };
        }

        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase()),
                },
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdBefore),
                },
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdAfter),
                },
            };
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedBefore),
                },
            };
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedAfter),
                },
            };
        }

        if (sort) {
            order = sort.split(",").map(item => item.split(":"));
        }

        const data = await Customer.findAll({
            where,
            include: [
                {
                    model: Contact,
                    attributes: ["id", "status"],
                }
            ],
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.status(200).json(data);
    };

    // retorna um customer especifico
    async show(req, res) {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json();
        } 

        return res.status(200).json(customer);
    };

    // cria um customer
    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Error on validation schema."});
        }

        const customer = await Customer.create(req.body);
        return res.status(201).json(customer);
    };

    //atualiza dados de um customer espcifico
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Error on validation schema."});
        }

        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json();
        }

        await customer.update(req.body);
        
        return res.status(200).json(customer);
    };

    //deleta um customer epecifico
    async destroy(req, res) {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json();
        }

        await customer.destroy();

        return res.status(200).json();
    };

}

export default new CustomersController();