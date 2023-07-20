import { useCallback, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { formatDateTimeToDDMMYYYYHHMMSS } from "utils/masks/date";
import Card from "./Card";
import { useAppSelector } from "hooks/redux";

interface AuditListProps {
  audits: Audit[];
}

const AuditList = ({ audits }: AuditListProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const analysts = useAppSelector((state) => state.analysts.analysts);

  const findAnalystNameById = useCallback(
    (id: Analyst["id"]) => analysts.find((analyst) => analyst.id === id)?.email,
    [analysts]
  );

  // TODO: A lista de auditorias se beneficiaria também de uma barra de buscas e ordenação, idealmente com chamadas na API e debounce

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
      {audits.map(({ id, createdAt, requestedBy, type, before, after }) => (
        <div key={id} className="border rounded-md bg-stone-green-600 py-2">
          <div
            className="p-2 bg-gray-100 text-gray-600 cursor-pointer"
            onClick={() => toggleItem(id)}
          >
            <div className="flex flex-col sm:flex-row flex-wrap gap-y-2 gap-x-6 justify-between items-center overflow-hidden whitespace-nowrap text-left text-base">
              <div className="w-[5%]">
                {openItems.includes(id) ? <BsChevronUp /> : <BsChevronDown />}
              </div>
              <strong className="sm:w-[35%] grow w-full overflow-hidden">
                {id} | {findAnalystNameById(requestedBy)}
              </strong>
              <strong className="sm:w-[20%] grow w-full">{type}</strong>
              <strong className="sm:w-[30%] grow w-full overflow-hidden text-right">
                {formatDateTimeToDDMMYYYYHHMMSS(createdAt)}
              </strong>
            </div>
          </div>
          {openItems.includes(id) && (
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-y-2 gap-x-6 text-gray-700 text-base text-left p-4 bg-gray-200">
              {before && (
                <div className="flex flex-col gap-2 flex-1 md:max-w-[50%]">
                  <Card card={before} readOnly />
                </div>
              )}
              {after && (
                <div className="flex flex-col gap-2 flex-1 md:max-w-[50%]">
                  <Card card={after} readOnly />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AuditList;
