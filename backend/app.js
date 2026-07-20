require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rotas = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas)

app.get("/", (req, res) => {
  return res.json({
    message: "API Hub Parking funcionando",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});