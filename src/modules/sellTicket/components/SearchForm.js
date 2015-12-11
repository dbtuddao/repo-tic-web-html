import React, { PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import ApiClient from 'helpers/ApiClient';
import moment from 'moment';

const client = new ApiClient();

export default class SearchForm extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    history: PropTypes.object
  }

  state = {
    selected: ''
  }

  onSuggestionSelected(suggestion) {
    if (this.props.onSelect) {
      this.props.onSelect(suggestion.id);
    }
  }

  getSuggestions(input, callback) {
    client.post('/Search/Autocomplete', {data: { text: input }}).then(payload => {
      const suggestions = [];

      for (let i = 0; i < payload.events.length; i++) {
        suggestions.push(payload.events[i]);
      }

      callback(null, suggestions);
    });
  }

  suggestionRenderer(suggestion) {
    const date = moment(suggestion.date);
    const now = moment();
    return (
      <div>
        <div>{suggestion.name}, {suggestion.venue}, {suggestion.city}, {suggestion.country}</div>
        <div>{date.year() > now.year() ? date.format('D MMM YYYY') : date.format('D MMM')} at {date.format('H A')}</div>
      </div>
    );
  }

  suggestionValue(suggestion) {
    return suggestion.name;
  }

  render() {
    const inputAttributes = {
      id: 'searchInput',
      className: 'col-xs-12',
      name: 'q',
      placeholder: 'Search an event'
    };
    return (
      <div id="searchFormEvent">
        <Autosuggest id="searchInputBox"
          inputAttributes={inputAttributes}
          suggestions={::this.getSuggestions}
          suggestionRenderer={::this.suggestionRenderer}
          suggestionValue={::this.suggestionValue}
          onSuggestionSelected={::this.onSuggestionSelected}
        />
      </div>
    );
  }
}
