import {
  changeCardStatus,
  createCard,
  fetchCards,
  removeCard,
} from "actions/cardAction";
import { fetchFeatures } from "actions/featureAction";
import { fetchUsers } from "actions/userAction";
import CardForm from "components/CardForm";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { makeSelectCardEnabledUsers } from "slices/userSlice";
import CardList from "components/CardList";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchFeatures());
    dispatch(fetchUsers());
    // initTE({ Modal, Ripple });
  }, [dispatch]);

  const cards = useAppSelector((state) => state.cards.cards);
  const analystId = useAppSelector((state) => state.analysts.loggedAnalyst.id);
  const cardEnabledUsers = useMemo(makeSelectCardEnabledUsers, []);
  const selectCardEnabledUsers = useSelector(cardEnabledUsers);
  const [selectedOption, setSelectedOption] = useState("");

  interface FormValues {
    name: string;
    digits: number;
    limit: number;
  }

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
  // TODO: usecallback
  const onCreateCard = (formValues: FormValues) => {
    const newCard = {
      createdAt: new Date().toISOString(),
      status: "requested",
      updatedAt: undefined,
      metadatas: formValues,
      user_id: Number(selectedOption),
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
    <div className="px-[10vw]">
      <h1>Home</h1>
      {cards.length === 0 ? (
        "LOADING"
      ) : (
        <>
          {/* <Modal>Teste</Modal> */}
          <CardForm onCreateCard={onCreateCard} />
          <SelectDropdown />
          <CardList
            cards={cards}
            onCardStatusChange={onCardStatusChange}
            onDeleteCard={onDeleteCard}
          />
        </>
      )}
    </div>
  );
};

export default Home;
