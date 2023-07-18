import {
  changeCardStatus,
  createCard,
  fetchCards,
  removeCard,
} from "actions/cardAction";
import { fetchFeatures } from "actions/featureAction";
import { fetchUsers } from "actions/userAction";
import Button from "components/Button";
import CardForm from "components/CardForm";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useMemo, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { makeSelectCardEnabledUsers } from "slices/userSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchFeatures());
    dispatch(fetchUsers());
  }, [dispatch]);

  const cards = useAppSelector((state) => state.cards.cards);
  const cardsStatus = useAppSelector((state) => state.cards.status);
  const analystId = useAppSelector((state) => state.analysts.loggedAnalyst.id);
  const cardEnabledUsers = useMemo(makeSelectCardEnabledUsers, []);
  const selectCardEnabledUsers = useSelector(cardEnabledUsers);
  const [selectedOption, setSelectedOption] = useState("");

  type FormValues = {
    name: string;
    digits: number;
    limit: number;
  };

  const SelectDropdown = () => {
    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSelectedOption(event.target.value);
    };

    return (
      <div>
        <label htmlFor="select-option">Select an option:</label>
        <select
          id="select-option"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          {selectCardEnabledUsers.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <p>Selected option: {selectedOption}</p>
      </div>
    );
  };

  const onCreateCard = (formValues: FormValues) => {
    const newCard = {
      createdAt: new Date().toISOString(),
      status: "requested",
      updatedAt: undefined,
      metadatas: formValues,
      user_id: analystId,
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
      <h1>Home</h1>
      {cards.length === 0 ? (
        "LOADING"
      ) : (
        <>
          <CardForm onCreateCard={onCreateCard} />
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
          <>
            <SelectDropdown />
          </>
        </>
      )}
    </div>
  );
};

export default Home;
