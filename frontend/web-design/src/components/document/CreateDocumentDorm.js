import axios from 'axios';
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import {
    Link,
    useParams
} from "react-router-dom";
import AdressListComponent from '../adress/AdressListComponent';

export default function CreateDocumentForm() {
    const { id } = useParams()
    const values = {
        title: "",
        AddressId: "",
        content: "",
        EmployeeId: id
    }
    const adressIds = []
    const handleChange = (evt) => {
        let { name, value } = evt.target;
        values[name] = value
    }
    const createDocument = (evt) => {
        let isThereEmptyProp = false
        for (const [key, value] of Object.entries(values)) {
            if (!value) {
                isThereEmptyProp = true
            }else if(key == "AddressId" && !adressIds.includes(value)){
                isThereEmptyProp = true
            }
        }
        if (isThereEmptyProp) {
            alert("Geçersiz Değer")
        } else {
            axios("https://localhost:5001/api/document",
                {
                    method: "POST", headers: { "Context-type": "application/json" },
                    data: values
                })
                .then(response => alert("islem basarili"))
                .catch(error => {
                    console.log(error);
                    alert(error)
                    throw error;
                });
        }
    }
    axios.get("https://localhost:5001/api/adress")
        .then(response => {
            adressIds.push(...response.data.map(r => r.addressId.toString()))
        })
    return (
        <div>
            <p>
                <input type="text" name="title" placeholder="title"
                    onChange={handleChange}>
                </input>
            </p>
            <p>
                <input type="text" name="content" placeholder="content"
                    onChange={handleChange}>
                </input>
            </p>
            <p>
                <input type="number" name="AddressId" placeholder="Adress"
                    onChange={handleChange}>
                </input>
            </p>
            <AdressListComponent/>
            <p>
                <Button onClick={createDocument} variant="secondary">Create Document</Button>
            </p>
            <p>
                <Link to={{ pathname: "/employeDetail/" + id }}>
                    <Button variant="secondary">Turn back</Button>
                </Link>
            </p>
        </div>
    )
}