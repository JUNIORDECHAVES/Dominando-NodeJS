import User from '../models/user';

import * as Yup from "yup";
import { Op } from 'sequelize';
import { parseISO } from 'date-fns';

import WelcomeEmailJob from '../jobs/WelcomeEmailJob';
import DummyJob from '../jobs/DummyJob';
import Queue from "../../lib/Queue";


class UsersController {
    async index(req, res) {
        const {
            name,
            email,
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

        const data = await User.findAll({
            attributes: {
                exclude: ["password", "password_hash"],
            },
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        // console.log({userId: req.userId})

        return res.status(200).json(data);
    }

    async show(req, res) {
        const user = await User.findByPk(req.params.id, {
            attributes: {
                exclude: ["password", "password_hash"],
            },
        });


        const { id, name, email, file_id, createdAt, updatedAt } = user;
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ id, name, email, file_id, createdAt, updatedAt });
    }

    async create(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            passwordConfirmation: Yup.string().when("password", (password, field) =>
                password ? field.required().oneOf([Yup.ref("password")]) : field
            )
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validation schema." });
        }


        const userExists = await User.findOne({ where: { email: req.body.email } });

        if (userExists) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }
        const { id, name, email, fileId, createdAt, updatedAt } = await User.create(req.body);

        await Queue.add(WelcomeEmailJob.key, { name, email })

        return res.status(201).json({ id, name, email, fileId, createdAt, updatedAt });

    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            file_id: Yup.number(),
            oldPassword: Yup.string().min(8),
            password: Yup.string().min(8).when("oldPassword", (oldPassword, field) =>
                oldPassword ? field : field
            ),
            passwordConfirmation: Yup.string().when("password", (password, field) =>
                password ? field.oneOf([Yup.ref("password")]) : field
            )
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validation schema." });
        }


        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json();
        }

        const { oldPassword } = req.body;

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: "Password not match." });
        }

        const { id, name, email, file_id, createdAt, updatedAt } = await user.update(req.body);

        return res.status(201).json({ id, name, email, createdAt, updatedAt, file_id });
    }

    async destroy(req, res) {
        const user = await User.findByPk(req.params.id);

        user.destroy();

        return res.status(200).json();
    }
}

export default new UsersController();