import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";

import { BsFillTrash3Fill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context";
import Axios from "../../../config/Api";
import { ModalConfirmacao } from "./ModalConfirmacao";
import { ModalConfirmacaoDelete } from "./ModalConfirmacaoDelete";

export default function NfReentrega() {
  const {
    dadosNf,
    setDadosNf,
    notasFiscais,
    setNotasFiscais,
    verificar,
    abrirModal,
    setAbrirModal,
    abrirModaldelete,
    setAbrirModalDelete,
    idExcluir,
    setIdExcluir,
    idDemanda,
    setIdDemanda,
    geral,
    setGeral,
  } = useContext(GlobalContext);

  const [atualizarChecked, setAtualizarChecked] = useState(false);

  const navigate = useNavigate();

  async function CadastrarProdutosParaConferencia() {
    notasFiscais.map(async (cadastrar) => {
      await Axios.post(`/cadastrarDemanda`, {
        refViagem: cadastrar.id_viagem,
        placa: cadastrar.placa,
        operadorId: 1,
      }).then((response) => {
        Axios.post(
          `/cadastrarDemandanova/${cadastrar.id_viagem}/${cadastrar.nota_fiscal}/${response.data.id}`
        ).then((resposta) => {
          console.log(response);
          Axios.put(`/atualizarnotafiscal/${parseInt(cadastrar.id)}`, {
            demandagerada: response.data.id,
          })
            .then(async (final) => {
              setIdDemanda(response.data.id);
              setGeral(response.data);
              navigate("/imprimir");
              setNotasFiscais([]);
            })
            .catch((erro) => console.log(erro));
        });
      });
    });
  }

  const Titulos = [
    { titulo: "NF", valor: "nota_fiscal" },
    { titulo: "STATUS", valor: "status_nf" },
    { titulo: "PLACA", valor: "placa" },
    { titulo: "TRANSPORTE", valor: "transporte" },
    { titulo: "VIAGEM", valor: "id_viagem" },
  ];

  const filtrado = dadosNf?.filter(
    (filtrar) => filtrar.status_nf === "Reentrega"
  );

  console.log(notasFiscais);
  async function cadastrarNfparaConferencia(validar, item) {
    if (validar) {
      setNotasFiscais((prevList) => [...prevList, item]);
    } else {
      setNotasFiscais(notasFiscais.filter((filtrar) => filtrar.id !== item.id));
    }
  }

  async function Deletarregistro() {
    await Axios.delete(`/deletarnf/${idExcluir}`).then((response) =>
      console.log("Deletado com sucesso")
    );
  }

  console.log(idExcluir);

  useEffect(() => {
    setAtualizarChecked(false);
  }, [verificar]);

  return (
    <div>
      <ModalConfirmacao acao={CadastrarProdutosParaConferencia} />
      <ModalConfirmacaoDelete acao={Deletarregistro} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Selecionar</TableCell>
              {Titulos.map((titulo) => (
                <TableCell>{titulo.titulo}</TableCell>
              ))}
              <TableCell>Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtrado?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontSize: "12px" }}>
                  <Checkbox
                    defaultValue={false}
                    onClick={(e) =>
                      cadastrarNfparaConferencia(e.target.checked, row)
                    }
                    size="small"
                  />
                </TableCell>
                {Titulos.map((titulo) => (
                  <TableCell sx={{ fontSize: "12px" }}>
                    {row[titulo.valor]}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <BsFillTrash3Fill
                    onClick={async () => {
                      setIdExcluir(row.id);
                      setAbrirModalDelete(true);
                    }}
                    style={{ cursor: "pointer" }}
                    size={18}
                    color="red"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ padding: "2%" }}>
        <Button onClick={setAbrirModal} variant="contained">
          Gerar Conferencia
        </Button>
      </div>
      <div style={{ padding: "2%", marginTop: "5%" }}>
        {notasFiscais.map((nota) => (
          <div>{nota.id}</div>
        ))}
      </div>
    </div>
  );
}
