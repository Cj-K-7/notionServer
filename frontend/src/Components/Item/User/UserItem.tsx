import { useState } from "react";
import "./user.css";

interface IUser extends React.LiHTMLAttributes<HTMLLIElement> {
  page: Page;
}

const UserItem: React.FC<IUser> = ({ page, ...props }) => {
  //State
  const [isFocused, setIsFocused] = useState<boolean>(false);

  //Props
  const { properties } = page;
  const { Assign, 기간, 범주 } = properties as CalenderPageProps;

  //Fuctions
  const getIntlDate = (date: string | null) =>
    date
      ? new Intl.DateTimeFormat(navigator.language, {
          dateStyle: "short",
        }).format(new Date(date))
      : null;
  const start = getIntlDate(기간.date.start);
  const end = getIntlDate(기간.date.end);

  //Listener Handlers
  const onMouseEnter = () => {
    setIsFocused(true);
  };
  const onMouseLeave = () => {
    setIsFocused(false);
  };

  return (
    <li {...props}>
      {" "}
      {Assign.people.map(({ id, name, person, avatar_url }, index) => {
        const mailto = `mailto:${person.email}`;
        const type = 범주.multi_select[index].name;

        return (
          <a key={id} href={mailto}>
            <img
              src={avatar_url}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
            {isFocused ? (
              <>
                <p>{name}</p>
                <p>{type}</p>
                <p>{start}</p>
                {end ? <p> ~ {end}</p> : null}
              </>
            ) : null}
          </a>
        );
      })}
    </li>
  );
};

export default UserItem;
