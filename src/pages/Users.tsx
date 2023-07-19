import { fetchUsers } from "actions/userAction";
import UserList from "components/UserList";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useEffect } from "react";

const Users = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { users, status: usersStatus } = useAppSelector((state) => state.users);

  return (
    <div>
      <h1 className="text-2xl text-gray-700 mb-4">Usuários</h1>
      {usersStatus === "loading" ? "LOADING" : <UserList users={users} />}
    </div>
  );
};

export default Users;
