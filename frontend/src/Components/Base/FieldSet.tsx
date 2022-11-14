import { useMemo, useState } from "react";
import "./fieldset.css";

const fieldset = "fieldset";
const item = fieldset + "_item";

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
  type?: "radio" | "checkbox";
  keyword?: string;
  listName?: string;
  listData?: { label: string; value: string | number }[];
  defaultValue?: string | number;
}

const Fieldset: React.FC<IFieldset> = ({ ...props }) => {
  return (
    <fieldset className={fieldset} {...props}>
      <legend className={fieldset} title={props.listName}>
        {props.listName}
      </legend>
      {props.listData?.map(({ label, value }) => (
        <div className={item} key={label}>
          <input
            className={item}
            id={label}
            type={props.type}
            name={props.keyword}
            value={value}
            defaultChecked={value === props.defaultValue}
          />
          <label className={item} htmlFor={label}>
            {label}
          </label>
        </div>
      ))}
      {props.children ? props.children : null}
    </fieldset>
  );
};

export default Fieldset;
