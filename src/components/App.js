import React from 'react';

import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';

class App extends React.Component {

  render() {
    return (      
      <div className="app">
        { this.props.authData.isLoggedIn ? 
          <PrivateLayout {...this.props} /> : 
          <PublicLayout {...this.props} /> }
        
        <footer className="footer">
          <hr />
          <div>Copyright 2018 Local Library. All right reserved.</div>
        </footer>
      </div>
    );
  }
}

export default App;