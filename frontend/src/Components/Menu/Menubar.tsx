import { useState } from "react";
import "./menubar.css";

interface IMenubar extends React.HTMLAttributes<HTMLElement> {}

const Menubar: React.FC<IMenubar> = ({ ...props }) => {
  const [stacks, setStacks] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  return (
    <header {...props} className="menubar">
      <section className="nav depths">
        <nav>
          <ol>
            {stacks.map((stack) => (
              <li className="nav depth">
                <a>{stack}</a>
              </li>
            ))}
          </ol>
        </nav>
      </section>
      <section className="nav links">
        <ul>
          {links.map((link) => (
            <li className="nav link">
              <a>{link}</a>
            </li>
          ))}
        </ul>
      </section>
    </header>
  );
};

export default Menubar;
