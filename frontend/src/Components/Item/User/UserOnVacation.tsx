import { useState, useEffect } from "react";
import { classCombine } from "../../../Util/cssClass";
import "./user.css";
import UserItem from "./UserItem";

const UsersOnVaction = () => {
  //State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<Page[]>();

  //CSS class
  const className = classCombine("user_on_vacation");

  const getDatabase = async () => {
    const response = await fetch(
      `http://localhost:5000/api/database?id=7c44f37100c04f629a058a209560828a`
    );
    const data = await response.json();
    const { results } = data;
    setPages(results);
  };

  useEffect(() => {
    getDatabase().then(() => setIsLoading(false));
  }, []);

  return !isLoading && pages ? (
    <ul className={className}>
      {pages.map((page) => (
        <UserItem key={page.id} page={page} />
      ))}
    </ul>
  ) : null;
};

export default UsersOnVaction;
