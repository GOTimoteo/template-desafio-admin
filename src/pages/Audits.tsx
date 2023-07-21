import { fetchAnalysts } from "actions/analystAction";
import { fetchAudits } from "actions/auditAction";
import AuditList from "components/AuditList";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";

const Audits = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAudits());
    dispatch(fetchAnalysts());
  }, [dispatch]);

  const audits = useAppSelector((state) => state.audits.audits);
  const auditsStatus = useAppSelector((state) => state.audits.status);

  return (
    <div>
      <h1 className="text-2xl text-gray-700 mb-4">Auditorias</h1>
      {auditsStatus === "loading" ? "LOADING" : <AuditList audits={audits} />}
    </div>
  );
};

export default Audits;
