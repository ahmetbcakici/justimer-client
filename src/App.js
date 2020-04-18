import React from 'react';
import Navbar from './components/Navbar';
import ChooseArea from './components/ChooseArea';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <ChooseArea/> 
      <Content/> 
      <Footer/> 
    </div>
  );
}

export default App;
