import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import loginbg from '../assets/loginbg.svg';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';
import { pageTitle, pageSubTitle } from '../utils/constant';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 By Fish119
  </Fragment>
);

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = pageTitle;
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${pageTitle}`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    const containerBgStyle = {
      backgroundImage:`url(${  loginbg  })`
    };
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container} style={containerBgStyle}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>{pageTitle}</span>
                </Link>
              </div>
              <div className={styles.desc}>{pageSubTitle}</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
