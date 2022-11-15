import "./button.css";

/**Button Interface*/
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** Button Conponent with default action-[button] type
 * * MUST-HAVE prop : @param [ReactNode] children
 */
const Button: React.FC<IButton> = ({ ...props }) => {
  //class
  const className = ["button", props.className].join(" ");
  return (
    <div className={className}>
      <button className={className} type="button" {...props}>
        {props.children || props.title}
      </button>
    </div>
  );
};

export default Button;
