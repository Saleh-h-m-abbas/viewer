import React from 'react';
// Svgs
// Saleh Abbas
import logoOhif from './../../assets/svgs/250.svg';

const SVGS = {
  'logo-ohif': logoOhif,
};

/**
 * Return the matching SVG as a React Component.
 * Results in an inlined SVG Element. If there's no match,
 * return `null`
 */
export default function getSvg(key, props) {
  if (!key || !SVGS[key]) {
    return React.createElement('div', null, 'Missing SVG');
  }

  // return React.createElement(SVGS[key], props);
  return null;
}

export { SVGS };
