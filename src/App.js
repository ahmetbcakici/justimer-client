import React from 'react';
import Navbar from './components/Navbar';
import ChooseArea from './components/ChooseArea';
import Content from './components/Content';
import Footer from './components/Footer';
import GithubCorner from 'react-github-corner';


function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <GithubCorner
        href="https://github.com/ahmetbcakici/justimer-client"
        direction={'right'}
        bannerColor='white'
        octoColor="dark"
        size={107}
      />
      <ChooseArea/> 
      {/* <Content/>  */}
      <Footer/> 
    </div>
  );
}

export default App;
