import { FaTrashAlt } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import Button from "./Button";
import Modal from "./Modal";
import { useState } from "react";
import CardForm, { FormValues } from "./CardForm";
import { useAppSelector } from "hooks/redux";
import { AiOutlinePlus } from "react-icons/ai";
import { formatDateTimeToDDMMYYYYHHMMSS } from "utils/masks/date";
import { formatCurrency } from "utils/masks/money";

interface CardListProps {
  cards: Card[];
  onCreateCard: (formValues: FormValues) => void;
  onCardStatusChange: (card: Card, newStatus: string) => void;
  onDeleteCard: (card: Card) => void;
}

const CardList = ({
  cards,
  onCreateCard,
  onCardStatusChange,
  onDeleteCard,
}: CardListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const cardsStatus = useAppSelector((state) => state.cards.status);

  return (
    <div className="flex flex-col gap-2 mb-8">
      <button
        className="text-white font-semibold px-2 rounded bg-stone-green-500 hover:bg-stone-green-600 w-fit"
        onClick={() => setModalOpen(true)}
      >
        <div className="flex gap-1 items-center">
          Criar Pedido de Cartão <AiOutlinePlus />
        </div>
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const { id, user_id, status, metadatas, createdAt, updatedAt } = card;
          const { name, limit, digits } = metadatas;
          return (
            <div
              key={id}
              className="flex flex-col flex-1 w-full rounded overflow-hidden shadow-lg bg-white"
            >
              <div className="flex justify-between p-4">
                <div className="text-gray-700 text-xs">
                  ID: <span className="font-semibold">{id}</span>
                </div>
                <div className="flex space-x-2">
                  {status !== "rejected" && (
                    <Button
                      onClick={() => onCardStatusChange(card, "approved")}
                      isLoading={cardsStatus === "loading"}
                      isDisabled={status !== "requested"}
                      color="green"
                    >
                      <TiTickOutline />
                    </Button>
                  )}
                  {status !== "approved" && (
                    <Button
                      onClick={() => onCardStatusChange(card, "rejected")}
                      isLoading={cardsStatus === "loading"}
                      isDisabled={status !== "requested"}
                      color="red"
                    >
                      <RxCross2 />
                    </Button>
                  )}
                  <Button
                    onClick={() => onDeleteCard(card)}
                    isLoading={cardsStatus === "loading"}
                    color="gray"
                  >
                    <FaTrashAlt />
                  </Button>
                </div>
              </div>
              <div className="px-6 text-gray-700 text-base text-left">
                <span className="font-semibold">{user_id}</span> | {name}
              </div>
              <div className="flex flex-wrap justify-between px-6 py-4">
                <div className="text-gray-700 text-base">
                  <div className="text-gray-700 text-base text-left">
                    {digits}
                  </div>
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
        })}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl text-gray-700 my-2">Criar Pedido de Cartão</h2>
        <CardForm onCreateCard={onCreateCard} />
      </Modal>
    </div>
  );
};

export default CardList;
