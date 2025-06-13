// criando um novo cliente
        const customer = await Customer.create({
                name: "supermercado Zazá",
                email: "SuperMercadoZazá@gmail.com.br"
        })


// consutando todos os clientes
        const customers = await Customer.findAll()
        console.log(customers)


// consutando um cliente especifico
        const customer = await Customer.findByPk(1) retorna um objeto com o cliente especifico com o id 1
        console.log(customer)


// consutando um cliente especifico
        const customer = await Customer.findOne({
                where: {name: "supermercado Zazá"}
        )
        console.log(customer)


// atualizando um cliente
        const customer = await Customer.findByPk(1)
        console.log(JSON.stringify(customer, null, 2));

        const newCustomer = await customer.update({
            status: "ARCHIVED",
        })
        console.log(JSON.stringify(newCustomer, null, 2));


//  consutando um cliente e retornar apenas os campos especificos
        const customers = await Customer.findAll({
                attributes: ["id", "name", "email"]
        });


// apagar um cliente
        const customer = await Customer.findByPk(1)
        await customer.destroy()