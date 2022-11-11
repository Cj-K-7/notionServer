import "./toggle.css";

const toggle = "toggle" as const;

/**Toggle input Interface*/
interface IToggle extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

/**Input Toggle[checkbox] type with label
 * * MUST-HAVE props : @param [string] id
 */
const Toggle: React.FC<IToggle> = ({ ...props }) => {
  return (
    <div className={toggle + "container"} title={props.title}>
      <label
        className={toggle + (props.checked ? " checked" : "")}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input className={toggle} type="checkbox" {...props} />
    </div>
  );
};

export default Toggle;
