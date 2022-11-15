import "./form.css";

/**Form interface with reference*/
interface IForm extends React.ComponentPropsWithRef<"form"> {}

const Form: React.FC<IForm> = ({ ref, children, ...props }) => {
  return (
    <form ref={ref} {...props}>
      {children}
    </form>
  );
};

export default Form;
