import { ReactElement, createContext, useReducer } from "react";

interface formProps {
  /**
   * Children consists of components inside of form,
   * may contain JSX or normal input components
   */
  children: ReactElement;
  /**
   *
   * @param values - Form values based on form structure
   * @param state - Contains form state with all fields status
   * @param e - Submit event
   */
  onSubmit: (values: any, state: any, e: any) => void;
}
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "value":
      return {
        ...state,
        values: { ...state.values, [action.key]: action.value },
      };
    case "error":
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.error },
      };
    default:
      return {
        ...state,
        values: { ...state.values, [action.key]: action.value },
        errors: { ...state.errors, [action.key]: action.error },
      };
  }
};

const initialState = {
  values: {},
  errors: {},
};

const Form = (props: formProps) => {
  const { children, onSubmit } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (Object.values(state.errors).some(Boolean)) {
          return;
        }
        onSubmit(state.values, state, e);
      }}
    >
      <FormContext.Provider value={{ state, dispatch }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};
export const FormContext = createContext({});

export default Form;
