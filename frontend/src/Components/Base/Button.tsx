import "./button.css";

/**Button Interface based on HTML button element*/
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** Button Conponent with default action-[button] type
 * * MUST-HAVE prop : @param [ReactNode] children
 */
const Button: React.FC<IButton> = ({ ...props }) => {
  return (
    <div className="btn">
      <button className="btn" type="button" {...props}>
        {props.children || "No children"}
      </button>
    </div>
  );
};

export default Button;
