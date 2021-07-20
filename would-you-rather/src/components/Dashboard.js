import { Button, Grid, List, ListItem, Paper, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question.js'

class Dashboard extends Component {
    state = {
        viewUnansweredQuestions: true
    }

    toggleQuestionsList = (newState) => {
      this.setState(()=>({
          viewUnansweredQuestions: newState
      }))  
    }

  render() {
    return (
      <div>
        <Grid container spacing={0} >
            <Grid item xs={6} style={{display:"flex", justifyContent:"center"}} onClick={()=>{this.toggleQuestionsList(true)}}>
                <Button color={this.state.viewUnansweredQuestions?'primary':'transparent'} variant={this.state.viewUnansweredQuestions?'contained':'outlined'}>
                    <Typography>
                        Unanswered Questions
                    </Typography>
                </Button>
            </Grid>
            <Grid item xs={6} style={{display:"flex", justifyContent:"center"}} onClick={()=>{this.toggleQuestionsList(false)}}>
                <Button color={ !this.state.viewUnansweredQuestions?'primary':'transparent'} variant={ !this.state.viewUnansweredQuestions?'contained':'outlined'}>
                <Typography>
                    Answered Questions
                </Typography>
                </Button>
            </Grid>
        </Grid>
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <List>
                    {this.props.questionIds.map((id) => (
                        <ListItem key={id} style={{display:'block'}}>
                            <Question id={id} viewUnanswered={this.state.viewUnansweredQuestions}/>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser, users }) {
    const currentUser = users[authedUser]

  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)