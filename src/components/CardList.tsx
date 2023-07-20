import Modal from "./Modal";
import { useState } from "react";
import CardForm, { FormValues } from "./CardForm";
import { AiOutlinePlus } from "react-icons/ai";
import Card from "./Card";

interface CardListProps {
  cards: Card[];
  onCreateCard: (formValues: FormValues) => void;
  onCardStatusChange: (card: Card, newStatus: Card["status"]) => void;
  onDeleteCard: (card: Card) => void;
}

const CardList = ({
  cards,
  onCreateCard,
  onCardStatusChange,
  onDeleteCard,
}: CardListProps) => {
  const [modalOpen, setModalOpen] = useState(false);

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
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onCreateCard={onCreateCard}
            onCardStatusChange={onCardStatusChange}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl text-gray-700 my-2">Criar Pedido de Cartão</h2>
        <CardForm onCreateCard={onCreateCard} />
      </Modal>
    </div>
  );
};

export default CardList;
