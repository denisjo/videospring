export default {
  properties: {
    contractTitle: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
    contractDescription: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
    remoteWorkingDays: {
      pattern: /^\d+(\.)?(5)?$/,
      message: 'Invalid input. The value must be full or half days',
    },
    centralWorkingDays: {
      pattern: /^\d+(\.)?(5)?$/,
      message: 'Invalid input. The value must be full or half days',
    },
    startDate: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
    maxWorkingDays: {
      pattern: /^\d+(\.)?(5)?$/,
      message: 'Invalid input. The value must be full or half days',
    },
    isPaid: {
      required: true,
      type: ['boolean', 'string'],
    },
  },
};
