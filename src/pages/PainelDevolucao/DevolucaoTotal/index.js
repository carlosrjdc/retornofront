import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Axios from "../../../config/Api.js";
import moment from "moment-timezone";
import { GlobalContext } from "../../../context/index.js";

export default function DevolucaoTotal() {
  const [dados, setDados] = useState([]);
  const [textoFiltro, setTextoFiltro] = useState([]);

  const {
    abrirModal,
    setAbrirModal,
    viagemSelecionada,
    setViagemSelecionada,
    notasFiscais,
    setNotasFiscais,
    dadosNf,
    setDadosNf,
    verificar,
    setVerificar,
  } = useContext(GlobalContext);

  const filtrado =
    textoFiltro.length > 0
      ? dados.filter(
          (filtrar) =>
            filtrar.transporte.includes(textoFiltro.toUpperCase()) ||
            filtrar.id_viagem.includes(textoFiltro.toUpperCase()) ||
            filtrar.placa.includes(textoFiltro.toUpperCase())
        )
      : dados;

  useEffect(() => {
    Axios.get("/buscarnfsemaberto").then((response) => setDados(response.data));
  }, []);

  async function AtualizarDadosNF(viagemSelecionada) {
    Axios.get(`/buscarnfs/${viagemSelecionada}`).then((response) => {
      setDadosNf(response.data);
    });
  }

  async function AtualizarDadosGerais() {
    const dataHoje = moment(new Date()).format("YYYY-MM-DD");
    Axios.post(`/notasfiscais/${dataHoje}`);
  }

  const Titulos = [
    { titulo: "PLACA", valor: "placa" },
    { titulo: "TRANSPORTADORA", valor: "transportadora" },
    { titulo: "TRANSPORTE", valor: "transporte" },
    { titulo: "VIAGEM", valor: "id_viagem" },
  ];

  return (
    <div>
      <div style={{ padding: "1%" }}>
        <TextField
          onChange={(e) => setTextoFiltro(e.target.value)}
          id="outlined-basic"
          label="Pesquisar"
          variant="outlined"
        />
        <Button onClick={AtualizarDadosGerais} variant="contained">
          Atualizar{" "}
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {Titulos.map((titulo) => (
                <TableCell>{titulo.titulo}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrado.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  AtualizarDadosNF(row.id_viagem);
                  setNotasFiscais([]);
                }}
              >
                {Titulos.map((titulo) => (
                  <TableCell sx={{ fontSize: "15px" }}>
                    {row[titulo.valor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
