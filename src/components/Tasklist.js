import React, { Component } from 'react';
import {SERVER_URL} from "../constants";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddTask from './AddTask.js';
import {CSVLink} from 'react-csv';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

class Tasklist extends Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [], open: false, message: ''};
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/tasks',
            {
                headers: {'Authorization': token}
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    tasks: responseData._embedded.tasks,
                });
            })
            .catch(err => console.error(err));
    }

    // Delete car
    onDelClick = (link) => {
        const token = sessionStorage.getItem("jwt");
        fetch(link,
            {method: 'DELETE',
            headers: {'Authorization': token}})
            .then(res => {
                this.setState({open: true, message: 'Task deleted'});
                this.fetchTasks();
            })
            .catch(err => {
                this.setState({open: true, message: 'Error when deleting'});
                console.error(err)
            })
    }

    confirmDelete = (link) => {
        confirmAlert({
            message: 'Are you sure to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onDelClick(link)
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    // Add new car
    addTask(task) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/tasks',
            { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(task)
            })
            .then(res => this.fetchTasks())
            .catch(err => console.error(err))
    }

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.tasks];
                    data[cellInfo.index][cellInfo.column.id] =
                        e.target.innerHTML;
                    this.setState({ tasks: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.tasks[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    handleClose = (event, reason) => {
        this.setState({ open: false });
    };

    // Update car
    updateTask(task, link) {
        const token = sessionStorage.getItem("jwt");
        fetch(link,
            { method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(task)
            })
            .then( res =>
                this.setState({open: true, message: 'Changes saved'})
            )
            .catch( err =>
                this.setState({open: true, message: 'Error when saving'})
            )
    }

    render() {
        const columns = [{
            Header: 'Status',
            accessor: 'status',
            Cell: this.renderEditable
        }, {
            Header: 'Description',
            accessor: 'description',
            Cell: this.renderEditable
        }, {
            id: 'savebutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value, row}) =>
                (<Button size="small" variant="flat" color="primary"
                          onClick={()=>{this.updateTask(row, value)}}>Save</Button>)
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value}) => (<Button size="small" variant="flat" color="secondary"
                                        onClick={()=>{this.confirmDelete(value)}}>Delete</Button>)
        }]

        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddTask addTask={this.addTask} fetchTasks={this.fetchTasks}/>
                    </Grid>
                    <Grid item style={{padding: 20}}>
                        <CSVLink data={this.state.tasks} separator=";">Export CSV</CSVLink>
                    </Grid>
                </Grid>

                <ReactTable data={this.state.tasks} columns={columns}
                            filterable={true}/>
                <Snackbar
                    style = {{width: 300, color: 'green'}}
                    open={this.state.open} onClose={this.handleClose}
                    autoHideDuration={1500} message={this.state.message} />
            </div>
        );
    }
}

export default Tasklist;
