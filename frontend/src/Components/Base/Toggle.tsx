import "./toggle.css";
import { useState } from "react";

//fixed Variables
const toggle = "toggle" as const;

/**Toggle input Interface based on HTML input element*/
interface IToggle extends React.InputHTMLAttributes<HTMLInputElement> {}

/**Input Toggle[checkbox] type with label
 * * MUST-HAVE props : @param [string] id
 */
const Toggle: React.FC<IToggle> = ({ ...props }) => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className={toggle}>
      <label
        className={toggle + (checked ? " checked" : "")}
        htmlFor={props.id}
      >
        {props.title}
      </label>
      <input
        className={toggle}
        type="checkbox"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        {...props}
      />
    </div>
  );
};

export default Toggle;
