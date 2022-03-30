import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { MainPage, ComicsPage, SinglePage } from '../pages'
import { SingleComicLayout, SingleCharacterLayout } from '../pages'
import AppHeader from '../appHeader/AppHeader'

function App() {
  return (
    <Router>
      <div className='app'>
        <AppHeader/>
        <main>
          <Switch>
            <Route exact path='/'>
              <MainPage/>
            </Route>
            <Route exact path='/comics'>
              <ComicsPage/>
            </Route>
            <Route exact path='/comics/:id'>
              <SinglePage Component={SingleComicLayout} dataType='comic'/>
            </Route>
            <Route exact path='/characters/:id'>
              <SinglePage Component={SingleCharacterLayout} dataType='character'/>
            </Route>
            <Route exact path='/'/>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
