import ErrorUtils from "./errorUtils";
import Field from "./field";
import Observer from "./observer";

interface componentProps {
  value: any;
  onChange: any;
}

const PersonForm = () => {
  const customComponent = (props: componentProps) => {
    const { value, onChange } = props;
    return (
      <select value={value} onChange={onChange}>
        <option>Male</option>
        <option>Female</option>
      </select>
    );
  };
  return (
    <>
      <Field
        id="firstName"
        type="text"
        validators={[ErrorUtils.required("First Name is Required")]}
        width="200px"
      />
      <Field
        id="lastName"
        type="text"
        width="200px"
        validators={[ErrorUtils.required("Last Name is Required")]}
      />
      <Field
        id="gender"
        type="text"
        width="200px"
        validators={[ErrorUtils.required("Last Name is Required")]}
        render={customComponent}
      />
      <Observer properties={["values"]}>
        {(formProps: any) => {
          console.log("values", formProps.values);
        }}
      </Observer>
      <button type="submit">Submit</button>
    </>
  );
};

export default PersonForm;
