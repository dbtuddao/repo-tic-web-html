import React, { PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import ApiClient from 'helpers/ApiClient';
import moment from 'moment';
import classNames from 'classnames';

const client = new ApiClient();

export default class SearchForm extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string,
    noButton: PropTypes.bool,
    idBox: PropTypes.string,
    idInput: PropTypes.string,
    history: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string,
    theme: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static defaultProps = {
    noButton: false,
    idBox: 'searchInputBox',
    idInput: 'searchInput',
    theme: 'dark'
  }

  state = {
    selected: ''
  }

  onSuggestionSelected(suggestion) {
    this.setState({selected: suggestion.id});
    switch (suggestion.type) {
      case 'event':
        this.context.router.transitionTo(`/event/${suggestion.slug}`);
        break;
      case 'venue':
        this.context.router.transitionTo(`/venue/${suggestion.slug}/events`);
        break;
      case 'city':
        this.context.router.transitionTo(`/city/${suggestion.slug}/venues`);
        break;
    }
  }

  getSuggestions(input, callback) {
    client.post('/Search/Autocomplete', {data: { text: input }}).then(payload => {
      const suggestions = [
        {sectionName: 'Event', suggestions: []},
        {sectionName: 'Venue', suggestions: []},
        {sectionName: 'City', suggestions: []}
      ];

      for (let i = 0; i < payload.events.length; i++) {
        suggestions[0].suggestions.push(payload.events[i]);
      }

      for (let i = 0; i < payload.venues.length; i++) {
        suggestions[1].suggestions.push(payload.venues[i]);
      }

      for (let i = 0; i < payload.cities.length; i++) {
        suggestions[2].suggestions.push(payload.cities[i]);
      }

      callback(null, suggestions);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const q = document.getElementById('searchInput').value;
    this.context.router.transitionTo('/search', {q: q});
  }

  suggestionRenderer(suggestion) {
    switch (suggestion.type) {
      case 'event':
        const date = moment(suggestion.date);
        const now = moment();
        return (
          <div>
            <div>{suggestion.name}, {suggestion.venue}, {suggestion.city}, {suggestion.country}</div>
            <div>{date.year() > now.year() ? date.format('D MMM YYYY') : date.format('D MMM')} at {date.format('H A')}</div>
          </div>
        );
      case 'venue':
        return (<span>{suggestion.name}, {suggestion.city}, {suggestion.country}</span>);
      case 'city':
        return (<span>{suggestion.name}, {suggestion.country}</span>);
    }
  }

  suggestionValue(suggestion) {
    return suggestion.name;
  }

  render() {
    const { idInput, idBox, noButton, className, theme, id } = this.props;
    const handleSubmit = this.handleSubmit.bind(this);
    const getSuggestions = this.getSuggestions.bind(this);
    const suggestionRenderer = this.suggestionRenderer.bind(this);
    const suggestionValue = this.suggestionValue.bind(this);
    const onSuggestionSelected = this.onSuggestionSelected.bind(this);

    const inputAttributes = {
      id: idInput,
      name: 'q',
      value: this.props.value,
      placeholder: 'Search an event or City'
    };

    if (theme === 'white') {
      inputAttributes.className = 'form-control white-search-box-big-input';
      return (
        <form id={id} className={classNames(className, 'form-inline', 'search-big-white-theme')} action="/search" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon white-search-box-big-icon"><i className="glyphicon glyphicon-search"/></div>
              <Autosuggest id={idBox}
                inputAttributes={inputAttributes}
                suggestions={getSuggestions}
                suggestionRenderer={suggestionRenderer}
                suggestionValue={suggestionValue}
                onSuggestionSelected={onSuggestionSelected}
              />
            </div>
          </div>
          <span>&nbsp;</span>{!noButton && <button className="btn white-search-box-big-button" type="submit">Search</button>}
        </form>
      );
    } else if (theme === 'white-small') {
      inputAttributes.className = 'form-control white-search-box-input';
      return (
        <form id={id} className={classNames(className, 'form-inline', 'search-white-theme')} action="/search" onSubmit={handleSubmit}>
          <Autosuggest id={idBox}
            inputAttributes={inputAttributes}
            suggestions={getSuggestions}
            suggestionRenderer={suggestionRenderer}
            suggestionValue={suggestionValue}
            onSuggestionSelected={onSuggestionSelected}
          />
          <span>&nbsp;</span>{!noButton && <button className="btn white-search-box-button" type="submit">Search</button>}
        </form>
      );
    }

    inputAttributes.className = 'form-control black-search-box-big-input';
    return (
      <form id={id} className={classNames(className, 'form-inline', 'search-big-black-theme')} action="/search" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-addon black-search-box-big-icon"><i className="glyphicon glyphicon-search"/></div>
            <Autosuggest id={idBox}
              inputAttributes={inputAttributes}
              suggestions={getSuggestions}
              suggestionRenderer={suggestionRenderer}
              suggestionValue={suggestionValue}
              onSuggestionSelected={onSuggestionSelected}
            />
          </div>
        </div>
        <span>&nbsp;</span>{!noButton && <button className="btn black-search-box-big-button" type="submit">Search</button>}
      </form>
    );
  }
}
