import { useEffect, useState } from "react";
import { classCombine } from "../../Util/cssClass";
import "./main.css";

interface IMain extends React.HTMLAttributes<HTMLDivElement> {}

const Main: React.FC<IMain> = ({ ...props }) => {
  //State
  const [pages, setPages] = useState<Page[]>([]);
  //CSS Class
  const className = classCombine("main", props.className);

  const getDatabase = async () => {
    const response = await fetch(
      `http://localhost:5000/api/database?id=7c44f37100c04f629a058a209560828a`
    );
    const data = await response.json();
    const { results } = data;
    console.log(results);
    setPages(results);
  };

  const mappingPage = (page: Page) => {
    const { id, properties } = page;
    const { Assign, 기간, 범주 } = properties as CalenderPageProps;
    return (
      <li key={id}>
        {Assign.people.map(({ id, name, person, avatar_url }, index) => {
          const mailto = `mailto:${person.email}`;
          const vacationType = 범주.multi_select[index].name;
          const vacationEnd = 기간.date.end;
          return (
            <a key={id} href={mailto}>
              <img src={avatar_url} />
              <p>{name}</p>
              <p>{vacationType}</p>
              <p>{vacationEnd}</p>
            </a>
          );
        })}
      </li>
    );
  };

  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <div className={className}>
      <ul className={className}>{pages.map(mappingPage)}</ul>
    </div>
  );
};

export default Main;
