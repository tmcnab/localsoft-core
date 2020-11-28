import moment from 'moment'

export default function TimeSince ({ date }) {
    return moment(date).fromNow(true)
}