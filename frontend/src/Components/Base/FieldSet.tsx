import "./fieldset.css";

/**Fieldset-legend Interface
 * @props keyword : Formdata key name
 * @props listName : legend title
 * @props listData :
 * {
 * * key : for label & id match,
 * * value : Formdata value
 *
 * }
 */
interface IFieldset extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  type: "radio" | "checkbox";
  keyword: string;
  listName?: string;
  listData?: { label: string; value: string | number }[];
  defaultValue?: string | number;
}

const Fieldset: React.FC<IFieldset> = ({ ...props }) => {
  //class
  const fieldClass = ["fieldset", props.className].join(" ");
  const itemClass = ["fieldset", "item", props.className].join(" ");

  return (
    <fieldset className={fieldClass} {...props}>
      <legend className={fieldClass} title={props.listName}>
        {props.listName}
      </legend>
      {props.listData?.map(({ label, value }) => (
        <div className={itemClass} key={label}>
          <input
            className={itemClass}
            id={label}
            type={props.type}
            name={props.keyword}
            value={value}
            defaultChecked={value === props.defaultValue}
          />
          <label className={itemClass} htmlFor={label}>
            {label}
          </label>
        </div>
      ))}
      {props.children ? props.children : null}
    </fieldset>
  );
};

export default Fieldset;
