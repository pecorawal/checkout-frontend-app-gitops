const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <body style="font-family: Arial; text-align: center; margin-top: 50px;">
                <h1>🛒 Checkout Frontend</h1>
                <p>Bem-vindo ao nosso e-commerce!</p>
                <div style="padding: 20px; background: #d4edda; color: #155724; display: inline-block; border-radius: 5px;">
                    <strong>Versão Atual:</strong> 1.0.0
                </div>
            </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Frontend rodando na porta ${PORT}`);
});
