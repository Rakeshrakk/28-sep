import React , {Component} from 'react';
import axios from 'axios';

class EmployeePortal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            employees : [],
            newEmployee : {
                first_name : '',
                last_name : '',
                email : '',
                gender : '',
                ip_address : ''
            },
            editEmployee : {
                first_name : '',
                last_name : '',
                email : '',
                gender : '',
                ip_address : ''
            }
        };
    }

    // life cycle method to make http calls
    componentDidMount() {
        this.getAllEmployee();
    }

    // get All Employees
    getAllEmployee = () => {
        axios.get('/api/employees/')
            .then( (response) => {
                // handle success
                this.setState({
                    employees : response.data
                });
            })
            .catch( (error)  =>{
                // handle error
                console.log(error);
            })
            .finally( () => {
                // always executed
            });
    };

    // changeNewEmployee
    changeNewEmployee = (event) => {
        // get newEmployee From State
        let newEmployee = this.state.newEmployee;

        // update the Employee
        newEmployee[event.target.name] = event.target.value;

        // update newEmployee to State
        this.setState({
            newEmployee: newEmployee
        });
    };

    // changeEditEmployee
    changeEditEmployee = (event) => {
        // get editEmployee From State
        let editEmployee = this.state.editEmployee;

        // update the Employee
        editEmployee[event.target.name] = event.target.value;

        // update editEmployee to State
        this.setState({
            editEmployee: editEmployee
        });
    };

    // createNewEmployee
    createNewEmployee = () => {
        // send the form data to server
        axios.post('/api/employees/', this.state.newEmployee)
            .then( (response) => {
                console.log(response);
            })
            .catch( (error) => {
                console.log(error);
            });
    };

    // updateEmployee
    updateEmployee = () => {
        // send the form data to server
        axios.put(`/api/employees/${this.state.editEmployee.id}`, this.state.editEmployee)
            .then( (response) => {
                console.log(response);
            })
            .catch( (error) => {
                console.log(error);
            });
    };

    // editEmployee
    editEmployee = (empId) => {
        let selectedEmployee = this.state.employees.find((employee) => {
            return employee.id === empId;
        });
        this.setState({
            editEmployee : selectedEmployee
        });
    };

    // deleteEmployee
    deleteEmployee = (empId) => {
        console.log(empId);
            axios.delete(`/api/employees/${empId}`)
            .then( (response) => {
                // handle success
                this.getAllEmployee();
            })
            .catch( (error)  =>{
                // handle error
                console.log(error);
            })
            .finally( () => {
                // always executed
            });
    };


    render() {
        let employeeList = this.state.employees.map((employee) => (
                <tr key={employee._id}>
                    <td>{employee.id}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.ip_address}</td>
                    <td>
                        <button className='btn btn-success btn-sm mt-0' data-toggle='modal' data-target='#edit-emp-modal' onClick={this.editEmployee.bind(this,employee.id)}>Edit</button>
                        <button className='btn btn-danger btn-sm mt-0' onClick={this.deleteEmployee.bind(this,employee.id)}>Delete</button>
                    </td>
                </tr>
        ));
        return (
            <div>
                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col">
                            <div className="card p-3 bg-light">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <button className='btn btn-primary' data-toggle='modal' data-target='#new-emp-modal'>New Employee</button>
                                            <h2 className='float-right'>Total Records : {this.state.employees.length}</h2>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <table className='table table-hover text-center'>
                                           <thead className='bg-dark text-white'>
                                                <tr>
                                                    <th>EMP ID</th>
                                                    <th>FIRST NAME</th>
                                                    <th>LAST NAME</th>
                                                    <th>EMAIL</th>
                                                    <th>GENDER</th>
                                                    <th>IP ADDRESS</th>
                                                    <th>ACTIONS</th>
                                                </tr>
                                           </thead>
                                            <tbody>
                                                {employeeList}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --------------- New Employee Modal --------------- */}
                <div className="modal animated slideInLeft" id='new-emp-modal'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h2>Create New Employee</h2>
                                <button className='close' data-dismiss='modal'>
                                    <i className='fa fa fa-times-circle'/>
                                </button>
                            </div>
                            <div className="modal-body bg-light-blue">
                                <form>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'first_name'
                                            value = {this.state.newEmployee.first_name}
                                            onChange={this.changeNewEmployee}
                                            placeholder='First Name'/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'last_name'
                                            value = {this.state.newEmployee.last_name}
                                            onChange={this.changeNewEmployee}
                                            placeholder='Last Name'/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'email'
                                            value = {this.state.newEmployee.email}
                                            onChange={this.changeNewEmployee}
                                            placeholder='Email'/>
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className='form-control'
                                            name = 'gender'
                                            value = {this.state.newEmployee.gender}
                                            onChange={this.changeNewEmployee}>

                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'ip_address'
                                            value = {this.state.newEmployee.ip_address}
                                            onChange={this.changeNewEmployee}
                                            placeholder='IP ADDRESS'/>
                                    </div>
                                    <button className='btn btn-primary' onClick={this.createNewEmployee}>Create Employee</button>
                                    <a href='/' className='btn btn-dark' data-dismiss='modal'>Close</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --------------- Edit Employee Modal --------------- */}
                <div className="modal animated slideInRight" id='edit-emp-modal'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h2>Edit Employee</h2>
                                <button className='close' data-dismiss='modal'>
                                    <i className='fa fa fa-times-circle'/>
                                </button>
                            </div>
                            <div className="modal-body bg-light-green">
                                <form>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'first_name'
                                            value = {this.state.editEmployee.first_name}
                                            onChange={this.changeEditEmployee}
                                            placeholder='First Name'/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Last Name'
                                            name = 'last_name'
                                            value = {this.state.editEmployee.last_name}
                                            onChange={this.changeEditEmployee}/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Email'
                                            name = 'email'
                                            value = {this.state.editEmployee.email}
                                            onChange={this.changeEditEmployee}/>
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className='form-control'
                                            name = 'gender'
                                            value = {this.state.editEmployee.gender}
                                            onChange={this.changeEditEmployee}>

                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='IP ADDRESS'
                                            name = 'ip_address'
                                            value = {this.state.editEmployee.ip_address}
                                            onChange={this.changeEditEmployee}/>
                                    </div>
                                    <button className='btn btn-success' onClick={this.updateEmployee}>Update Employee</button>
                                    <a href='/' className='btn btn-dark' data-dismiss='modal'>Close</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default EmployeePortal;