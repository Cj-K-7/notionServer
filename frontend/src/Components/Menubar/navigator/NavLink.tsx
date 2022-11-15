import { useState } from "react";
import "./navLink.css";

interface INavLink extends React.HTMLAttributes<HTMLElement> {
  links: string[];
}

const NavLink: React.FC<INavLink> = ({ ...props }) => {
  const [links, setLinks] = useState<string[]>([]);
  //class
  const className = ["nav-link", props.className].join(" ");
  return (
    <section className={className}>
      <nav className={className}>
        <ol className={className}>
          {links.map((stack) => (
            <li className={className}>
              <a href={`${stack}`}>{stack}</a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default NavLink;
