import { useState, useEffect } from "react";
import "./user.css";
import UserItem from "./UserItem";

interface IUser extends React.HTMLAttributes<HTMLUListElement> {
  title?: string;
}

const UserList: React.FC<IUser> = ({ title, ...props }) => {
  //State
  const [isLoading, setIsLoading] = useState(true);

  return <ul {...props}></ul>;
};

export default UserList;
