import express from "express";
import routes from "./routes/routes.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
