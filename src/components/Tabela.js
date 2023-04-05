import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { GlobalContext } from "../context";

export default function TabelaListaPadrao(props) {
  const { data, titulo, funcao } = props;
  const { abrirModal, setAbrirModal, viagemSelecionada, setViagemSelecionada } =
    useContext(GlobalContext);

  return (
    <div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, fontSize: 11 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {titulo?.map((item) => {
                return (
                  <TableCell sx={{ fontSize: 11 }} align="center">
                    {item.titulo}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  setAbrirModal(true);
                  setViagemSelecionada(row);
                }}
              >
                {titulo.map((item) => {
                  return (
                    <TableCell sx={{ fontSize: 11 }} align="center">
                      {row[item.valor]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
