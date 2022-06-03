import { Fragment } from 'react';
import NavigationBar from './NavigationBar';

function Layout(props: any) {
  return (
    <Fragment>
      <NavigationBar />
      {props.children}
    </Fragment>
  );
}

export default Layout;