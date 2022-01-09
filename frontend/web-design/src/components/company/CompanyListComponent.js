import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';

export default class CompanyListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { companies: [] };
    }
    componentDidMount() {
        axios.get("https://localhost:5001/api/Company")
            .then(response => {
                this.setState({ companies: response.data });
            })
    }
    deleteCompany(evt) {
        const targetCompanyId = evt.target.parentElement.firstChild.textContent
        axios.delete("https://localhost:5001/api/Company/" + targetCompanyId)
            .then(response => {
                this.setState({
                    companies : this.state.companies
                    .filter(company => company.companyId != targetCompanyId)
                })
            })
    }
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.companies.map(company => {
                            return (
                                <tr key={company.companyId}>
                                    <th scope="row">{company.companyId}</th>
                                    <td>{company.name}</td>
                                    <td>{company.description}</td>
                                    <td><Link to={{ pathname: "/CompanyDetail/" + company.companyId }}>Details</Link></td>
                                    <td onClick={this.deleteCompany.bind(this)} value="2">Delete</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to="/createCompany" className="mx-auto">
                    <Button variant="secondary">Create company</Button>
                </Link>
            </div>
        )
    }
}