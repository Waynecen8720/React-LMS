import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Segment, Loader, Button, Confirm } from '../../framework/ui';

function createNewCourse() {
  return {
    title: '',
    fee: '',
    maxStudent: 10,
    description: '',
  };
}

class CourseDetailsView extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      showConfirmDelete: false,
      showSuccess: false,
      showError: false,
      course: null,
    };
  }

  componentDidMount() {
    this.fetchCourse();
  }

  fetchCourse() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.setState({ course: createNewCourse(), isEditing: true });
      return;
    }

    this.setState({ isLoading: true, error: '' });
    const onSuccess = (response) => {
      this.setState({
        course: response.data,
        isLoading: false,
      });
    };
    const onFail = () => {
      this.setState({
        course: null,
        showError: true,
        isLoading: false,
      });
    };
    axios.get(`/api/courses/${id}`).then(onSuccess).catch(onFail);
  }

  handleFieldChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      course: {
        ...this.state.course,
        [name]: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ isSaving: true, showSuccess: false, showError: false });
    const { course } = this.state;
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
      axios.post('/api/courses', course)
        .then(onSuccess)
        .catch(onError);
    } else {
      axios.put(`/api/courses/${course.id}`, course)
        .then(onSuccess)
        .catch(onError);
    }
    this.props.history.push('/courses');
  }

  handleCancel() {
    this.props.history.push('/courses');
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
    axios.delete(`/api/courses/${this.state.course.id}`).then(() => {
      this.setState({ isDeleting: false });
      this.closeConfirmDelete();
      this.props.history.push('/courses');
    }).catch((error) => {
      this.setState({
        isDeleting: false,
        showError: true,
        error: `${error.response.statusText} (${error.response.status})`,
      });
    });
  }

  render() {
    const course = this.state.course || createNewCourse();

    return (
      <div>
        <Segment style={{ width: 600, margin: '0 auto' }}>
          <form className="ui form" onSubmit={this.handleSubmit.bind(this)}>
            <h4 className="ui dividing header">
              <span style={{ marginRight: 10 }}>Course Details</span>
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
              <div className="eleven wide field">
                <label>Title</label>
                <input type="text" name="title" value={course.title} onChange={this.handleFieldChange.bind(this)} placeholder="Title" />
              </div>
              <div className="five wide field">
                <label>Fee ($)</label>
                <input type="text" name="fee" value={course.fee} onChange={this.handleFieldChange.bind(this)} placeholder="Fee ($)" />
              </div>
            </div>
            <div className="fields">
              <div className="five wide field">
                <label>Max students</label>
                <select name="maxStudent" value={course.maxStudent} className="ui fluid dropdown" onChange={this.handleFieldChange.bind(this)}>
                  <option value="10">10</option>
                  <option value="16">16</option>
                  <option value="24">24</option>
                  <option value="32">32</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Description</label>
              <textarea name="description" rows="2" value={course.description} onChange={this.handleFieldChange.bind(this)} />
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
          header="Confirm deleting course"
        >
              This is action is irrevocable. Are you sure you want to continue?
        </Confirm>
      </div>
    );
  }
}

export default withRouter(CourseDetailsView);
