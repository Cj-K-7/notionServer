import "./form.css";

interface IForm extends React.ComponentPropsWithRef<"form"> {}

const Form: React.FC<IForm> = ({ ref, children, ...props }) => {
  return (
    <form ref={ref} {...props}>
      {children}
    </form>
  );
};

export default Form;
