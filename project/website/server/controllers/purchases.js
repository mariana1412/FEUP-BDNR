const { store } = require("../config");

async function getHistory(req, res){
    const { username, type, page, perPage } = req.query
    
    console.log("Recived getHistory request", req.query);
    
    if (type === 'client') {
        const session = store.openSession()

        try {
            const query = session.query({ indexName: 'purchasesByUsernameAndClientName' })
                .whereEquals('username', username)
                .orderByDescending('orderDate')

            const results = await query.skip(parseInt(page)).take(parseInt(perPage)).all()

            return res.status(200).send(results)
        } catch (e) {
            console.log(e);
            return res.status(500).send("Error in clients query")
        }
    } else if (type === 'store') {
        const session = store.openSession()

        try {
            const query = session.query({ indexName: 'purchasesByStore' })
                .whereEquals('store', username)
                .orderByDescending('orderDate')

            const results = await query.skip(parseInt(page)).take(parseInt(perPage)).all()

            return res.status(200).send(results)
        } catch (e) {
            console.log(e);
            return res.status(500).send("Error in store query")
        }
    } else if (type === 'admin') {
        const session = store.openSession()

        try {
            const query = session.query({ collection: 'Purchases' })
                .orderByDescending('orderDate')

            const results = await query.skip(parseInt(page)).take(parseInt(perPage)).all()

            return res.status(200).send(results)
        } catch (e) {
            console.log(e);
            return res.status(500).send("Error in admin query")
        }
    }
}

module.exports = {
    getHistory,
};