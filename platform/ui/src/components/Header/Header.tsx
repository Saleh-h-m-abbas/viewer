import React, { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import NavBar from '../NavBar';
import Svg from '../Svg';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Dropdown from '../Dropdown';

function Header({
  children,
  menuOptions,
  isReturnEnabled,
  onClickReturnButton,
  isSticky,
  WhiteLabeling,
  ...props
}): ReactNode {
  const { t } = useTranslation('Header');
  const [isFullScreen, setIsFullScreen] = useState(false);

  // TODO: this should be passed in as a prop instead and the react-router-dom
  // dependency should be dropped
  const onClickReturn = () => {
    if (isReturnEnabled && onClickReturnButton) {
      onClickReturnButton();
    }
  };
  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  return (
    <NavBar
      className="justify-between border-b-4 border-black"
      isSticky={isSticky}
    >
      <div className="flex flex-1 justify-between">
        {/* <div className="flex items-center">
               // TODO: Should preserve filter/sort
              // Either injected service? Or context (like react router's `useLocation`?)
          <div
            className={classNames(
              'mr-3 inline-flex items-center',
              isReturnEnabled && 'cursor-pointer'
            )}
            // onClick={onClickReturn}
            onClick={() => window.open('http://localhost:3001', '_self')}
          >
            {isReturnEnabled && (
              <Icon
                name="chevron-left"
                className="text-primary-active w-8"
              />
            )}
            <div className="ml-2">
              {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Svg name="logo-ohif" />}
            </div>
          </div>
        </div> */}
        <div
          style={{ marginLeft: '60px' }}
          className="flex items-center"
        >
          {/* {'Access: view only '} */}
          {children}{' '}
        </div>
        <div className="flex items-center">
          {/* Saleh Abbas */}
          {menuOptions.map((option, index) => (
            <IconButton
              key={index}
              onClick={option.onClick}
              variant="text"
              color="inherit"
              className="text-primary-active"
              type="button" // add this line
              bgColor="inherit" // add this line
            >
              {option.icon && <Icon name={option.icon} />}
            </IconButton>
          ))}
          <IconButton
            onClick={handleFullScreen}
            variant="text"
            color="inherit"
            className="text-primary-active"
            type="button" // add this line
            bgColor="inherit" // add this line
          >
            {isFullScreen ? <Icon name="exit-fullscreen" /> : <Icon name="fullscreen" />}
          </IconButton>
          {/* <span className="text-common-light mr-3 text-lg">{t('INVESTIGATIONAL USE ONLY')}</span> */}

          {/* <Dropdown
            id="options"
            showDropdownIcon={false}
            list={menuOptions}
            alignment="right"
          >
            <IconButton
              id={'options-settings-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="settings" />
            </IconButton>
            <IconButton
              id={'options-chevron-down-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
              rounded={false} // add this line
              disabled={false} // add this line
              type="button" // add this line
              fullWidth={false} // add this line
              onClick={() => {}} // add this line, replace with your function
              name="chevron-down" // add this line
              bgColor="inherit" // add this line
            >
              <Icon name="chevron-down" />
            </IconButton>
          </Dropdown> */}
        </div>
      </div>
    </NavBar>
  );
}

Header.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isReturnEnabled: PropTypes.bool,
  isSticky: PropTypes.bool,
  onClickReturnButton: PropTypes.func,
  WhiteLabeling: PropTypes.object,
};

Header.defaultProps = {
  isReturnEnabled: true,
  isSticky: false,
};

export default Header;