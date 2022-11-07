import { useState } from "react";
import "./menubar.css";

interface IMenubar extends React.HTMLAttributes<HTMLElement> {}

const Menubar: React.FC<IMenubar> = ({ ...props }) => {
  const [stacks, setStacks] = useState<string[]>([]);

  return (
    <header {...props} className="menubar">
      <section className="">
        <nav className="nav-depths">
          <ol>
            {stacks.map((stack) => (
              <li className="nav-depth">
                <a>{stack}</a>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </header>
  );
};

export default Menubar;
