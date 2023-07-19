import { useCallback, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { formatCPF } from "utils/masks/cpf";
import {
  formatDateTimeToDDMMYYYYHHMMSS,
  formatDateToDDMMYYYY,
} from "utils/masks/date";

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [filterEmail, setFilterEmail] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterEmail(event.target.value);
  };

  // TODO: Normalmente os usuários não são todos trazidos ao front devido ao volume. Para a escala do sistema, o ideal seria incluir paginação e a cada filtragem uma nova chamada seria feita, normalmente com um debounce para limitar o número de chamadas.

  const filteredData = users.filter((user) =>
    user.email.toLowerCase().includes(filterEmail.toLowerCase())
  );

  const toggleItem = useCallback(
    (itemId: number) => {
      setOpenItems((prevOpenItems) =>
        prevOpenItems.includes(itemId)
          ? prevOpenItems.filter((id) => id !== itemId)
          : [...prevOpenItems, itemId]
      );
    },
    [setOpenItems]
  );

  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="mb-4 max-w-44">
        <input
          type="text"
          value={filterEmail}
          onChange={handleFilterChange}
          placeholder="Filtre pelo email"
          className="p-2 border border-gray-300 rounded-md w-64"
        />
      </div>
      {filteredData.map(
        ({
          id,
          name,
          document,
          email,
          BirthDate,
          createdAt,
          updatedAt,
          enabledFeatures,
          salaryBase,
          metadatas,
          address,
        }) => (
          <div key={id} className="border rounded-md bg-stone-green-600 py-2">
            <div
              className="p-2 bg-gray-100 text-gray-600 cursor-pointer"
              onClick={() => toggleItem(id)}
            >
              <div className="flex flex-col sm:flex-row flex-wrap gap-y-2 gap-x-6 items-center overflow-hidden whitespace-nowrap text-left text-base">
                <div className="w-[5%]">
                  {openItems.includes(id) ? <BsChevronUp /> : <BsChevronDown />}
                </div>
                <strong className="sm:w-[35%] grow w-full overflow-hidden">
                  {id} | {name}
                </strong>
                <strong className="sm:w-[20%] grow w-full">
                  {formatCPF(document)}
                </strong>
                <strong className="sm:w-[30%] grow w-full overflow-hidden">
                  {email}
                </strong>
              </div>
            </div>
            {openItems.includes(id) && (
              <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-gray-700 text-base text-left p-4 bg-gray-200">
                <div className="flex flex-col gap-2 grow">
                  <div className="break-words">
                    <strong>Nome:</strong> {name}
                  </div>
                  <div>
                    <strong>Documento:</strong> {formatCPF(document)}
                  </div>
                  <div className="break-all">
                    <strong>Email:</strong> {email}
                  </div>
                  <div>
                    <strong>Data de Nascimento:</strong>{" "}
                    {formatDateToDDMMYYYY(BirthDate)}
                  </div>
                  <div className="break-words">
                    <strong>Endereço:</strong>{" "}
                    {`${address.streetNumber}, ${address.neighborhood}, ${address.city}, ${address.state}, ${address.postalCode}`}
                  </div>
                  <div>
                    <strong>Salário Base:</strong> {salaryBase}
                  </div>
                </div>
                <div className="flex flex-col gap-2 grow">
                  <div>
                    <strong>Documento Válido:</strong>{" "}
                    {metadatas.validDocument ? "Sim" : "Não"}
                  </div>
                  <div>
                    <strong>Verificado:</strong>{" "}
                    {metadatas.verified ? "Sim" : "Não"}
                  </div>
                  <div>
                    <strong>Recursos Habilitados:</strong>{" "}
                    {enabledFeatures.join(", ")}
                  </div>
                  <div>
                    <strong>Criado em:</strong>{" "}
                    {formatDateTimeToDDMMYYYYHHMMSS(createdAt)}
                  </div>
                  <div>
                    <strong>Atualizado em:</strong>{" "}
                    {formatDateTimeToDDMMYYYYHHMMSS(updatedAt) || "N/A"}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default UserList;
