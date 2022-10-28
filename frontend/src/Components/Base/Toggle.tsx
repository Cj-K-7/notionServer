import "./interactions.css";
import { useState } from "react";

//fixed Variables
const toggle = "toggle" as const;

//Interface
interface IToggle extends React.InputHTMLAttributes<HTMLInputElement> {}

/**Must-HAVEe props :
 * @param [string] id
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
