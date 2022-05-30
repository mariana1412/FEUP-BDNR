const { purchases, clients, products } = require("../config");

async function getProducts(purchases_query) {
    
    for (let purchase in purchases_query) {
        for (let product in purchases_query[purchase].products) {
            const products_session = products.openSession()
            const product_query = await products_session.advanced.rawQuery(`from @all_docs where id == "${purchases_query[purchase].products[product]}"`).first()
            purchases_query[purchase].products[product] = product_query
        }
    }
}

async function getHistory(req, res){
    const { name, type } = req.query
    
    console.log("Recived getHistory request", req.query);
    
    if (type === 'client') {
        const clients_session = clients.openSession()
        const purchases_session = purchases.openSession()
        try {
            const client_query = await clients_session.advanced.rawQuery(`from "@all_docs" where name == "${name}" select id`).first()
            const client_id = client_query.id
            console.log(client_id)
            const purchases_query = await purchases_session.query(purchases).whereEquals('client', client_id).orderByDescending('date').all()
            console.log(purchases_query)

            await getProducts(purchases_query)

            return res.status(200).send(purchases_query)
        } catch (e) {
            console.log(e);
            return res.status(404).send("No such client")
        }
    } else if (type === 'admin') {
        const purchases_session = purchases.openSession()
        const purchases_query = await purchases_session.query(purchases).take(10).all()

        await getProducts(purchases_query)

        return res.status(200).send(purchases_query)
    }
}

module.exports = {
    getHistory,
};