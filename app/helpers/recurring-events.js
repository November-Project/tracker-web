/* global _ */

export default {
  eventsFromRecurring: function (recurring, startDate, endDate, takenDates) {
    let days = recurring.get('daysArray');
    let daysDiff = moment(endDate).diff(moment(startDate), 'd');
    let now = moment();

    return _.range(daysDiff).reduce( (accum, dayDiff) => {
      let day = moment(startDate).clone().add(dayDiff, 'd');
      let dayString = day.format('YYYY-MM-DD');
      let week = this.weekDayOfMonth(day);
      let inverseWeek = this.inverseWeekDayOfMonth(day);

      if (now.diff(day) > 0 || // if past event or
        !days.contains(parseInt(day.format('d'))) || // if not a valid day or
        takenDates.contains(dayString) || // if day is taken or
        (recurring.get('week') !== week && // if week doesn't align and
        recurring.get('week') !== inverseWeek && // if week doesn't align and
        recurring.get('week') !== 0)) // if not all weeks and
      {
        return accum; // don't create a recurring event
      } else {
        takenDates.pushObject(dayString);
        return accum.pushObjects(this.eventFromRecurring(recurring, dayString));
      }
    }, []);
  },

  weekDayOfMonth: function (date) {
    let previousWeek = date.clone().add(-1, 'w');
    if (previousWeek.format('M') === date.format('M')) {
      return 1 + this.weekDayOfMonth(previousWeek);
    } else {
      return 1;
    }
  },

  inverseWeekDayOfMonth: function (date) {
    const nextWeek = date.clone().add(1, 'w');
    if (nextWeek.format('M') === date.format('M')) {
      return -1 + this.inverseWeekDayOfMonth(nextWeek);
    } else {
      return -1;
    }
  },

  eventFromRecurring: function (recurring, date) {
    return recurring.get('timesArray').map( (time) => {
      return {
        title: recurring.get('displayTitle'),
        recurring: recurring,
        start: moment(date + ' ' + time, 'YYYY-MM-DD HH:mm'),
        model_date: date
      };
    });
  },

  recurringToEvent: function (recurring, event) {
    event.setProperties({
      title: recurring.get('title'),
      times: recurring.get('times'),
      hideWorkout: recurring.get('hideWorkout'),
      tribe: recurring.get('tribe'),
      location: recurring.get('location'),
      workout: recurring.get('workout')
    });
  }
};
