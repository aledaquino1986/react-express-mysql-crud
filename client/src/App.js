import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState([]);
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState([]);
  const [position, setPosition] = useState([]);
  const [wage, setWage] = useState(0);

  const addEmployee = () => {
    fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({ name, age, country, position, wage }),
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      console.log("success");
      setEmployees([
        ...employees,
        {
          name,
          age,
          country,
          position,
          wage
        }
      ]);
    });
  };

  useEffect(() => {
    fetch("/api/customers")
      .then(response => {
        return response.json();
      })
      .then(customers => {
        setCustomers(customers);
      })
      .catch(error => {
        console.log(error);
      });

    fetch("/api/employees")
      .then(response => {
        return response.json();
      })
      .then(employees => {
        console.log(employees[0]);
        setEmployees(employees);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>Customers</h1>

      {customers.map(customer => {
        return (
          <div key={customer.id}>
            <h3>
              {customer.name} {customer.lastName}
            </h3>
          </div>
        );
      })}

      <div className="employees">
        <h3>Employees</h3>
        {employees.map(employees => {
          return (
            <div>
              {employees.name} {employees.age}
            </div>
          );
        })}
      </div>

      <div>
        <h2>Sending info to the database</h2>

        <div className="information">
          <label htmlFor="name">Name:</label>
          <input type="text" onChange={e => setName(e.target.value)} />
          <label htmlFor="Age">Age:</label>
          <input type="number" onChange={e => setAge(e.target.value)} />
          <label htmlFor="country">Country</label>
          <input type="text" onChange={e => setCountry(e.target.value)} />
          <label htmlFor="position">Position</label>
          <input type="text" onChange={e => setPosition(e.target.value)} />
          <label htmlFor="wage">Wage(year)</label>
          <input type="number" onChange={e => setWage(e.target.value)} />
          <button onClick={addEmployee}>Send info to the database</button>
        </div>
      </div>
    </div>
  );
}

export default App;
