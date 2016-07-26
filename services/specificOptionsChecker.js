import _ from 'lodash';

import ContractStore from 'stores/contractStore';
import Validator from 'validation/validator';

// This is a temporary solution for the general ruls engine about specif options
const specificOptionsRules = [
  {
    id: 'wdAttendingBriefing',
    rules: [
      {
        valueToTriggerRule: '0',
        processType: 'EXPERT_GROUP', 
        disabledOptions: [
          'addressAttendingBriefing',
          'dateAttendingBriefing',
          'remoteOrCentral',
          'addressAttendingBriefing',
          'startDateCentralEvaluation',
          'endDateCentralEvaluation',
        ],
      },{
	      valueToTriggerRule: '0',
	      processType: 'EVALUATOR', 
	      disabledOptions: [
	        'addressAttendingBriefing',
	        'dateAttendingBriefing'
	      ],
	    },
    ],
  },
  {
    id: 'wdCentralEvaluation',
    rules: [
      {
        valueToTriggerRule: '0',
        processType: 'EVALUATOR',
        disabledOptions: [
          'addressCentralEvaluation',
          'startDateCentralEvaluation',
          'endDateCentralEvaluation',
        ],
      },
    ],
  },
  {
    id: 'wdRemoteEvaluation',
    rules: [
      {
        valueToTriggerRule: '0',
        processType: 'EVALUATOR',
        disabledOptions: [
          'startDateRemoteEvaluation',
          'endDateRemoteEvaluation',
        ],
      },
    ],
  },
  {
    id: 'wdfapm',
    rules: [
      {
        valueToTriggerRule: '0',
        processType:'MONITOR',
        disabledOptions: [
          'pmtpaddress',
          'pmfrom',
        ],
      },
    ],
  },
  {
    id: 'wdfarm',
    rules: [
      {
        valueToTriggerRule: '0',
        processType:'MONITOR',
        disabledOptions: [
          'rmtpaddress',
          'rmfrom',
          'rmto',
        ],
      },
    ],
  },
  {
    id: 'wdfatm',
    rules: [
      {
        valueToTriggerRule: '0',
        processType:'MONITOR',
        disabledOptions: [
          'tmtpaddress',
          'tmfrom',
          'tmto',
        ],
      },
    ],
  },
];

export default {
  /**
   * Checks all the available rules and returns if a specific option is enabled or not
   * @param  {obj} options An object with all options with their current values
   * @param  {string} optionId the id of the option to check for
   */
  isOptionEnabled(optionId) {
    let result = true;
    const {specOptions} = ContractStore.getState().contractInfo;
    const {processType} = ContractStore.getState().contractInfo.poolInfo;
    specificOptionsRules.forEach(speciOptionRule => {
      if (result) {
        speciOptionRule.rules.forEach(rule => {
          if (_.includes(rule.disabledOptions, optionId)) {
            const specifiOptionValue = specOptions[speciOptionRule.id];
            if (rule.valueToTriggerRule === specifiOptionValue && rule.processType === processType) {
              result = false;
              Validator.removeSpecificOptionRules(rule.disabledOptions);
            }
          }
        });
      }
    });
    return result;
  },
};
