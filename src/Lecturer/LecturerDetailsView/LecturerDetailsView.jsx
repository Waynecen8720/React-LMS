import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Segment, Loader, Button, Confirm } from '../../framework/ui';

function createNewLecturer() {
  return {
    name: '',
    email: '',
    bibliography: '',
    staffNumber: '',
  };
}

class LecturerDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      showConfirmDelete: false,
      showSuccess: false,
      showError: false,
      lecturer: null,
    };
  }

  componentDidMount() {
    this.fetchLecturer();
  }

  fetchLecturer() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.setState({ lecturer: createNewLecturer(), isEditing: true });
      return;
    }

    this.setState({ isLoading: true, error: '' });
    const onSuccess = (response) => {
      this.setState({
        lecturer: response.data,
        isLoading: false,
      });
    };
    const onError = () => {
      this.setState({
        lecturer: null,
        showError: true,
        isLoading: false,
      });
    };
    axios.get(`/api/lecturers/${id}`).then(onSuccess).catch(onError);
  }

  handleFieldChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      lecturer: {
        ...this.state.lecturer,
        [name]: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ isSaving: true, showSuccess: false, showError: false });
    const { lecturer } = this.state;
    const onSuccess = () => {
      this.setState({ isSaving: false, showSuccess: true });
    };
    const onError = (error) => {
      this.setState({
        isSaving: false,
        showError: true,
        error: `${error.response.statusText} (${error.response.status})`,
      });
    };
    if (this.props.match.params.id === 'create') {
      axios.post('/api/lecturers', lecturer)
        .then(onSuccess)
        .catch(onError);
    } else {
      axios.put(`/api/lecturers/${lecturer.id}`, lecturer)
        .then(onSuccess)
        .catch(onError);
    }
    this.props.history.push('/lecturers');
  }

  handleCancel() {
    this.props.history.push('/lecturers');
  }

  showConfirmDelete() {
    this.setState({ showConfirmDelete: true });
  }

  closeConfirmDelete() {
    this.setState({ showConfirmDelete: false });
  }

  handleDelete() {
    this.setState({ isDeleting: true });
    this.closeConfirmDelete();
    axios.delete(`/api/lecturers/${this.state.lecturer.id}`).then(() => {
      this.setState({ isDeleting: false });
      this.closeConfirmDelete();
      this.props.history.push('/lecturers');
    }).catch((error) => {
      this.setState({
        isDeleting: false,
        showError: true,
        error: `${error.response.statusText} (${error.response.status})`,
      });
    });
  }

  render() {
    const lecturer = this.state.lecturer || createNewLecturer();

    return (
      <div>
        <Segment style={{ width: 600, margin: '0 auto' }}>
          <form className="ui form" onSubmit={this.handleSubmit.bind(this)}>
            <h4 className="ui dividing header">
              <span style={{ marginRight: 10 }}>Lecturer Details</span>
              {this.props.match.params.id !== 'create' && (
                <Button
                  danger
                  onClick={this.showConfirmDelete.bind(this)}
                  loading={this.state.isDeleting}
                >
                  Delete
                </Button>
              )}
            </h4>

            <div className="fields">
              <div className="eight wide field">
                <label>Name</label>
                <input type="text" name="name" value={lecturer.name} onChange={this.handleFieldChange.bind(this)} placeholder="Name" />
              </div>
              <div className="eight wide field">
                <label>Email</label>
                <input type="email" name="email" value={lecturer.email} onChange={this.handleFieldChange.bind(this)} placeholder="Email" />
              </div>
            </div>
            <div className="fields">
              <div className="eight wide field">
                <label>Staff number</label>
                <input type="text" name="staffNumber" value={lecturer.staffNumber} onChange={this.handleFieldChange.bind(this)} placeholder="Staff number" />
              </div>
            </div>
            <div className="field">
              <label>Bio</label>
              <textarea name="bibliography" rows="2" value={lecturer.bibliography} onChange={this.handleFieldChange.bind(this)} placeholder="Bio" />
            </div>
            <button
              className={classnames('ui teal button', { loading: this.state.isSaving })}
              type="submit"
              disabled={this.state.isSaving}
            >
              Save changes
            </button>
            <button className="ui button" type="button" onClick={this.handleCancel.bind(this)}>
              Cancel
            </button>
          </form>
          {this.state.isLoading && <Loader />}
        </Segment>
        <Confirm
          show={this.state.showConfirmDelete}
          onApprove={this.handleDelete.bind(this)}
          onClose={this.closeConfirmDelete.bind(this)}
          header="Confirm deleting lecturer"
        >
          This is action is irrevocable. Are you sure you want to continue?
        </Confirm>
      </div>
    );
  }
}

export default withRouter(LecturerDetailsView);
