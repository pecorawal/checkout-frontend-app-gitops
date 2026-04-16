const express = require('express');
const http = require('http'); // Módulo nativo para requisições
const app = express();
const PORT = 3000;

// Lê a variável de ambiente que injetamos via Helm
const API_URL = process.env.API_PAGAMENTOS_URL || "http://pagamentos-api.pagamentos.svc:8080";

app.get('/', (req, res) => {
    // Faz a chamada Leste-Oeste para o namespace de pagamentos
    http.get(`${API_URL}/api/pagamentos`, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => { data += chunk; });
        
        apiRes.on('end', () => {
            try {
                const json = JSON.parse(data);
                res.send(`
                    <html>
                        <body style="font-family: Arial; text-align: center; margin-top: 50px;">
                            <h1>🛒 Checkout Frontend</h1>
                            <p>Bem-vindo ao nosso e-commerce!</p>
                            <div style="padding: 20px; background: #cce5ff; color: #004085; display: inline-block; border-radius: 5px; text-align: left;">
                                <h3>Resposta da API de Pagamentos:</h3>
                                <strong>Status:</strong> ${json.status} <br>
                                <strong>Transação Nº:</strong> ${json.transacao} <br>
                                <strong>Mensagem:</strong> ${json.mensagem} <br>
                                <strong>Ambiente:</strong> ${json.ambiente}
                            </div>
                        </body>
                    </html>
                `);
            } catch (e) {
                res.status(500).send("Erro ao processar o JSON da API.");
            }
        });
    }).on("error", (err) => {
        res.status(500).send(`
            <h2 style="color: red;">Erro de Conexão</h2>
            <p>O Frontend não conseguiu alcançar a API.</p>
            <p>Detalhe: ${err.message}</p>
        `);
    });
});

app.listen(PORT, () => {
    console.log(`Frontend rodando na porta ${PORT}`);
});
