const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Conecta ao MongoDB
mongoose.connect('mongodb://localhost:27017/AdoteJa', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define o modelo para as mensagens do chat
const chatMessageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

// CHAT DA PAGINA HOME
io.on('connection', (socket) => {
  console.log('Usuário conectado');

// Lógica para lidar com mensagens do servidor
socket.on('chat', (data) => {
  if (data && data.user && data.message) {
    const { user, message } = data;
    console.log(`Mensagem do cliente: ${user}: ${message}`);
    
    // Salva a mensagem no banco de dados
    const newMessage = new ChatMessage({ user, message });
    newMessage.save();

    // Envia a mensagem para todos os clientes conectados
    io.emit('chat', { user, message });  
  }
});



// Lógica para desconectar o usuário
socket.on('disconnect', () => {
  console.log('Usuário desconectado');
  });
});


const autenticacao = require("./middlewares/autenticacao");
const router = require("./routes/login_criar");

app.use(express.json());
app.use(router);

app.get("/", autenticacao, (req, res) => {
  res.status(200).send({
    nome: req.user.nome,
    email: req.user.email,
    dados: req.user.dados,
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor está sendo executado na porta ${PORT}`);
});

