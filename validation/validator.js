import revalidator from 'revalidator';
import _ from 'lodash';

import contractValidationSchema from './contractValidationSchema';

export default {
  /**
   * Initializes the validation schema based on the specific options and the terms of reference
   * The validation schema for the specific options can not be hard coded
   * @param {object} specificOptions the array with the specific options
   * @param {bool} termsOfRerencerequired indicates if the terms of reference is required
   */
  initializeValidationSchema(specificOptions, termsOfRerencerequired) {
    const specOptionsSchema = {};
    Object.keys(specificOptions).forEach(key => {
      specOptionsSchema[key] = {
        type: 'string',
        required: true,
        allowEmpty: false,
        message: `Specific option ${key} is required`,
      };
    });
    contractValidationSchema.properties = _.assign({}, contractValidationSchema.properties, specOptionsSchema);
    if (termsOfRerencerequired) {
      const termsOfReference = {
        type: 'string',
        required: true,
        allowEmpty: false,
        message: 'The terms of reference is required. Please select a valid pdf document',
      };
      contractValidationSchema.properties = _.assign({}, contractValidationSchema.properties, termsOfReference);
    }
  },
  removeSpecificOptionRules(options) {
    options.forEach(option => {
      if (contractValidationSchema.properties[option]) {
        delete contractValidationSchema.properties[option];
      }
    });
  },
  /**
   * Returns if the value for the specified property is valid
   * @param  {string} propertyId the id of the property to validate
   * @param  {string} value the current value of the property
   * @returns {{valid: Boolean, validationMessage: ?string}} the result of the validation
   */
  validateField(propertyId, value) {
    const objectToValidate = {[propertyId]: value};
    const validationSchema = contractValidationSchema.properties[propertyId];
    const validationResult = revalidator.validate(objectToValidate, {properties: {[propertyId]: validationSchema}});
    const result = {valid: validationResult.valid};
    if (!validationResult.valid && validationResult.errors.length > 0) {
      result.validationMessage = validationResult.errors[0].message;
    }
    return result;
  },
  /**
   * Returns if the contract state is valid (all required fields are filled)
   * @param  {Object} contractState the object representing contract's current state
   * @returns {Boolean} if the state is valid
   */
  isContractValid(contractState) {
    const flattenContractState = _.assign({}, contractState, contractState.specOptions);
    return revalidator.validate(flattenContractState, contractValidationSchema).valid;
  },

  getValidationErros(contractState) {
    const flattenContractState = _.assign({}, contractState, contractState.specOptions);
    return revalidator.validate(flattenContractState, contractValidationSchema);
  },
};
