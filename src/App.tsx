import React from 'react';
import { GlobalStyle } from  './style';
import { IconStyle } from './assets/iconfont/iconfont.js';

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <i className="iconfont">&#xe633;</i>
    </div>
  );
}

export default App;
