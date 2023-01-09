import { useState, useEffect } from "react";

const mappingUserData = (page: Page) => {
  const { id, properties } = page;
  const { Assign, 기간, 범주 } = properties as CalenderPageProps;
  return (
    <li key={id}>
      {Assign.people.map(({ id, name, person, avatar_url }, index) => {
        const mailto = `mailto:${person.email}`;
        const type = 범주.multi_select[index].name;
        const duration = 기간.date;
        return (
          <a key={id} href={mailto}>
            <img src={avatar_url} />
            <p>{name}</p>
            <p>{type}</p>
            <p>{duration.start}</p>
            <p>{duration.end}</p>
          </a>
        );
      })}
    </li>
  );
};

const UsersOnVaction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<Page[]>();

  //CSS class

  const getDatabase = async () => {
    const response = await fetch(
      `http://localhost:5000/api/database?id=7c44f37100c04f629a058a209560828a`
    );
    const data = await response.json();
    const { results } = data;
    console.log(results);
    setPages(results);
  };

  useEffect(() => {
    getDatabase().then(() => setIsLoading(false));
  }, []);

  return !isLoading && pages ? (
    <ul className="user_on_vacation">{pages.map(mappingUserData)}</ul>
  ) : null;
};

export default UsersOnVaction;
