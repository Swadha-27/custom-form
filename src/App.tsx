import "./App.css";
import Form from "./form";
import PersonForm from "./personalForm";

function App() {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <PersonForm />
      </Form>
    </div>
  );
}

export default App;
