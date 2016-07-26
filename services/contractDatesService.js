import moment from 'moment';

import {DATE_FORMAT} from 'constants/contractTemplateConstants';

const CENTRAL_EVALUATION_WORKING_DAYS = 'wdCentralEvaluation';
const WORKING_DAYS_FOR_ATTENDING_PROJECT_MEETING = 'wdfapm';
const WORKING_DAYS_FOR_ATTENDING_REVIEW_MEETING = 'wdfarm';
const WORKING_DAYS_FOR_ATTENDING_TECHNINCAL_MEETING = 'wdfatm';

const workStartOnId = 'workstarton';
const centralEvaluationStartDate = 'startDateCentralEvaluation';
const centralEvaluationEndtDate = 'endDateCentralEvaluation';
const remoteEvaluationStartDate = 'startDateRemoteEvaluation';
const remoteEvaluationEndtDate = 'endDateRemoteEvaluation';
const projectMeetingFrom = 'pmfrom';
const projectMeetingTo = 'pmto';
const reviewMeetingFrom = 'rmfrom';
const reviewMeetingTo = 'rmto';
const technicalMeetingFrom = 'tmfrom';
const technicalMeetingTo = 'tmto';

export default {
  /**
   * Calculates the total central and remote working days
   * @param  {object} specOptions an object with all specific options and their values
   * @return {object} an object containing the various dates and the min or max values
   */
  getDatesRules(specOptions) {
    // The work start on date should be at least today
    const result = {
      [workStartOnId]: {
        minDate: moment(),
      },
    };
    // Once work start on date is set then the rest of the dates should be after this one
    if (specOptions[workStartOnId]) {
      const workStartOnDate = moment(specOptions[workStartOnId], DATE_FORMAT);
      result[centralEvaluationStartDate] = {
        minDate: workStartOnDate,
      };
      result[centralEvaluationEndtDate] = {
        minDate: workStartOnDate,
      };
      result[remoteEvaluationStartDate] = {
        minDate: workStartOnDate,
      };
      result[remoteEvaluationEndtDate] = {
        minDate: workStartOnDate,
      };
      result[projectMeetingFrom] = {
        minDate: workStartOnDate,
      };
      result[projectMeetingTo] = {
        minDate: workStartOnDate,
      };
      result[reviewMeetingFrom] = {
        minDate: workStartOnDate,
      };
      result[reviewMeetingTo] = {
        minDate: workStartOnDate,
      };
      result[technicalMeetingFrom] = {
        minDate: workStartOnDate,
      };
      result[technicalMeetingTo] = {
        minDate: workStartOnDate,
      };
    }

    // If there is a value for start date then the corresponding end date should be later or equal
    if (specOptions[centralEvaluationStartDate]) {
      const centralEvalStartDate = moment(specOptions[centralEvaluationStartDate], DATE_FORMAT);
      result[centralEvaluationEndtDate] = {
        minDate: centralEvalStartDate,
      };
    }
    if (specOptions[remoteEvaluationStartDate]) {
      const remoteEvalStartDate = moment(specOptions[remoteEvaluationStartDate], DATE_FORMAT);
      result[remoteEvaluationEndtDate] = {
        minDate: remoteEvalStartDate,
      };
    }
    if (specOptions[projectMeetingFrom]) {
      const projMeetingFrom = moment(specOptions[projectMeetingFrom], DATE_FORMAT);
      result[projectMeetingTo] = {
        minDate: projMeetingFrom,
      };
    }
    if (specOptions[reviewMeetingFrom]) {
      const revMeetingFrom = moment(specOptions[reviewMeetingFrom], DATE_FORMAT);
      result[reviewMeetingTo] = {
        minDate: revMeetingFrom,
      };
    }
    if (specOptions[technicalMeetingFrom]) {
      const techMeetingFrom = moment(specOptions[technicalMeetingFrom], DATE_FORMAT);
      result[technicalMeetingTo] = {
        minDate: techMeetingFrom,
      };
    }

    return result;
  },

  getMaxDays(specOptions, optionId) {
    switch (optionId) {
      case CENTRAL_EVALUATION_WORKING_DAYS: {
        if (specOptions[centralEvaluationStartDate] && specOptions[centralEvaluationEndtDate]) {
          const centralEvalStartDate = moment(specOptions[centralEvaluationStartDate], DATE_FORMAT);
          const centralEvalEndDate = moment(specOptions[centralEvaluationEndtDate], DATE_FORMAT);
          // http://momentjs.com/docs/#/displaying/difference/
          return centralEvalEndDate.diff(centralEvalStartDate, 'days');
        }
        return null;
      }
      case WORKING_DAYS_FOR_ATTENDING_PROJECT_MEETING: {
        if (specOptions[projectMeetingFrom] && specOptions[projectMeetingTo]) {
          const projMeetingStartDate = moment(specOptions[projectMeetingFrom], DATE_FORMAT);
          const projMeetingEndDate = moment(specOptions[projectMeetingTo], DATE_FORMAT);
          // http://momentjs.com/docs/#/displaying/difference/
          return projMeetingEndDate.diff(projMeetingStartDate, 'days');
        }
        return null;
      }
      case WORKING_DAYS_FOR_ATTENDING_REVIEW_MEETING: {
        if (specOptions[reviewMeetingFrom] && specOptions[reviewMeetingTo]) {
          const reviewMeetingStartDate = moment(specOptions[reviewMeetingFrom], DATE_FORMAT);
          const reviewMeetingEndDate = moment(specOptions[reviewMeetingTo], DATE_FORMAT);
          // http://momentjs.com/docs/#/displaying/difference/
          return reviewMeetingEndDate.diff(reviewMeetingStartDate, 'days');
        }
        return null;
      }
      case WORKING_DAYS_FOR_ATTENDING_TECHNINCAL_MEETING: {
        if (specOptions[technicalMeetingFrom] && specOptions[technicalMeetingTo]) {
          const technicalMeetingStartDate = moment(specOptions[technicalMeetingFrom], DATE_FORMAT);
          const tecnicalMeetingEndDate = moment(specOptions[technicalMeetingTo], DATE_FORMAT);
          // http://momentjs.com/docs/#/displaying/difference/
          return tecnicalMeetingEndDate.diff(technicalMeetingStartDate, 'days');
        }
        return null;
      }
      default:
        return null;
    }
  },
};
