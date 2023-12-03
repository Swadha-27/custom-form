import { useContext } from "react";
import { FormContext } from "./form";

interface observerProps {
  properties: any;
  children: any;
}
const Observer = (props: observerProps) => {
  const formProvider: any = useContext(FormContext);
  const { properties, children } = props;

  const filtered = Object.keys(formProvider.state)
    .filter((key) => properties.includes(key))
    .reduce((obj: any, key: any) => {
      obj[key] = formProvider.state[key];
      return obj;
    }, {});

  return children(filtered);
};

export default Observer;
