import { useEffect, useState } from "react";
import "./navLink.css";

interface INavLink extends React.HTMLAttributes<HTMLElement> {}

const NavLink: React.FC<INavLink> = ({ ...props }) => {
  const [links, setLinks] = useState<Page[]>([]);
  //class
  const className = ["nav-link", props.className].join(" ");

  useEffect(() => {
    fetch("http://localhost:5000/api/listAll").then(async (response) => {
      const data = await response.json();
      const list: Page[] = data.results;
      setLinks(list);
    });
  }, []);

  return (
    <section className={className}>
      <nav className={className}>
        <ol className={className}>
          {links.map(({ id, title, url }) => (
            <li key={id} className={className}>
              <a href={url}>{title[0].plain_text}</a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default NavLink;
