import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';

export default class AdressListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { adresses: [] };
    }
    componentDidMount() {
        axios.get("https://localhost:5001/api/adress")
            .then(response => {
                this.setState({ adresses: response.data });
            })
    }
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">direction</th>
                            <th scope="col">province</th>
                            <th scope="col">district</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.adresses.map(adress => {
                            return (
                                <tr key={adress.addressId}>
                                    <td scope="row">{adress.addressId}</td>
                                    <td>{adress.direction}</td>
                                    <td>{adress.province}</td>
                                    <td>{adress.district}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}