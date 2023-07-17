import { changeCardStatus, fetchCards, removeCard } from "actions/cardAction";
import Button from "components/Button";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const cards = useAppSelector((state) => state.cards.cards);
  const cardsStatus = useAppSelector((state) => state.cards.status);
  const userId = useAppSelector((state) => state.analysts.loggedAnalyst.id);

  const onCardStatusChange = (card: Card, newStatus: string) => {
    const newCard = {
      ...card,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    dispatch(
      changeCardStatus({
        card: newCard,
        audit: {
          createdAt: new Date().toISOString(),
          type: "status_alterado",
          before: card,
          after: newCard,
          requestedBy: userId,
        },
      })
    );
  };

  const onDeleteCard = (card: Card) => {
    dispatch(
      removeCard({
        id: card.id,
        audit: {
          createdAt: new Date().toISOString(),
          type: "cartao_removido",
          before: card,
          after: undefined,
          requestedBy: userId,
        },
      })
    );
  };

  return (
    <div>
      <h1>Home</h1>
      {cards.length === 0 ? (
        "LOADING"
      ) : (
        <>
          {cards.map((card) => (
            <div key={card.id}>
              {card.id} - {card.status}{" "}
              {card.status === "requested" && (
                <>
                  <Button
                    onClick={() => onCardStatusChange(card, "approved")}
                    isDisabled={card.status !== "requested"}
                    isLoading={cardsStatus === "loading"}
                  >
                    V
                  </Button>
                  <Button
                    onClick={() => onCardStatusChange(card, "rejected")}
                    isDisabled={card.status !== "requested"}
                    isLoading={cardsStatus === "loading"}
                    variant="secondary"
                  >
                    X
                  </Button>
                </>
              )}
              <Button
                onClick={() => onDeleteCard(card)}
                isLoading={cardsStatus === "loading"}
                variant="secondary"
              >
                <FaTrashAlt />
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
