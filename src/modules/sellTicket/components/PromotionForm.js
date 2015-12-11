import React, { PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
import Facebook from 'helpers/Facebook';

@connectReduxForm({
  form: 'sellTicketPromotion',
  fields: ['emails', 'fbwall', 'fbevent']
})
export default class PromotionForm extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    fbEventName: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  boundHandleSubmit(form) {
    const permission = ['email,user_birthday,user_location,user_friends'];
    if (form.fbwall) {
      permission.push('publish_actions');
    }

    if (form.fbevent) {
      permission.push('rsvp_event');
    }

    if (form.fbwall || form.fbevent) {
      Facebook.login(permission.toString()).then((result)=>{
        if (!result.error) {
          this.props.onSubmit(form);
        }
      });
      return;
    }

    this.props.onSubmit(form);
  }

  handleSelectChange(val) {
    this.props.fields.emails.handleChange(val);
  }

  render() {
    const { fields: {emails, fbwall, fbevent}, children, handleSubmit, fbEventName } = this.props;
    const boundHandleSubmit = this.boundHandleSubmit.bind(this);
    // const handleSelectChange = this.handleSelectChange.bind(this);
    return (
      <form ref="form" onSubmit={handleSubmit(boundHandleSubmit)}>
        <div className="checkbox">
          <label>
            <input type="checkbox" {...fbwall} /> Post to my Facebook wall
          </label>
        </div>
        {fbEventName &&
          <div className="checkbox">
            <label>
              <input type="checkbox" {...fbevent} /> Post on event page of {fbEventName}
            </label>
          </div>
        }
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" {...emails} />
          {emails.error && emails.touched && <p>{emails.error}</p>}
        </div>
        {children}
      </form>
    );
  }
}
