import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import query from 'helpers/Query';
import { reFetch } from 'redux/modules/app';
import { SmallHeader, Footer, SearchForm } from 'components';
import { ResultList, NoResult } from '../components';
import * as SearchActions from 'redux/modules/search';

@connect(
  state => ({
    search: state.search
  })
)
export default class List extends React.Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      const q = query(state.location.query, 'q');
      return store.dispatch(SearchActions.search(q));
    }
  }

  handleSearch(q) {
    this.props.dispatch(SearchActions.search(q));
  }

  render() {
    const { search, location } = this.props;
    const q = query(location.query, 'q');
    const handleSearch = this.handleSearch.bind(this);

    let resultList = null;
    if (search.data.events.length || search.data.cities.length || search.data.venues.length) {
      resultList = <ResultList searchResult={search.data} />;
    } else {
      resultList = (
        <NoResult query={q} />
      );
    }

    return (
      <div>
        <SmallHeader />
        <div className="main-content">
          <div className="page-sellticket-bg container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <p className="sell-h1 ">Search</p>
               </div>
              </div>
            </div>
          </div>
        </div>
        <div className="search-content2 container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <SearchForm id="search-search" onSearch={handleSearch} value={q} theme="white" />
              </div>
            </div>
          </div>
        </div>
        <div className="event-list container">
          {resultList}
        </div>
        <Footer/>
      </div>
    );
  }
}
