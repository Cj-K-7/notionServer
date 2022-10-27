import "./interactions.css";
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<IButton> = ({ ...props }) => {
  return (
    <div className="btn">
      <button className="btn" type="button" {...props}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
