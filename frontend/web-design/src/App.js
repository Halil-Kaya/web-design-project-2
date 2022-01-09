import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import CompanyListComponent from './components/company/CompanyListComponent';
import CreateCompanyForm from './components/company/CreateCompanyComponent';
import NavbarComponent from './components/navbar/NavbarComponent';
import CompanyDetailFunction from './components/company/CompanyDetailFunction';
import CreateAdressForm from './components/adress/CreateAdressForm';
import AdressListComponent from './components/adress/AdressListComponent';
import CreateEmployeeForm from './components/employe/CreateEmployeeForm';
import EmployeeDetailFunction from './components/employe/EmployeeDetail';
import CreateDocumentForm from './components/document/CreateDocumentDorm';

function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompanyListComponent />} />
          <Route path="CompanyDetail/:id" element={<CompanyDetailFunction />} />
          <Route path="createCompany" element={<CreateCompanyForm />} />
          <Route path="createAdress" element={<CreateAdressForm />} />
          <Route path="createEmployee/:id" element={<CreateEmployeeForm />} />
          <Route path="employeDetail/:id" element={<EmployeeDetailFunction />} />
          <Route path="adresses" element={<AdressListComponent />} />
          <Route path="createDocument/:id" element={<CreateDocumentForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
