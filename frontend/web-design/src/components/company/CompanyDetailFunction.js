import React, { useState } from 'react'
import axios from 'axios';
import {
    Link,
    useParams
} from "react-router-dom";
import * as $$ from 'lodash';
import AdressListComponent from '../adress/AdressListComponent';
import Button from 'react-bootstrap/Button';

export default function CompanyDetailFunction() {
    const { id } = useParams()
    const initialState = {
        company: {
            name: "",
            description: ""
        },
        totalDocumentsOfCompany: [],
        totalEmployeesOfCompany: [],
        didFetchedDetail: false,
    }
    const [data, set] = useState(initialState)
    if (!data.didFetchedDetail) {
        axios.get("https://localhost:5001/api/Company/" + id)
            .then(response => {
                set({
                    ...data,
                    company: response.data,
                    totalDocumentsOfCompany: $$.flattenDeep(response.data.employees.map(employe => employe.documents)),
                    totalEmployeesOfCompany: response.data.employees,
                    didFetchedDetail: true
                })
            })
    }
    const deleteEmployee = (evt) => {
        const targetEmployeeId = evt.target.parentElement.firstChild.textContent
        axios.delete("https://localhost:5001/api/employee/" + targetEmployeeId)
            .then(response => {
                set({
                    ...data,
                    totalEmployeesOfCompany: data.totalEmployeesOfCompany
                        .filter(employe => employe.employeeId != targetEmployeeId)
                })
            })
    }
    const deleteDocument = (evt) => {
        const targetDocumentId = evt.target.parentElement.firstChild.textContent
        axios.delete("https://localhost:5001/api/document/" + targetDocumentId)
            .then(response => {
                set({
                    ...data,
                    totalDocumentsOfCompany: data.totalDocumentsOfCompany
                        .filter(document => document.documentId != targetDocumentId)
                })
            })
    }
    return (
        <div>
            <p>Company name : {data.company.name}</p>
            <p>Company description : {data.company.description}</p>
            <h1>Employees</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">firstName</th>
                        <th scope="col">lastName</th>
                        <th scope="col">salary</th>
                    </tr>
                </thead>
                <tbody>
                    {data.totalEmployeesOfCompany.map(employe => {
                        return (
                            <tr key={employe.employeeId}>
                                <td scope="row">{employe.employeeId}</td>
                                <td>{employe.firstName}</td>
                                <td>{employe.lastName}</td>
                                <td>{employe.salary}</td>
                                <Link to={{ pathname: "/employeDetail/" + employe.employeeId }} className="mx-auto">
                                    <Button variant="secondary">Detail</Button>
                                </Link>
                                <td onClick={deleteEmployee} >Delete</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h1>Documents</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">title</th>
                        <th scope="col">content</th>
                        <th scope="col">isApproved</th>
                        <th scope="col">employeeId</th>
                        <th scope="col">addressId</th>
                    </tr>
                </thead>
                <tbody>
                    {data.totalDocumentsOfCompany.map(document => {
                        return (
                            <tr key={document.documentId}>
                                <td scope="row">{document.documentId}</td>
                                <td>{document.title}</td>
                                <td>{document.content}</td>
                                <td>{document.isApproved}</td>
                                <td>{document.employeeId}</td>
                                <td>{document.addressId}</td>
                                <td onClick={deleteDocument} >Delete</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h1>Addresses</h1>
            <AdressListComponent />
            <Link to="/createAdress" className="mx-auto">
                <Button variant="secondary">Create Adress</Button>
            </Link>
            <div className="my-3">
                <Link to={{ pathname: "/createEmployee/" + data.company.companyId }} className="mx-auto">
                    <Button variant="secondary">Create Employee</Button>
                </Link>
            </div>
            <div>
                <Link to="/" className="mx-auto">
                    <Button variant="secondary">Turn back</Button>
                </Link>
            </div>
        </div>
    )
}
