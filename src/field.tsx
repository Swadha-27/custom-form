import { ReactElement, useContext } from "react";
import { FormContext } from "./form";

interface fieldProps {
  /**
   * @description - key for the value in form
   */
  id: string;
  /**
   * @description - Array of validators for validation at input change
   */
  validators: Array<Function>;
  /**
   * @description - input type value
   */
  type: "text" | "email";
  /**
   * @description - width of input component, 100% by default
   */
  width: string;
  /**
   *
   * @description - Renders any custom component
   * @param params - object of value and onChange
   * @returns - React element
   */
  render?: (params: any) => ReactElement;
}

const Field = (props: fieldProps) => {
  const { id, validators, type, width, render } = props;
  const formProvider: any = useContext(FormContext);
  const dispatchValue = (value: any) => {
    formProvider.dispatch({ key: id, value, type: "value" });
  };

  const dispatchError = (value: any) => {
    let error;

    for (let index = 0; index < validators?.length; ++index) {
      if (error) break;
      error = validators[index](value);
    }
    formProvider.dispatch({ key: id, error, type: "error" });
  };

  const onChange = (e: any) => {
    const value = e.target.value;
    dispatchError(value);
    dispatchValue(value);
  };

  const onFocus = (e: any) => {
    const value = formProvider.state.values[id];
    dispatchError(value);
  };
  return (
    <div style={{ width: width }}>
      {render ? (
        render({ value: formProvider.state.values[id], onChange: onChange })
      ) : (
        <>
          <input
            type={type}
            value={formProvider.state.values[id]}
            onChange={onChange}
            onFocus={onFocus}
            style={
              formProvider.state.errors[id]
                ? { border: "3px solid red", minWidth: "100%" }
                : { minWidth: "100%" }
            }
          />
          {formProvider.state.errors[id] && (
            <span style={{ color: "red", fontSize: "12px", minWidth: "100%" }}>
              {formProvider.state.errors[id]}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Field;
