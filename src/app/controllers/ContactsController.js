import { Op } from "sequelize";
import { parseISO } from "date-fns";
import * as Yup from "yup";

import Customer from "../models/customer";
import Contact from "../models/contact";

class ContactsController {

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

        let where = { customer_id: req.params.customerId };
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

        const data = await Contact.findAll({
            where,
            include: [
                {
                    model: Customer,
                    attributes: ["id", "status"],
            required: true,
                }
            ],
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.status(200).json(data);
    };

    async show(req, res) {

        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id
            },
            attributes: {
                exclude: ["customer_id", "customerId"]
            }
        })

        // const contact = await Contact.findByPk(req.params.id, {
        //     include: [Customer]
        // });

        if (!contact) {
            return res.status(404).json();
        }

        return res.status(200).json(contact);
    };

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            status: Yup.string().uppercase(),
        });

        console.log(req.body);

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: 'Validation failed', messages: err.errors });
        }
        const contact = await Contact.create({
            customer_id: req.params.customerId,
            ...req.body,
        });

        return res.status(201).json(contact);
    };

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: "Error on validation schema."});
        }

        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id
                
            },
            attributes: {
                exclude: ["customer_id", "customerId"]
            }
        });

        if (!contact) {
            return res.status(404).json();
        }

        await contact.update(req.body);
        
        return res.status(200).json(contact);
    };

    async destroy(req, res) {
        const contact = await Contact.findOne({
            where: {
                customer_id: req.params.customerId,
                id: req.params.id
                
            }
        });

        if (!contact) {
            return res.status(404).json();
        }

        await contact.destroy();

        return res.status(200).json();
    };


}



export default new ContactsController();