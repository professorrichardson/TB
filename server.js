const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const TELEGRAM_TOKEN = '7654062629:AAGSqgyK1OxK8ZqIxYkvPI0i36_cPwv3mgI';
const CHAT_ID = '1065810430'; 

app.post('/api/sendMessage', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  const text = `
📩 *Nova mensagem do site*:
👤 Nome: ${nome}
📧 Email: ${email}
📝 Mensagem: ${mensagem}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text,
      parse_mode: 'Markdown'
    });

    res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao enviar mensagem.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
