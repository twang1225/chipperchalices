import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import {Dialog} from 'material-ui';
import {RaisedButton, FlatButton} from 'material-ui';
import {MenuItem, DropDownMenu} from 'material-ui';
import {DatePicker, TimePicker} from 'material-ui';


class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      company: '',
      date: moment().toDate(),
      status: '',
      notes: '',
      url: '',
      value: 0,
      change: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.saveJob = this.saveJob.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleURL = this.handleURL.bind(this);
  }

  //TO DO: Refactor State into Singular Object
  componentDidMount() {
    let dat = this.props.job;
    this.setState({
      id: dat.id,
      title: dat.position,
      company: dat.company.name,
      company_id: dat.company.id,
      date: moment(dat.date).toDate(),
      status: dat.currentStatus,
      notes: dat.notes,
      url: dat.applicationUrl,
      value: 0
    });
  }

  //Move to Action/Reducer in Redux
  //TO DO: refactor into less functions

  handleClick () {
    this.setState({
      open: !this.state.open
    });
  }

  handleTitle (e) {
    this.setState({
      change: true,
      title: e.target.value
    });
  }

  handleCompany (e) {
    this.setState({
      change: true,
      company: e.target.value
    });
  }

  handleNotes (e) {
    this.setState({
      change: true,
      notes: e.target.value
    });
  }

  handleURL (e) {
    this.setState({
      change: true,
      url: e.target.value
    });
  }

  handleStatus (event, index, value) {
    this.setState({
      change: true,
      status: event.target.textContent,
      value: value,
    });
  }

  handleDate (e, date) {
    this.setState({
      change: true,
      date: moment(date).toDate()
    });
  }

  saveJob () {
    //If change then saveJob
    if (!this.state.change) {
      return 'No Changes';
    }
    //Is an action instead of a CB
    var form = this;
    // Add more to object later
    var content = {
      id: this.state.id,
      job: {
        title: this.state.title,
        company: this.state.company,
        notes: this.state.notes,
        url: this.state.url
      },
      status: {
        date: this.state.date,
        status: this.state.status
      }
    };

    return axios.put('/card/update', content)
      .then(function(response) {
        form.setState({
          open: false,
        });
        console.log('sent to server');
      })
      .catch(function(error) {
        form.setState({
          open: false,
        });
        console.log('error', error);
      });
  }

  render() {
    const actions = [
      <FlatButton
        label="Update"
        //primary={true}
        //keyboardFocused={true}
        onClick={this.saveJob}
      />,
      <FlatButton
        label="Cancel"
        //primary={true}
        //keyboardFocused={true}
        onClick={this.handleClick}
      />
    ];

    const style = {
      margin: 1,
      width: '10%',
      height: '80%'
    };

    const values = ['Interested', 'Applied', 'Interview Scheduled', 'Interviewed', 'No response', 'Rejected', 'Offer made', 'Archived'];
    const items = values.map(function(val, i) { return <MenuItem value={i} key={i} primaryText = {val} />; });
    return (
      <div>
        <FlatButton style={style} labelStyle={{fontSize: '9px'}} label='Edit' onClick={this.handleClick}/>
        <Dialog
          title="Edit Form"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClick}
        >
          <TextField onChange={this.handleTitle} defaultValue={this.state.title} errorText="This field is required"/><br/>
          <TextField onChange={this.handleCompany} defaultValue={this.state.company} errorText="This field is required"/><br/>
          <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleStatus}>
            {items}
          </DropDownMenu><br/>
          <DatePicker onChange={this.handleDate} value={this.state.date}/><br/>
          <TextField onChange={this.handleURL} defaultValue={this.state.url}/><br/>
          <TextField onChange={this.handleNotes}
            defaultValue={this.state.notes}
            multiLine={this.state.notes === 'null' ? true : false}
            rows={1} rowsMax={10}
            hintText={'Notes'}/><br/>
        </Dialog>
      </div>
    );
  }
}

// function mapDispatchToProps () {

//}

// function mapStateToProps () {

// }

export default EditForm;