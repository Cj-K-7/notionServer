import "./interactions.css";
const toggle = "toggle" as const;

interface IToggle extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

const Toggle: React.FC<IToggle> = ({ ...props }) => {
  return (
    <div className={toggle}>
      <label
        className={toggle + (props.checked ? " checked" : "")}
        htmlFor={props.title}
      >
        {props.title}
      </label>
      <input id={props.title} className={toggle} type="checkbox" {...props} />
    </div>
  );
};

export default Toggle;
