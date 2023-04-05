import { createBrowserRouter, Link } from "react-router-dom";
import Autenticar from "../pages/Auth";
import PainelDevolucao from "../pages/PainelDevolucao";
import Imprimir from "../pages/PainelDevolucao/NfsDevolucao/Imprimir";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Autenticar />,
  },
  {
    path: "/listadevolucao",
    element: <PainelDevolucao />,
  },
  {
    path: "/imprimir",
    element: <Imprimir />,
  },
]);

export default router;
