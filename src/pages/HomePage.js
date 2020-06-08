/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import BusySpinner from '../components/BusySpinner';
import MessagePopup from '../components/MessagePopup';
import log from '../utils/logger';

import UserActions from '../actions/UserActions';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    log('Home Page Loaded.');
  }

  logout() {
    const { actions } = this.props;
    actions.logout();
  }

  render() {
    const { ui } = this.props;
    const { loading, displayMessage, messageContent } = ui.toJS();
    return (
      <>
        <BusySpinner busy={loading} />
        <MessagePopup display={displayMessage} content={messageContent} />
        <div className="container m-auto font-sans pb-8">
          <div className="w-full flex flex-col items-center">
            <h2 className="w-full p-4 text-center">MaYi&apos;s React App</h2>
          </div>
          <div className="text-center cursor-pointer mt-4" onClick={this.logout}>
            <FontAwesomeIcon className="text-xl" icon={faSignOutAlt} />
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  (state) => ({
    app: state.app,
    ui: state.ui,
  }),
  (dispatch) => ({
    actions: bindActionCreators({ ...UserActions }, dispatch),
  })
)(DashboardPage);
