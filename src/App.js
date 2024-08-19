import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/dashboard';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;