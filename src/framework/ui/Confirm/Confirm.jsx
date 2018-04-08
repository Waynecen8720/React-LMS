import React from 'react';
import Button from '../Button/Button';

export default class Confirm extends React.Component {
  componentDidMount() {
    $(this.modal).modal({
      onHide: this.handleClose.bind(this),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      $(this.modal).modal(nextProps.show ? 'show' : 'hide');
    }
  }

  updateModalRef(ref) {
    this.modal = ref;
  }

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleApprove() {
    if (this.props.onApprove) {
      this.props.onApprove();
    }
  }

  render() {
    const { header = 'Confirm your action', children } = this.props;

    return (
      <div className="ui tiny modal" ref={this.updateModalRef.bind(this)}>
        <div className="header">{header}</div>
        <div className="content">
          {children}
        </div>
        <div className="actions">
          <Button className="right labeled icon" primary onClick={this.handleApprove.bind(this)}>
            Yes
            <i className="checkmark icon" />
          </Button>
          <Button danger onClick={this.handleClose.bind(this)}>No</Button>
        </div>
      </div>
    );
  }
}
