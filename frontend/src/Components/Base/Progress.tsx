import "./progress.css";

/**Progress Interface HTML progress Elements with label */
interface IProgress extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  label?: string;
}

/** Progressbar with label
 * * MUST-HAVE props : @param [string] id
 */
const Progress: React.FC<IProgress> = ({ ...props }) => {
  //class
  const className = ["progress", props.className].join(" ");

  return (
    <div className={className}>
      <label className={className} htmlFor={props.id}>
        {props.label}
      </label>
      <progress className={className} {...props}>
        {props.value}
      </progress>
    </div>
  );
};

export default Progress;
