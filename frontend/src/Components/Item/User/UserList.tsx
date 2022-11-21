import { useState, useEffect } from "react";
import "./User.css";
import UserItem from "./UserItem";

interface IUser extends React.HTMLAttributes<HTMLUListElement> {
  title?: string;
}

const UserList: React.FC<IUser> = ({ title, ...props }) => {
  //State
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>();
  useEffect(() => {}, []);
  return (
    <ul {...props}>
      {users
        ? users.map((user) => <UserItem userName={user.name as string} />)
        : null}
    </ul>
  );
};

export default UserList;
