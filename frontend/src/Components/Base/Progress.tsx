import "./progress.css";

const progress = "progress" as const;

/**Progress Interface HTML progress Elements with label */
interface IProgress extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  label?: string;
}

/** Progressbar with label
 * * MUST-HAVE props : @param [string] id
 */
const Progress: React.FC<IProgress> = ({ ...props }) => {
  return (
    <div className={progress + "container"}>
      <label className={progress} htmlFor={props.id}>
        {props.label}
      </label>
      <progress className={progress} {...props}>
        {props.value}
      </progress>
    </div>
  );
};

export default Progress;
