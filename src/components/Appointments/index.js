// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', isFilterActive: false}

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {isFilterActive, title, date} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-container">
        <div className="content-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="appointment-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <div className="input-container">
                <label className="title-input" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  onChange={this.onChangeTitle}
                  value={title}
                  id="title"
                  placeholder="Title"
                />
                <label className="title-input" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  id="date"
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>

            <img
              className="img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appointments-container">
            <div className="header-container">
              <h1>Appointments</h1>
              <button
                type="button"
                onClick={this.onFilter}
                className={`filter-style ${filterClassName}`}
              >
                starred
              </button>
            </div>
            <ul className="appointment-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
