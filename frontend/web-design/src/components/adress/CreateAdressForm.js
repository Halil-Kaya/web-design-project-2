import axios from 'axios';
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default class CreateAdressForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adress: {
                direction: "",
                province: "",
                district : ""
            }
        }
    }
    handleChange = (evt) => {
        let { name, value } = evt.target;
        this.setState({ adress: { ...this.state.adress, [name]: value } });
    }

    createAdress = (evt) => {
        axios("https://localhost:5001/api/adress",
            {
                method: "POST", headers: { "Context-type": "application/json" },
                data: this.state.adress
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
                    <input type="text" name="direction" placeholder="direction"
                        onChange={this.handleChange}>
                    </input>
                </p>
                <p>
                    <input type="text" name="province" placeholder="province"
                        onChange={this.handleChange}>
                    </input>
                </p>
                <p>
                    <input type="text" name="district" placeholder="district"
                        onChange={this.handleChange}>
                    </input>
                </p>
                <p>
                    <Button onClick={this.createAdress} variant="secondary">Create Adress</Button>
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