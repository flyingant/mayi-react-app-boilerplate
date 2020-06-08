/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function MessagePopup(props) {
  let element = <div />;
  if (props.display) {
    element = (
      <div className="fixed inset-0 z-50 w-screen h-32">
        <p className="w-64 mx-auto mt-4 text-sm text-black bg-white shadow shadow-md px-4 py-2">
          <FontAwesomeIcon className="text-purple-500 mr-2" icon={faInfoCircle} />
          <span dangerouslySetInnerHTML={{ __html: props.content }} />
        </p>
      </div>
    );
  }
  return element;
}

MessagePopup.propTypes = {
  display: PropTypes.bool,
  type: PropTypes.string,
  content: PropTypes.string,
};
