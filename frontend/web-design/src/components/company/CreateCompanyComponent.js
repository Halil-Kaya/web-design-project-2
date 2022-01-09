import axios from 'axios';
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default class CreateCompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {
                name: "",
                description: ""
            }
        }
    }
    handleChange = (evt) => {
        let { name, value } = evt.target;
        this.setState({ company: { ...this.state.company, [name]: value } });
    }

    createCompany = (evt) => {
        axios("https://localhost:5001/api/Company",
            {
                method: "POST", headers: { "Context-type": "application/json" },
                data: this.state.company
            })
            .then(response => alert("islem basarili"))
            .catch(error => {
                console.log(error);
                throw error;
            });
    }
    render() {
        return (
            <div>
                <p>
                    <input type="text" name="name" placeholder="name"
                        onChange={this.handleChange}>
                    </input>
                </p>
                <p>
                    <input type="text" name="description" placeholder="description"
                        onChange={this.handleChange}>
                    </input>
                </p>
                <p>
                    <Button onClick={this.createCompany} variant="secondary">Create company</Button>
                </p>
                <p>
                    <Link to="/" className="mx-auto">
                        <Button variant="secondary">Turn back</Button>
                    </Link>
                </p>
            </div>
        )
    }
}