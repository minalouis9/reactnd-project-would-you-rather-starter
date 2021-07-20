import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard.js'
import Nav from './Nav.js'
import SignIn from './SignIn'
import { Grid } from '@material-ui/core'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading === true
              ? <Grid
              container
              spacing={0}
              direction="row"
              justifyContent="center"
              style={{marginTop:"20px", marginBottom:"20px"}}
            >
              <Grid item xs={6}>
                <div>
                  <Route exact path='/chooseUser' component={SignIn} />
                </div>
              </Grid>
            </Grid>
              : <div>
            <Nav />
            <Grid
                container
                spacing={0}
                direction="row"
                justifyContent="center"
                style={{marginTop:"20px", marginBottom:"20px"}}
              >
                <Grid item xs={6}>
                  <div>
                    <Route exact path='/' component={Dashboard} />
                    {/* <Route path='leaderboard' exact component={} />
                    <Route path='/add' exact component={} /> */}
                  </div>
                </Grid>
              </Grid>
          </div>}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);