const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; // Replace with MongoDB later

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  const { action, email, password, name } = JSON.parse(event.body);

  if (action === 'register') {
    if (users.find(u => u.email === email)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'User exists' }) };
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = { email, password: hashed, name };
    users.push(user);
    const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '7d' });
    return { statusCode: 200, body: JSON.stringify({ token, user: { email, name } }) };
  }

  if (action === 'login') {
    const user = users.find(u => u.email === email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }
    const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '7d' });
    return { statusCode: 200, body: JSON.stringify({ token, user: { email, name: user.name } }) };
  }
};