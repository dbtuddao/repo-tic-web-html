import React, { PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';

@connectReduxForm({
  form: 'purchaseSearchForm',
  fields: ['search']
})
export default class SearchForm extends React.Component {
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
    const { fields: { search }, onSubmit, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...search} />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
