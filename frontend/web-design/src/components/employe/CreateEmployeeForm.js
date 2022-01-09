import axios from 'axios';
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import {
    Link,
    useParams
} from "react-router-dom";

export default function CreateEmployeeForm() {
    const { id } = useParams()
    const values = {
        FirstName: "",
        LastName: "",
        Salary: "",
        CompanyId: id
    }
    const handleChange = (evt) => {
        let { name, value } = evt.target;
        values[name] = value
    }
    const createEmployee = (evt) => {
        let isThereEmptyProp = false
        for (const [key, value] of Object.entries(values)) {
            if (!value) {
                isThereEmptyProp = true
            }
        }
        if (isThereEmptyProp) {
            alert("Geçersiz Değer")
        } else {
            axios("https://localhost:5001/api/employee",
                {
                    method: "POST", headers: { "Context-type": "application/json" },
                    data: values
                })
                .catch(error => {
                    console.log(error);
                    alert(error)
                    throw error;
                });
        }
    }
    return (
        <div>
            <p>
                <input type="text" name="FirstName" placeholder="FirstName"
                    onChange={handleChange}>
                </input>
            </p>
            <p>
                <input type="text" name="LastName" placeholder="LastName"
                    onChange={handleChange}>
                </input>
            </p>
            <p>
                <input type="number" name="Salary" placeholder="Salary"
                    onChange={handleChange}>
                </input>
            </p>
            <p>
                <Button onClick={createEmployee} variant="secondary">Create Employee</Button>
            </p>
            <p>
                <Link to={{ pathname: "/CompanyDetail/" + id }}>
                    <Button variant="secondary">Turn back</Button>
                </Link>
            </p>
        </div>
    )
}