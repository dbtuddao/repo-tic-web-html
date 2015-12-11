import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import { EventList } from '../components';
import * as EventActions from 'redux/modules/event';
import * as CategoryActions from 'redux/modules/category';
import errorRedirect from 'helpers/errorRedirect';
import { Link } from 'react-router';
import { SmallHeader, Footer, AsSeenOn } from 'components';

@connect(
  state => ({
    eventListCategory: state.eventListCategory,
    category: state.category
  })
)
export default class Category extends React.Component {
  static propTypes = {
    eventListCategory: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { category } = store.getState();

      if (category.error) {
        errorRedirect(category.error.status, transition);
      }
    };
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      return store.dispatch(CategoryActions.getBySlug(state.params.id)).then(()=>{
        const { category } = store.getState();

        if (!category.error) {
          return store.dispatch(EventActions.listCategory(category.data.id, 10, 0));
        }
      });
    }
  }

  render() {
    const { eventListCategory, category } = this.props;

    return (
      <div>
        <SmallHeader/>
        <div className="page-sellticket-bg container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <p className="sell-h1 ">{category.data.name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="event-list container">
          <div className="row">
            <div className="sub-nav">
              <ul>
                <li className="no_bg"><Link to="/">Home </Link></li>
                <li><a>{category.data.name}</a></li>
              </ul>
              <div className="clear"></div>
            </div>
            <div className="event-list-search  col-xs-12">
              <div className="event-list-content">
                <ul>
                  <EventList events={eventListCategory.data.events} total={eventListCategory.data.total} />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <AsSeenOn/>
        <Footer/>
      </div>
    );
  }
}
