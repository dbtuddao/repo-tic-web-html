import React, { PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
import DateTime from 'react-datetime';

@connectReduxForm({
  form: 'salesSearchForm',
  fields: ['search', 'dateFrom', 'dateTo']
})
export default class SearchAndDateForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  componentWillUnmount() {
    this.props.initializeForm({});
  }

  render() {
    const { fields: { search, dateFrom, dateTo }, onSubmit, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...search} />
          <DateTime timeFormat={false} open={false} {...dateFrom} placeholder="From" />
          <DateTime timeFormat={false} open={false} {...dateTo} placeholder="To" />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
