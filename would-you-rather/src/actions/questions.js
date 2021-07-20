import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      author: authedUser.id,
      optionOne,
      optionTwo
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function saveAnswer (answer) {
    return {
        type: SAVE_ANSWER,
        answer
    }
}

export function handleSaveAnswer (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser} = getState()

        dispatch(showLoading())

        return saveQuestionAnswer({
            authedUser: authedUser,
            qid,
            answer
        })
        .then((questionAnswer) => dispatch(saveAnswer(questionAnswer)))
        .then(() => dispatch(hideLoading()))
    }
}