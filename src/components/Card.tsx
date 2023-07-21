import { useAppSelector } from "hooks/redux";
import { FormValues } from "./CardForm";
import Button from "./Button";
import { formatDateTimeToDDMMYYYYHHMMSS } from "utils/masks/date";
import { formatCurrency } from "utils/masks/money";
import { FaTrashAlt } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { cardStatusIcon } from "components/cardStatus";
import React, { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { useAuth } from "contexts/auth";

interface EditableCardProps {
  card: Card;
  onCreateCard: (formValues: FormValues) => void;
  onCardStatusChange: (card: Card, newStatus: Card["status"]) => void;
  onNameChange: (card: Card, name: Card["metadatas"]["name"]) => void; // lookup types são utilizados sempre que possível para evitar erros em futuras mudanças
  onDeleteCard: (card: Card) => void;
  readOnly?: false;
}

interface ReadOnlyCardProps {
  card: Card;
  readOnly: true;
}

// TECH: As props do Card são tipadas com Discriminated Unions, permitindo diferentes conjuntos de props caso o card seja editável ou somente leitura.

type CardProps = EditableCardProps | ReadOnlyCardProps;

const Card = (props: CardProps) => {
  const { id, user_id, status, metadatas, createdAt, updatedAt } = props.card;
  const { name, limit, digits } = metadatas;
  const cardsStatus = useAppSelector((state) => state.cards.status);
  const [displayName, setDisplayName] = useState(name);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const { analyst } = useAuth();

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayName(event.target.value);
  };

  useEffect(() => {
    setIsNameChanged(displayName !== name);
  }, [displayName, setIsNameChanged, name]);

  // TODO: As ações irreversíveis, como aprovar, desaprovar e deletar devem ter uma modal ou outro botão de confirmação.
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
            {analyst.roles.includes("n2") && (
              <Button
                onClick={() => props.onDeleteCard(props.card)}
                isLoading={cardsStatus === "loading"}
                color="gray"
              >
                <FaTrashAlt />
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="pl-6 text-gray-700 text-base text-left">
        {/* TODO: Todas as estilizações de texto e cores de elementos devem ser centralizadas, para facilitar a mudança de padrões gerais e criação de temas diferentes */}
        <span className="font-semibold">{user_id}</span> |{" "}
        {!props.readOnly ? (
          <input
            type="text"
            id="name"
            name="name"
            value={displayName}
            onChange={handleDisplayNameChange}
            className="px-2 border border-gray-300 rounded-md"
            required
          />
        ) : (
          name
        )}
        {isNameChanged && !props.readOnly && (
          <button
            className="text-white px-2 p-1 rounded bg-green-500"
            onClick={() => props.onNameChange(props.card, displayName)}
          >
            <GiConfirmed />
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-between px-6 py-4">
        <div className="text-gray-700 text-base">
          <div className="text-gray-700 text-base text-left">{digits}</div>
        </div>
        {analyst.roles.includes("n2") && (
          <div className="text-gray-700 text-base">
            <span className="font-semibold">{formatCurrency(limit)}</span>
          </div>
        )}
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
