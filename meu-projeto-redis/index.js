const express = require('express');
const redis = require('redis');
 
const app = express();
const port = 3000;
 
// Configuração do cliente Redis
// 'redis://redis:6379' é o endereço que usaremos no Docker Compose
const client = redis.createClient({
    url: 'redis://redis:6379'
});
 
client.on('error', (err) => console.log('Erro no Redis Client', err));
 
async function startServer() {
    await client.connect();
    console.log('Conectado ao Redis!');
 
    app.get('/', async (req, res) => {
        // Exemplo simples: contando visitas
        const visitas = await client.incr('contador_visitas');
        res.send(`Olá! Esta página foi visitada ${visitas} vezes.`);
    });
 
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}
 
startServer();