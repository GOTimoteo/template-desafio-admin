import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { BsQuestionLg } from "react-icons/bs";

export const auditTypeIcon = {
  cartao_adicionado: "a",
  status_alterado: "a",
  cartao_removido: "a",
};

type CardIconsMap = Record<Card["status"], React.ReactNode>;

export const cardStatusIcon: CardIconsMap = {
  requested: (
    <div className="text-white p-1 rounded bg-yellow-500">
      <BsQuestionLg />
    </div>
  ),
  approved: (
    <div className="text-white p-1 rounded bg-green-500">
      <TiTickOutline />
    </div>
  ),
  rejected: (
    <div className="text-white p-1 rounded bg-red-500">
      <RxCross2 />
    </div>
  ),
};
