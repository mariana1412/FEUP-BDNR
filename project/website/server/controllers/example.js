async function getExample(req, res) {
    return res.status(200).send('Connection was established!')
}

module.exports = {
  getExample,
};
