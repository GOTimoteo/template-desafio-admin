import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { makeSelectCardEnabledUsers } from "slices/userSlice";

export interface FormValues {
  name: string;
  digits: number;
  limit: number;
  userId: number;
}

interface CardFormProps {
  onCreateCard: (formValues: FormValues) => void;
}

const CardForm = ({ onCreateCard }: CardFormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({} as FormValues);
  const [selectedOption, setSelectedOption] = useState("");
  const cardEnabledUsers = useMemo(makeSelectCardEnabledUsers, []);
  const selectCardEnabledUsers = useSelector(cardEnabledUsers);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreateCard(formValues);
  };

  const SelectUsersDropdown = () => {
    // TODO: Ao escalar, devido ao maior número de users, o interessante seria implementar um select que permite a busca por nome / id de user, carregando o dropdown com os resultados.
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

  return (
    <form onSubmit={handleSubmit}>
      <SelectUsersDropdown />
      <div>
        <label htmlFor="name">Nome impresso no cartão usuário:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="digits">Dígitos do cartão:</label>
        <input
          type="text"
          id="digits"
          name="digits"
          value={formValues.digits}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="limit">Limite do cartão de crédito em reais:</label>
        <input
          type="text"
          id="limit"
          name="limit"
          value={formValues.limit}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CardForm;
