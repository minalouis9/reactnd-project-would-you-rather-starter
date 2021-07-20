import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers.js'
// import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
// import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
// import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
// import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'

class Question extends Component {
    toDetails = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/questions/${id}`)
    }

    render() {
        const { question, viewUnanswered } = this.props

        if (question === null) {
            return <p>This Question doesn't existd</p>
        }

        const {
            author, timestamp, text, optionOne, optionTwo, id, name
        } = question

        return (
            <div>
                <Card>
                    <CardHeader><Typography variant='h4'>{name} asks</Typography></CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={2} style={{ justifyContent: 'center', display: 'flex' }}>
                                <AccountCircle style={{ height: '100%', width: '100%' }} />
                            </Grid>
                            <Grid container spacing={1} direction="column" item xs={10} style={{ alignItems: 'center', padding: '10px' }}>
                                <Grid item>
                                <Typography>Would you rather</Typography>
                                <Typography>.. {optionOne.text} ..</Typography>
                                </Grid>
                                <Grid item></Grid>
                                <Button variant="contained" color="primary" style={{ minWidth: "100%" }} size="medium" >View Poll</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default withRouter(connect(mapStateToProps)(Question))