import React from 'react';
import ChooseArea from './components/ChooseArea';
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
    </div>
  );
}

export default App;
