import React, { useState } from 'react'
import axios from 'axios';
import {
    Link,
    useParams
} from "react-router-dom";
import * as $$ from 'lodash';
import AdressListComponent from '../adress/AdressListComponent';
import Button from 'react-bootstrap/Button';

export default function EmployeeDetailFunction() {
    const { id } = useParams()
    const initialState = {
        employee: {
            employeeId: id,
            firstName: "",
            lastName: "",
            salary: 0,
            documents: [],
            companyId: 0
        },
        didFetchedDetail: false,
    }
    const [data, set] = useState(initialState)
    if (!data.didFetchedDetail) {
        axios.get("https://localhost:5001/api/employee/" + id)
            .then(response => {
                set({
                    ...data,
                    employee: response.data,
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
            <p>Employee employeeId : {data.employee.employeeId}</p>
            <p>Employee firstName : {data.employee.firstName}</p>
            <p>Employee lastName : {data.employee.lastName}</p>
            <p>Employee salary : {data.employee.salary}</p>
            <p>Company Id : {data.employee.companyId}</p>
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
                    {data.employee.documents.map(document => {
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
            <div className="my-2">
                <Link to={{ pathname: "/createDocument/" + data.employee.employeeId }} className="mx-auto">
                    <Button variant="secondary">Create Document</Button>
                </Link>
            </div>
            <div>
                <Link to={{ pathname: "/CompanyDetail/" + data.employee.companyId }} className="mx-auto">
                    <Button variant="secondary">Turn back</Button>
                </Link>
            </div>
        </div>
    )
}
