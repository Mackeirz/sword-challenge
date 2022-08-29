module.exports = {
  taskSchema: {
    id: {
      in: ['body', 'params'],
      custom: {
        options: (_value, { req }) => {
          return (req.method === 'PUT' && 'id' in req.params && 'id' in req.body) || (req.method === 'POST' && !('id' in req.body));
        },
        errorMessage: 'Id is required only for updating'
      },
      customSanitizer: {
        options: (value, { req }) => {
          if (req.body.id && req.params.id) {
            return parseInt(value);
          }
        },
      }
    },
    name: {
      in: ['body'],
      isLength: {
        errorMessage: 'Name is required',
        options: { min: 1 }
      }
    },
    status: {
      in: ['body'],
      custom: {
        options: (value, { _req }) => {
          if (value) {
            return ['CREATED', 'FINISHED'].includes(value);
          }
          return true;
        },
        errorMessage: 'Status should be CREATED or FINISHED'
      },
    },
    summary: {
      in: ['body'],
      custom: {
        options: (value, { req }) => {
          return (
            (req.body.summaryPersonalNotes && req.body.summaryPersonalNotes.length || 0)
            + (value && value.length || 0) <= 2500
          );
        },
        errorMessage: 'Summary and personal notes max limit is 2500 characters'
      },
    },
    summaryPersonalNotes: {
      in: ['body'],
      optional: true,
      custom: {
        options: (value, { req }) => {
          return req.body.summary.length + (value && value.length || 0) <= 2500;
        },
        errorMessage: 'Summary and personal notes max limit is 2500 characters'
      },
    },
    date: {
      in: ['body'],
      custom: {
        options: (value, { req }) => {
          if (value && value.length) {
            const regexDatetimeExp = /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/;
            return regexDatetimeExp.test(value);
          }
          return 'status' in req.body && req.body.status === 'FINISHED' ? false : true;
        },
        errorMessage: 'Date required for FINISHED status should follow YYYY-MM-dd HH:ii:ss format'
      }
    }
  }
}