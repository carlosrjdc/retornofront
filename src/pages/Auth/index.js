import { useContext } from "react";
import { GlobalContext } from "../../context";

export default function Autenticar() {
  const { testando } = useContext(GlobalContext);

  return <div>{testando}</div>;
}
