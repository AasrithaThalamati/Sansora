const jwt = require('jsonwebtoken');
let products = []; // Replace with DB

exports.handler = async (event) => {
  const token = event.headers.authorization?.split(' ')[1];
  if (!token) return { statusCode: 401 };

  try {
    jwt.verify(token, 'your-secret-key');
    const { name, price, image, category } = JSON.parse(event.body);
    const product = { id: Date.now(), name, price, image, category };
    products.push(product);
    return { statusCode: 200, body: JSON.stringify(product) };
  } catch {
    return { statusCode: 403 };
  }
};