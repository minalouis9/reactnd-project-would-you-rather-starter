export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion(question, user, authedUser) {
    const { id, author, optionOne, optionTwo, timestamp } = question
    const { name, avatarURL } = user

    return {
        name,
        id,
        timestamp,
        avatar: avatarURL,
        author: author,
        optionOne: {
            text: optionOne.text,
            votes: optionOne.votes
        },
        optionTwo: {
            text: optionTwo.text,
            votes: optionTwo.votes
        }
    }
}