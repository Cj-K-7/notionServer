import "./button.css";

const button = "button" as const;

/**Button Interface*/
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** Button Conponent with default action-[button] type
 * * MUST-HAVE prop : @param [ReactNode] children
 */
const Button: React.FC<IButton> = ({ ...props }) => {
  return (
    <div className={button + " container"}>
      <button className={button} type="button" {...props}>
        {props.children || props.title}
      </button>
    </div>
  );
};

export default Button;
