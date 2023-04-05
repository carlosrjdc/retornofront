import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function InfoProvider({ children }) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModaldelete, setAbrirModalDelete] = useState(false);
  const [viagemSelecionada, setViagemSelecionada] = useState("");
  const [notasFiscais, setNotasFiscais] = useState([]);
  const [dadosNf, setDadosNf] = useState([]);
  const [verificar, setVerificar] = useState(0);
  const [idExcluir, setIdExcluir] = useState("");
  const [idDemanda, setIdDemanda] = useState("");
  const [geral, setGeral] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
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
        abrirModaldelete,
        setAbrirModalDelete,
        idExcluir,
        setIdExcluir,
        idDemanda,
        setIdDemanda,
        geral,
        setGeral,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
