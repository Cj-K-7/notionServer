import "./toggle.css";

/**Toggle input Interface*/
interface IToggle extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

/**Input Toggle[checkbox] type with label
 * * MUST-HAVE props : @param [string] id
 */
const Toggle: React.FC<IToggle> = ({ ...props }) => {
  //class
  const className = ["toggle", props.className].join(" ");

  return (
    <div className={className} title={props.title}>
      <label
        className={className + (props.checked ? " checked" : "")}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input {...props} className={className} type="checkbox" />
    </div>
  );
};

export default Toggle;
