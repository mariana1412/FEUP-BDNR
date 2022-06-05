const { store } = require("../config");

async function getProducts(req, res) {
  let {page, perPage} = req.body;
  page = parseInt(page);
  perPage = parseInt(perPage);
  if (isNaN(page) || isNaN(perPage)) return res.status(400).send("Both page and perPage are required and need to be numbers.")
  const session = store.openSession();
  const result = await session.query({ collection: 'Products' }).skip(page).take(perPage).all();
  return res.status(200).send(result);
}

async function getProduct(req, res) {
  const {id} = req.params;
  const session = products.openSession();
  const result = await session.load(id);
  if(result === null) return res.status(404).send(`Product ${id} not found.`);
  return res.status(200).send(result);
}

class Purchase {
  constructor(client, lines, total, orderDate) {
    this.client = client
    this.lines = lines
    this.total = total
    this.orderDate = orderDate
  }
}

class PurchseLine {
  constructor(quantity, productId, productName, unitPrice, store) {
    this.quantity = quantity
    this.productId = productId
    this.productName = productName
    this.unitPrice = unitPrice
    this.price = unitPrice * quantity
    this.store = store
  }
}


async function makePurchase(req, res) {
  const { productId, clientId, quantity } = req.body;

  const session = store.openSession()

  try {
    const product = await session.load(productId)

    if (product.stock < quantity) {
      return res.status(403).send("Insufficient stock")
    }

    product.stock -= quantity

    const lines = [new PurchseLine(quantity, product.id, product.name, product.price, product.store)]
    const orderDate = new Date(Date.now()).toISOString()
    const purchase = new Purchase(clientId, lines, product.price * quantity, orderDate)

    await session.store(purchase, 'purchases|')
    
    await session.saveChanges()

    return res.status(201).send(purchase)
  } catch (error) {
    console.log(error);
    return res.status(500).send('Error making purchase')
  }
}

module.exports = {
  getProducts,
  getProduct,
  makePurchase,
};
