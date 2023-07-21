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

  // TODO: a lógica relacionada aos cards poderia ser removida para um container e deixar apenas a parte de apresentação nesse arquivo.
  // Mas por enquanto a Home não tem tanto código próprio e não lida com nada além dos cards.

  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchFeatures());
    dispatch(fetchUsers());
  }, [dispatch]);

  const cards = useAppSelector((state) => state.cards.cards);
  const analystId = useAppSelector((state) => state.analysts.loggedAnalyst.id);
  const cardsStatus = useAppSelector((state) => state.cards.status);
  const analystsStatus = useAppSelector((state) => state.analysts.status);

  const onCreateCard = (formValues: FormValues) => {
    const { user_id, ...metadatas } = formValues;
    const newCard: Omit<Card, "id"> = {
      createdAt: new Date().toISOString(),
      status: "requested",
      updatedAt: undefined,
      metadatas: metadatas,
      user_id: user_id,
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
          type: "status_alterado", // TODO: centralizar variáveis hardcoded em dictionaries para facilitar entendimento e alteração das regras de negócio
          before: card,
          after: newCard,
          requestedBy: analystId,
        },
      })
    );
  };

  const onNameChange = (card: Card, name: Card["metadatas"]["name"]) => {
    const newCard = {
      ...card,
      metadatas: { ...card.metadatas, name: name },
      updatedAt: new Date().toISOString(),
    };
    dispatch(
      changeCardStatus({
        card: newCard,
        audit: {
          createdAt: new Date().toISOString(),
          type: "nome_cartao_alterado",
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
      {cardsStatus === "loading" || analystsStatus === "loading" ? (
        "LOADING"
      ) : (
        <>
          <CardList
            cards={cards}
            onCreateCard={onCreateCard}
            onCardStatusChange={onCardStatusChange}
            onDeleteCard={onDeleteCard}
            onNameChange={onNameChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
