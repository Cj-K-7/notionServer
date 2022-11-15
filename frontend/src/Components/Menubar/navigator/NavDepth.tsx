import { useMemo } from "react";
import "./navDepth.css";

interface INavDepth extends React.HTMLAttributes<HTMLElement> {
  stacks: string[];
}

const NavDepth: React.FC<INavDepth> = ({ ...props }) => {
  const paths = window.location.pathname.replaceAll(/\//g, " ").trim();
  const stacks = useMemo(() => paths.split(" "), [paths]);
  //class
  const className = ["nav-depth", props.className].join(" ");
  return (
    <section className={className}>
      <nav className={className}>
        <ol className={className}>
          {stacks.map((stack) => (
            <li className={className}>
              <a href={`${stack}`}>{stack}</a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default NavDepth;