import { FaTrashAlt } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import Button from "./Button";

interface CardProps {
  cards: Card[];
  onCardStatusChange: (card: Card, newStatus: string) => void;
  onDeleteCard: (card: Card) => void;
}

const CardList = ({ cards, onCardStatusChange, onDeleteCard }: CardProps) => (
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
                  isLoading={status === "loading"}
                  isDisabled={card.status !== "requested"}
                  color="green"
                >
                  <TiTickOutline />
                </Button>
              )}
              {status !== "approved" && (
                <Button
                  onClick={() => onCardStatusChange(card, "rejected")}
                  isLoading={status === "loading"}
                  isDisabled={card.status !== "requested"}
                  color="red"
                >
                  <RxCross2 />
                </Button>
              )}
              <Button
                onClick={() => onDeleteCard(card)}
                isLoading={status === "loading"}
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
              <div className="text-gray-700 text-base text-left">{digits}</div>
            </div>
            <div className="text-gray-700 text-base">
              Credit Limit: <span className="font-semibold">R$ {limit}</span>
            </div>
          </div>
          <div className="flex justify-between gap-1 mt-auto p-4 bg-gray-200">
            <div className="flex-1 text-left text-gray-700 text-xs">
              <div>Created At: </div>
              <div>{createdAt}</div>
            </div>
            <div className="flex-1 text-left text-gray-700 text-xs">
              <div>Updated At: </div>
              <div>{updatedAt}</div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default CardList;
