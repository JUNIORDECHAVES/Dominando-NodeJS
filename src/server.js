import server from './app';

const PORT = Number(process.env.PORT);
server.listen(PORT);