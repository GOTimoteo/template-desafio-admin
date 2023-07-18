import React, { useState } from "react";

type FormValues = {
  name: string;
  digits: number;
  limit: number;
};

type CardFormProps = {
  onCreateCard: (formValues: FormValues) => void;
};

const CardForm = ({ onCreateCard }: CardFormProps) => {
  const [formValues, setFormValues] = useState<FormValues>({} as FormValues);

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

  return (
    <form onSubmit={handleSubmit}>
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
