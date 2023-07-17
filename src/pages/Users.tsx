import { fetchUsers } from "actions/userAction";
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
      <h1>Users</h1>
      {usersStatus === "loading" ? (
        "LOADING"
      ) : (
        <>
          {users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default Users;
