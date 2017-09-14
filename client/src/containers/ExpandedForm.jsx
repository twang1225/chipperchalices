import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import {Dialog, Avatar} from 'material-ui';
import {IconButton, FontIcon} from 'material-ui';
import {DatePicker, TimePicker} from 'material-ui';
import AllOut from 'material-ui/svg-icons/action/all-out';

export default class ExpandedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      job: {
        id: 2,
        company: {
          id: 3,
          name: 'RHLA Technology',
          description: 'RHLA Technology is a leading provider of technology professionals on a project and full-time basis.',
          logoUrl: 'https://tinyurl.com/y8z3pajs',
          location: 'San Francisco, CA'
        },
        position: 'Front End Developer',
        applicationUrl: 'https://www.linkedin.com/jobs/view/430047268/',
        currentStatus: 'Interested',
        statusdate: '2017-08-22',
        notes: 'Recruiter reached out to me.',
        recruiter: 'Bob',
        recruiteremail: 'Bob@msft.com'
      },
      status: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      job: this.props.job
    });
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    //Dialog Width
    const dStyle = {
      width: '90%',
      height: '75%'
    };

    const logoStyle = {
      position: 'right',
    };

    const textStyle = {
      width: '80%',
      cursor: 'auto'
    };

    const textInputStyle = {
      cursor: 'auto',
      color: 'black'
    };

    const actions = [
      <IconButton onClick={this.handleClick}>
        <AllOut />
      </IconButton>
    ];

    return (
      <div>
        <IconButton tooltip="See More Info" onClick={this.handleClick}>
          <AllOut />
        </IconButton>
        <Dialog
          title="Expanded Info"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClick}
          contentStyle={dStyle}
          autoScrollBodyContent={true}
        >
          <Avatar style={logoStyle} size={45} src={this.state.job.company.logo_url}/><br/>
          <TextField disabled={this.state.status} inputStyle={textInputStyle} style={textStyle} floatingLabelText={'Company Name'} id={'companyName'} value={this.state.job.company.name} /><br/>
          <TextField disabled={this.state.status} inputStyle={textInputStyle} style={textStyle} floatingLabelText={'Company Location'} id={'companyLocation'} value={this.state.job.company.location} /><br/>
          <TextField disabled={this.state.status} inputStyle={textInputStyle} style={textStyle} floatingLabelText={'Job Position'} id={'position'} value={this.state.job.position} /><br/>
          <TextField disabled={this.state.status} inputStyle={textInputStyle} style={textStyle} floatingLabelText={'Position Url'} id={'positionUrl'} value={this.state.job.position_url} /><br/>
          <TextField disabled={this.state.status} inputStyle={textInputStyle} style={textStyle} multiLine={true} rows={4} floatingLabelText={'Company Description'} id={'companyDescription'} value={this.state.job.company.description} /><br/>
          <TextField disabled={this.state.status} inputStyle={textInputStyle} style={textStyle} floatingLabelText={'Status Date'} id={'date'} value={this.state.job.statusdate} /><br/>
          <TextField disabled={this.state.status} inputStyle={textInputStyle} style={textStyle} floatingLabelText={'Recruiter Name'} id={'recruiterName'} value={this.state.job.recruiterName} /><br/>
          <TextField disabled={this.state.status} inputStyle={textInputStyle} style={textStyle} floatingLabelText={'Recruiter Email'} id={'recruiterEmail'} value={this.state.job.recruiterEmail} /><br/>
          <TextField disabled={this.state.status} inputStyle={textInputStyle} style={textStyle} multiLine={true} rows={4} floatingLabelText={'Notes'} id={'notes'} value={this.state.job.notes} /><br/>
        </Dialog>
      </div>
    );
  }
}


