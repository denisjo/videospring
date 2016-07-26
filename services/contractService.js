import axios from 'axios';
import {CONTRACT_BASE} from 'configConstants';

/**
   Add an interceptor for error response to just transform it and return a unified object from all requests
   */
axios.interceptors.response.use(response => response, error => Promise.reject({
  data: error.data,
  status: error.status,
  statusText: error.statusText,
}));

const ContractService = {
  /**
   * @param  {string} poolCode Code of the pool
   * @param  {string} candReference Unique code of the expert
   * @return {Promise<object>} A promise to the data from the server
   */
  prepareContract(poolCode, candReference) {
    return axios.get(`${CONTRACT_BASE}prepareContract/pool/${poolCode}/expert/${candReference}`)
      .then(response => response.data);
  },

  refreshContract(poolCode, candReference, contractInfo) {
    return axios.post(`${CONTRACT_BASE}refreshContract/pool/${poolCode}/expert/${candReference}`, contractInfo)
      .then(response => response.data);
  },
  /**
   * @param  {any} contractNumber Number of the contract to fetch from the server
   * @return {Promise<object>} A promise to the contract content
   */
  getContract(contractNumber) {
    return axios.get(`${CONTRACT_BASE}getContract/${contractNumber}`)
      .then(response => response.data);
  },
  /**
   * @param  {object} contractInfo Json object to post
   * @param  {string} poolCode Code of the pool
   * @param  {string} candReference Unique code of the expert
   * @return {Promise<object>} A promise to the data from the server
   */
  createContract(contractInfo, poolCode, candReference) {
    return axios.post(`${CONTRACT_BASE}createContract/${poolCode}/expert/${candReference}`, contractInfo)
      .then(response => response.data);
  },
  /**
   * @param  {object} contractInfo Json object to post
   * @param  {string} contractNumber Number of the contract to update
   * @return {Promise<object>} A promise to the contract content
   */
  updateContract(contractInfo, contractNumber) {
    return axios.post(`${CONTRACT_BASE}updateContract/${contractNumber}`, contractInfo)
      .then(response => response.data);
  },
  /**
   * @param  {object} file File to upload
   * @param  {any} contractNumber Number of the contract to update
   * @return {Promise<object>} A promise to the contract content
   */
  uploadTermOfReference(file, contractNumber) {
    const data = new FormData();
    data.append('tor', file);
    data.append('fileName', file.name);
    return axios.post(`${CONTRACT_BASE}uploadTOR/${contractNumber}`, data)
      .then(response => response.statusText);
  },

  /**
   * @param  {string} poolCode Code of the pool
   * @param  {string} candReference Unique code of the expert
   * @return {Promise<object>} A promise to the data from the server
   */
  prepareAmendment(poolCode, candReference) {
    return axios.get(`${CONTRACT_BASE}prepareAmendment/pool/${poolCode}/expert/${candReference}`)
      .then(response => response.data);
  },
  /**
   * @param  {object} contractInfo Json object to post
   * @param  {string} poolCode Code of the pool
   * @param  {string} candReference Unique code of the expert
   * @return {Promise<object>} A promise to the data from the server
   */
  createAmendment(contractInfo, poolCode, candReference) {
    return axios.post(`${CONTRACT_BASE}createAmendment/${poolCode}/expert/${candReference}`, contractInfo)
      .then(response => response.data);
  },
};

export default ContractService;
