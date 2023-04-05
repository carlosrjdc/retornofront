import DevolucaoTotal from "./DevolucaoTotal";
import NfsDevolucao from "./NfsDevolucao";

export default function PainelDevolucao() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "1.3%", width: "50%" }}>
        <DevolucaoTotal />
      </div>
      <div style={{ margin: "0.8%" }}>
        <br></br>
        <br></br>
        <br></br>
        <NfsDevolucao />
      </div>
    </div>
  );
}
