import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NfReentrega from "./NfReentrega";
import { useContext } from "react";
import { GlobalContext } from "../../../context";
import NfRetorno from "./NfRetorno";

function UncontrolledExample() {
  const { dadosNf, setDadosNf, notasFiscais, setNotasFiscais, verificar } =
    useContext(GlobalContext);
  return (
    <Tabs
      onClick={() => {
        setNotasFiscais([]);
      }}
      defaultActiveKey="devolucao"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="devolucao" title="Devolução">
        <NfRetorno />
      </Tab>
      <Tab eventKey="profile" title="Reentrega">
        <NfReentrega />
      </Tab>
    </Tabs>
  );
}

export default UncontrolledExample;
