import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { makeSelectCardEnabledUsers } from "slices/userSlice";

export interface FormValues {
  name: string;
  digits: number;
  limit: number;
  user_id: number;
}

interface CardFormProps {
  onCreateCard: (formValues: FormValues) => void;
}

// TODO: realizar validações no form. Utilizar react-hook-forms e yup para melhor controle.

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
    onCreateCard({
      ...formValues,
      digits: Number(formValues.digits),
      limit: Number(formValues.limit),
      user_id: Number(selectedOption),
    });
  };

  const SelectUsersDropdown = () => {
    // TODO: Ao escalar, devido ao maior número de users, o interessante seria implementar um select que permite a busca por nome / id de user, carregando o dropdown com os resultados.
    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSelectedOption(event.target.value);
    };

    return (
      <div className="mb-4 text-left text-gray-700 text-xs">
        <label htmlFor="select-option" className="block mb-1">
          Selecione um usuário:
        </label>
        <select
          id="select-option"
          value={selectedOption}
          onChange={handleSelectChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option disabled value="">
            {" "}
            -- selecione um usuário --{" "}
          </option>
          {selectCardEnabledUsers.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <SelectUsersDropdown />
      <div className="mb-4 text-left text-gray-700 text-xs">
        <label htmlFor="name" className="block mb-1">
          Nome do usuário impresso no cartão:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4 text-left text-gray-700 text-xs">
        <label htmlFor="digits" className="block mb-1">
          Dígitos do cartão:
        </label>
        <input
          type="text"
          id="digits"
          name="digits"
          value={formValues.digits || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4 text-left text-gray-700 text-xs">
        <label htmlFor="limit" className="block mb-1">
          Limite do cartão de crédito em reais:
        </label>
        <input
          type="text"
          id="limit"
          name="limit"
          value={formValues.limit || ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-stone-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-stone-green-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default CardForm;
