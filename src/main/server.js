const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT, () => console.log('Server is running'));

process.on('uncaughtException', (_error, _origin) => { });
