import { useAppSelector } from "hooks/redux";
import { FormValues } from "./CardForm";
import Button from "./Button";
import { formatDateTimeToDDMMYYYYHHMMSS } from "utils/masks/date";
import { formatCurrency } from "utils/masks/money";
import { FaTrashAlt } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { cardStatusIcon } from "components/cardStatus";
import React from "react";

interface EditableCardProps {
  card: Card;
  onCreateCard: (formValues: FormValues) => void;
  onCardStatusChange: (card: Card, newStatus: Card["status"]) => void;
  onDeleteCard: (card: Card) => void;
  readOnly?: false;
}

interface ReadOnlyCardProps {
  card: Card;
  readOnly: true;
}

type CardProps = EditableCardProps | ReadOnlyCardProps;

const Card = (props: CardProps) => {
  const { id, user_id, status, metadatas, createdAt, updatedAt } = props.card;
  const { name, limit, digits } = metadatas;
  const cardsStatus = useAppSelector((state) => state.cards.status);

  return (
    <div
      key={id}
      className="flex flex-col flex-1 w-full rounded overflow-hidden shadow-lg bg-white"
    >
      <div className="flex justify-between p-4">
        <div className="text-gray-700 text-xs">
          ID: <span className="font-semibold">{id}</span>
        </div>
        {props.readOnly ? (
          <>{cardStatusIcon[status]}</>
        ) : (
          <div className="flex space-x-2">
            {status !== "rejected" && (
              <Button
                onClick={() => props.onCardStatusChange(props.card, "approved")}
                isLoading={cardsStatus === "loading"}
                isDisabled={status !== "requested"}
                color="green"
              >
                <TiTickOutline />
              </Button>
            )}
            {status !== "approved" && (
              <Button
                onClick={() => props.onCardStatusChange(props.card, "rejected")}
                isLoading={cardsStatus === "loading"}
                isDisabled={status !== "requested"}
                color="red"
              >
                <RxCross2 />
              </Button>
            )}
            <Button
              onClick={() => props.onDeleteCard(props.card)}
              isLoading={cardsStatus === "loading"}
              color="gray"
            >
              <FaTrashAlt />
            </Button>
          </div>
        )}
      </div>
      <div className="px-6 text-gray-700 text-base text-left">
        <span className="font-semibold">{user_id}</span> | {name}
      </div>
      <div className="flex flex-wrap justify-between px-6 py-4">
        <div className="text-gray-700 text-base">
          <div className="text-gray-700 text-base text-left">{digits}</div>
        </div>
        <div className="text-gray-700 text-base">
          <span className="font-semibold">{formatCurrency(limit)}</span>
        </div>
      </div>
      <div className="flex justify-between gap-1 mt-auto p-4 bg-gray-200">
        <div className="flex-1 text-left text-gray-700 text-xs">
          <div>Criado em: </div>
          <div>{formatDateTimeToDDMMYYYYHHMMSS(createdAt)}</div>
        </div>
        <div className="flex-1 text-left text-gray-700 text-xs">
          <div>Atualizado em: </div>
          <div>{formatDateTimeToDDMMYYYYHHMMSS(updatedAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
