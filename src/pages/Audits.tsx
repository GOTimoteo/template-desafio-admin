import { fetchAudits } from "actions/auditAction";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";

const Audits = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAudits());
  }, [dispatch]);

  const audits = useAppSelector((state) => state.audits.audits);
  const auditsStatus = useAppSelector((state) => state.audits.status);

  return (
    <div>
      <h1 className="text-2xl text-gray-700 mb-4">Auditorias</h1>
      {auditsStatus === "loading" ? (
        "LOADING"
      ) : (
        <>
          {audits.map((audit) => (
            <div key={audit.id}>{audit.id}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default Audits;
