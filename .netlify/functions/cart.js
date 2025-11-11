const jwt = require('jsonwebtoken');
let carts = {}; // { userEmail: [items] }

exports.handler = async (event) => {
  const token = event.headers.authorization?.split(' ')[1];
  if (!token) return { statusCode: 401, body: 'No token' };

  try {
    const { email } = jwt.verify(token, 'your-secret-key');
    const { action, product } = JSON.parse(event.body);

    if (action === 'add') {
      if (!carts[email]) carts[email] = [];
      carts[email].push(product);
      return { statusCode: 200, body: JSON.stringify(carts[email]) };
    }

    if (action === 'get') {
      return { statusCode: 200, body: JSON.stringify(carts[email] || []) };
    }
  } catch {
    return { statusCode: 401, body: 'Invalid token' };
  }
};