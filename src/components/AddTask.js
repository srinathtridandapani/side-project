import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: '', description: ''};
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    // Save Task and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var newTask = {status: this.state.status, description: this.state.description};
        this.props.addTask(newTask);
        this.refs.addDialog.hide();
    }

// Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref="addDialog">
                    <h3>New Task</h3>
                    <form>

                        <TextField label="Status" placeholder="Status"
                                   name="status" onChange={this.handleChange}/><br/>
                        <TextField label="Description" placeholder="Description"
                                   name="description" onChange={this.handleChange}/><br/>

                        <Button variant="outlined" color="primary"
                                onClick={this.handleSubmit}>Save</Button>
                        <Button variant="outlined" color="secondary"
                                onClick={this.cancelSubmit}>Cancel</Button>
                    </form>
                </SkyLight>
                <div>
                    <Button variant="raised" color="primary"
                            style={{'margin': '10px'}}
                            onClick={() => this.refs.addDialog.show()}>
                        New Task</Button>
                </div>
            </div>
        );
    }
}

export default AddTask;