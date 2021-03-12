import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState([]);
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState([]);
  const [position, setPosition] = useState([]);
  const [wage, setWage] = useState(0);

  const [newCountry, setNewCountry] = useState("");

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

  const deletePerson = id => {
    fetch(`api/delete/${id}`, { method: "DELETE" }).then(response => {
      setEmployees(
        employees.filter(employee => {
          return employee.id !== id;
        })
      );
    });
  };

  const updateCountry = id => {
    fetch("/api/update", {
      method: "PUT",
      body: JSON.stringify({ country: newCountry, id: id }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setEmployees(
          employees.map(value => {
            return value.id === id
              ? {
                  id: value.id,
                  name: value.name,
                  country: newCountry,
                  age: value.age,
                  position: value.position,
                  wage: value.wage
                }
              : value;
          })
        );

        setNewCountry("");
      })
      .catch(err => console.log(err));
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
        {employees.map(value => {
          return (
            <div
              style={{
                border: "2px solid red",

                width: "75%",
                margin: "15px auto"
              }}
              key={value.id}
            >
              <div>
                {" "}
                <strong>Name: </strong> {value.name} ({value.age})
              </div>
              <br />
              <div>
                {" "}
                <strong>Country: </strong> {value.country}
                <div>
                  <input
                    type="text"
                    placeholder={value.country}
                    onChange={e => setNewCountry(e.target.value)}
                  />
                  <button onClick={id => updateCountry(value.id)}>
                    Update Country
                  </button>
                </div>
              </div>
              <br />
              <div>
                {" "}
                <strong>Position: </strong> {value.position}
              </div>

              <br />
              <button onClick={() => deletePerson(value.id)}>
                Delete Person
              </button>
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
