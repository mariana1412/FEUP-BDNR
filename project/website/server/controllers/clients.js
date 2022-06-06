const { store } = require("../config");

async function getClient(req, res) {
    const { username } = req.query;
    
    try {
        const session = store.openSession()

        const query = session.query({ collection: 'Clients' })
            .whereEquals('username', username)
        
        const result = await query.first()

        return res.status(200).send(result)
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error in client query")
    }
}

async function editClient(req, res) {
    const { id, newName, newDate } = req.body;

    try {
        const session = store.openSession()

        const client = await session.load(id)

        client.name = newName
        client.birthdate = newDate

        await session.saveChanges()

        return res.status(200).send()
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error in edit client")
    }
}

module.exports = {
    getClient,
    editClient
};