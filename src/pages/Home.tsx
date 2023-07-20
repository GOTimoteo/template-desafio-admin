import {
  changeCardStatus,
  createCard,
  fetchCards,
  removeCard,
} from "actions/cardAction";
import { fetchFeatures } from "actions/featureAction";
import { fetchUsers } from "actions/userAction";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";
import CardList from "components/CardList";
import type { FormValues } from "components/CardForm";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchFeatures());
    dispatch(fetchUsers());
  }, [dispatch]);

  const cards = useAppSelector((state) => state.cards.cards);
  const analystId = useAppSelector((state) => state.analysts.loggedAnalyst.id);

  // TODO: usecallback
  const onCreateCard = (formValues: FormValues) => {
    const newCard: Omit<Card, "id"> = {
      createdAt: new Date().toISOString(),
      status: "requested",
      updatedAt: undefined,
      metadatas: formValues,
      user_id: Number(formValues.userId),
    };
    dispatch(
      createCard({
        card: newCard,
        audit: {
          createdAt: new Date().toISOString(),
          type: "cartao_adicionado",
          before: undefined,
          after: undefined,
          requestedBy: analystId,
        },
      })
    );
  };

  const onCardStatusChange = (card: Card, newStatus: Card["status"]) => {
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
          requestedBy: analystId,
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
          requestedBy: analystId,
        },
      })
    );
  };
  //TODO: passar montagem dos objetos para as actions

  return (
    <div>
      <h1 className="text-2xl text-gray-700 mb-4">Solicitações de Cartões</h1>
      {cards.length === 0 ? (
        "LOADING"
      ) : (
        <>
          <CardList
            cards={cards}
            onCreateCard={onCreateCard}
            onCardStatusChange={onCardStatusChange}
            onDeleteCard={onDeleteCard}
          />
        </>
      )}
    </div>
  );
};

export default Home;
