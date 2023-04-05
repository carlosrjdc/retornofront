import React, { useContext, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "../../../config/Api";
import { GlobalContext } from "../../../context";
import TextField from "@mui/material/TextField";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { idDemanda, setIdDemanda, geral } = useContext(GlobalContext);

  const Titulos = [
    { titulo: "Item", valor: "referenciaItem" },
    { titulo: "Desc Item", valor: "descricaoItem" },
    { titulo: "Tipo", valor: "tipodevolucao" },
    { titulo: "Nota Fiscal", valor: "nota_fiscal" },
    { titulo: "Empresa", valor: "empresa" },
    { titulo: "Quantidade", valor: "quantidade" },
  ];

  const [novoDado, setNovoDado] = useState([]);
  const [textoFiltro, setTextoFiltro] = useState("");
  const [atualizar, setAtualizar] = useState(0);

  function atualizardadosatual() {
    setAtualizar(atualizar + 1);
  }

  const filtrado =
    textoFiltro.length > 0
      ? novoDado.filter(
          (filtrar) =>
            filtrar.viagemId.includes(textoFiltro.toUpperCase()) ||
            filtrar.nota_fiscal.includes(textoFiltro.toUpperCase())
        )
      : novoDado;

  useEffect(() => {
    Axios.get(`/demandaagrupada/${geral.id}`).then((response) =>
      setNovoDado(
        response.data.filter(
          (filtrar) =>
            filtrar.tipodevolucao === "Devolução total" ||
            filtrar.tipodevolucao === "Devolução parcial"
        )
      )
    );
  }, [atualizar]);

  function filtrarReentrega(e) {
    if (e) {
      Axios.get(`/demandaagrupada/${geral.id}`).then((response) =>
        setNovoDado(
          response.data.filter(
            (filtrar) => filtrar.tipodevolucao === "Reentrega"
          )
        )
      );
    } else {
      Axios.get(`/demandaagrupada/${geral.id}`).then((response) =>
        setNovoDado(
          response.data.filter(
            (filtrar) => filtrar.tipodevolucao !== "Reentrega"
          )
        )
      );
    }
  }

  console.log(novoDado);

  return (
    <div>
      Reentrega
      <Checkbox onClick={(e) => filtrarReentrega(e.target.checked)} />
      <TextField
        onChange={(e) => setTextoFiltro(e.target.value)}
        id="outlined-basic"
        label="Pesquisar"
        variant="outlined"
      />
      <div ref={ref}>
        <div>
          <button onClick={atualizardadosatual}>Atualizar </button>
          <div style={{ padding: "1%" }}>
            Placa: {geral.placa} - Viagem: {geral.referencia_viagem}
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {Titulos.map((titulo) => (
                  <TableCell>{titulo.titulo}</TableCell>
                ))}
                <TableCell>Quantidade Conferida</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrado?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Titulos.map((titulo) => (
                    <TableCell sx={{ fontSize: "12px" }}>
                      {row[titulo.valor]}
                    </TableCell>
                  ))}
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
});
