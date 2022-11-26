import { useMemo } from "react";
import "./navDepth.css";

interface INavDepth extends React.HTMLAttributes<HTMLElement> {}

const NavDepth: React.FC<INavDepth> = ({ ...props }) => {
  const endPath = window.location.pathname.replaceAll(/\//g, " ").trim();
  const stacks = useMemo(() => endPath.split(" "), [endPath]);
  const links = endPath.split(" ").reduce<string[]>(
    (previous, current, index) => {
      const depth = `${previous[index]}/${current}`;
      previous.push(depth);
      return previous;
    },
    [""]
  );

  //class
  const className = ["navdepth", props.className].join(" ");

  return (
    <section className={className}>
      <nav className={className}>
        <ol className={className}>
          {stacks.map((stack, index) => (
            <li key={stack + index} className={className}>
              <a href={`/${links[index]}`}>{stack}</a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
};

export default NavDepth;
