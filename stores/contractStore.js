/* eslint no-param-reassign: 0*/
// Probably we need to enable this rule and write the functions with map
import {createStore} from 'reflux';
import _ from 'lodash';
import {hashHistory} from 'react-router';

import ItemConstants from 'constants/itemConstants';
import Validator from 'validation/validator';
import ContractActions from 'contractActions';
import ContractHelper from 'services/contractHelper';
import ContractDatesService from 'services/contractDatesService';
import ContractService from 'services/contractService';
import NotificationsService from 'services/notificationsService';
import UIHelper from 'services/uiHelper';

const state = {
  loading: false,
  view: {
    sidebarIsVisible: true,
    isDocumentExpanded: false,
  },
  applyValidation: false,
};

let originalState = null;

const loadContractData = data => {
  state.contractInfo = data.contractInfo;
  ContractHelper.initializeContractContent(data.doc);
  // the specOptionsInfo property is used just to display the specific options in the quick fill area
  state.specOptionsInfo = ContractHelper.getSpecificOptionsInfo(data.doc);

  const generalOptionsInfo = [];
  state.contractInfo = data.contractInfo;
  if (data.doc.generalOptions) {
    data.doc.generalOptions.forEach(option => {
      generalOptionsInfo.push(_.assign({}, option));
    });
  }
  state.generalOptionsInfo = generalOptionsInfo;
  state.datesRules = ContractDatesService.getDatesRules(state.contractInfo.specOptions);
  state.document = ContractHelper.getUpdatedDocument(data.contractInfo.specOptions, data.doc);
  if (data.prevContractInfo) {
    state.previousContractInfo = data.prevContractInfo;
  }
  state.document.cover.view = {isExpanded: false};
  state.document.chapters.forEach(chapter => {
    chapter.view = {isExpanded: false};
    chapter.articles.forEach(article => {
      article.view = {isExpanded: true};
    });
  });
  state.document.annexes.forEach(annex => {
    annex.view = {isExpanded: false};
    if (annex.articles) {
      annex.articles.forEach(article => {
        article.view = {isExpanded: true};
      });
    }
  });
};

const updateDocumentExpansion = isExpanded => {
  state.document.cover.view.isExpanded = isExpanded;
  state.document.chapters.forEach(chapter => {
    chapter.view.isExpanded = isExpanded;
    chapter.articles.forEach(article => {
      article.view.isExpanded = isExpanded;
    });
  });
  state.document.annexes.forEach(annex => {
    annex.view.isExpanded = isExpanded;
    if (annex.articles) {
      annex.articles.forEach(article => {
        article.view.isExpanded = isExpanded;
      });
    }
  });
};

const specOptionFocus = id => {
  const updateArticles = nodeWithArticles => {
    nodeWithArticles.articles.forEach(article => {
      article.paragraphs.forEach(paragraph => {
        paragraph.items
          .filter(item => item.type !== ItemConstants.TEXT)
          .forEach(item => {
            if (item.id === id) {
              item.isActive = true;
              nodeWithArticles.view.isExpanded = true;
              article.view.isExpanded = true;
            } else {
              item.isActive = false;
            }
          });
      });
    });
  };
  state.document.chapters.forEach(updateArticles);
  state.document.annexes.forEach(annex => {
    if (annex.articles) {
      updateArticles(annex);
    } else {
      annex.paragraphs.forEach(paragraph => {
        paragraph.items
          .filter(item => item.type !== ItemConstants.TEXT)
          .forEach(item => {
            if (item.type !== ItemConstants.ANNEX2) {
              if (item.id === id) {
                item.isActive = true;
                annex.view.isExpanded = true;
                annex.view.isExpanded = true;
              } else {
                item.isActive = false;
              }
            } else {
              let itemIsActive = false;
              item.items.forEach(annex2Item => {
                if (annex2Item.id === id) {
                  annex2Item.isActive = true;
                  itemIsActive = true;
                  annex.view.isExpanded = true;
                } else {
                  annex2Item.isActive = false;
                }
                item.isActive = itemIsActive;
              });
            }
          });
      });
    }
  });
};

const specOptionBlur = id => {
  const updateArticles = nodeWithArticles => {
    nodeWithArticles.articles.forEach(article => {
      article.paragraphs.forEach(paragraph => {
        const itemToUpdate = _.find(paragraph.items, {id, isActive: true});
        if (itemToUpdate) {
          itemToUpdate.isActive = false;
        }
      });
    });
  };
  state.document.chapters.forEach(updateArticles);
  state.document.annexes.forEach(annex => {
    if (annex.articles) {
      updateArticles(annex);
    } else {
      annex.paragraphs.forEach(paragraph => {
        const itemToUpdate = _.find(paragraph.items, {id, isActive: true});
        if (itemToUpdate) {
          itemToUpdate.isActive = false;
        }
      });
      // annex 2 table options
      annex.paragraphs.forEach(paragraph => {
        paragraph.items
          .filter(item => item.type === ItemConstants.ANNEX2)
          .forEach(item => {
            const itemToUpdate = _.find(item.items, {id, isActive: true});
            if (itemToUpdate) {
              item.isActive = false;
              itemToUpdate.isActive = false;
            }
          });
      });
    }
  });
};

const getArticle = id => {
  let articleToUpdate;
  // first look at the articles inside chapters and then inside annexes
  for (const chapter of state.document.chapters) {
    articleToUpdate = _.find(chapter.articles, {id});
    if (articleToUpdate) {
      return articleToUpdate;
    }
  }
  for (const annex of state.document.annexes) {
    if (annex.articles) {
      articleToUpdate = _.find(annex.articles, {id});
    }
    if (articleToUpdate) {
      return articleToUpdate;
    }
  }
  return articleToUpdate;
};

const printValidationErrorsToConsole = () => {
  if (process.env.NODE_ENV !== 'production') {
    const errors = Validator.getValidationErros(state.contractInfo);
    errors.errors.forEach(error => {
      console.error(`Validation error during saving contract:
        Property missing: ${error.property}
        Entire error message: ${JSON.stringify(error)}
      `);
    });
  }
};

const ContractStore = createStore({
  listenables: ContractActions,

  init() {
    if (UIHelper.horizontalResolution < 1100) {
      state.view.sidebarIsVisible = false;
    }
  },

  isDirty() {
    if (!state.contractInfo || !originalState.contractInfo) {
      return false;
    }
    return !_.isEqual(state.contractInfo, originalState.contractInfo);
  },
  // This method is used only in one place just to have access to callIds list for annex2 table
  getState() {
    return state;
  },

  onPrepareContract() {
    state.loading = true;
    this.trigger(state);
  },
  onPrepareContractCompleted(data) {
    loadContractData(data);
    state.loading = false;
    originalState = _.cloneDeep(state);
    Validator.initializeValidationSchema(data.contractInfo.specOptions, data.contractInfo.poolInfo.isTermsOfReferenceRequired);
    this.trigger(state);
    NotificationsService.success('Contract loaded successfully');
  },
  onPrepareContractFailed(error) {
    state.loading = false;
    this.trigger(state);
    NotificationsService.error(`Failed to load contract: ${error.statusText}`);
  },

  onLoadContract() {
    state.loading = true;
    this.trigger(state);
  },
  onLoadContractCompleted(data) {
    loadContractData(data);
    state.loading = false;
    originalState = _.cloneDeep(state);
    Validator.initializeValidationSchema(data.contractInfo.specOptions, data.contractInfo.poolInfo.isTermsOfReferenceRequired);
    this.trigger(state);
    NotificationsService.success('Contract loaded successfully');
  },
  onLoadContractFailed(error) {
    state.loading = false;
    this.trigger(state);
    NotificationsService.error(`Failed to load contract: ${error.statusText}`);
  },

  onAddTermOfReference(file) {
    state.termsOfReferenceFile = file;
    state.contractInfo.termsOfReference = file.name;
    this.trigger(state);
  },

  onCreateContract(poolCode, candReference) {
    if (Validator.isContractValid(state.contractInfo)) {
      const objectToPost = _.assign({}, state.contractInfo);
      delete objectToPost.poolInfo;
      delete objectToPost.expertInfo;
      let contractNumber = null;

      state.loading = true;
      const {isTermsOfReferenceRequired} = state.contractInfo.poolInfo;
      state.view.loaderMessage = isTermsOfReferenceRequired ?
        'Step 1/2: creating the contract' :
        'Creating the contract';
      ContractService.createContract(objectToPost, poolCode, candReference)
        .then(data => {
          contractNumber = data.contractNumber;
          if (isTermsOfReferenceRequired) {
            state.view.loaderMessage = 'Step 2/2: uploading the terms of reference';
            this.trigger(state);
            return ContractService.uploadTermOfReference(state.termsOfReferenceFile, contractNumber);
          }
          ContractActions.createContract.completed(contractNumber);
          return null;
        })
        .then(message => {
          if (message === 'OK') {
            ContractActions.createContract.completed(contractNumber);
          }
        })
        .catch(error => {
          if (error.status === 500) {
            ContractActions.createContract.failed(error.statusText);
          } else {
            NotificationsService.error('Failed upload the term of reference but the contract has been created');
            state.loading = false;
            this.trigger(state);
            hashHistory.push(`/editcontract/${contractNumber}`);
          }
        });
    } else {
      NotificationsService.warning('You need to fill some required fields', 'Validation Errors');
      printValidationErrorsToConsole();
      state.applyValidation = true;
    }
    this.trigger(state);
  },
  onCreateContractCompleted(contractNumber) {
    // Both contract and terms of reference have been saved successfully
    // we need to redirect to the edit route at this stage
    originalState = _.cloneDeep(state);
    state.view.loaderMessage = '';
    state.loading = false;
    this.trigger(state);
    hashHistory.push(`/editcontract/${contractNumber}`);
  },
  onCreateContractFailed(error) {
    state.view.loaderMessage = '';
    state.loading = false;
    this.trigger(state);
    NotificationsService.error(`Failed to save the contract: ${error}`);
  },

  onUpdateContract(contractNumber) {
    if (Validator.isContractValid(state.contractInfo)) {
      const objectToPost = _.assign({}, state.contractInfo);
      delete objectToPost.poolInfo;
      delete objectToPost.expertInfo;

      const {isTermsOfReferenceRequired} = state.contractInfo.poolInfo;
      state.view.loaderMessage = (isTermsOfReferenceRequired && state.termsOfReferenceFile) ? 'Step 1/2: updating the contract' : 'Updating the contract';
      state.loading = true;
      this.trigger(state);
      
      ContractService.updateContract(objectToPost, contractNumber)
        .then(data => {
          // If termsOfreference is present means that the user has selected a new file
          // so we need to updload it as part of the updated process
          if (isTermsOfReferenceRequired && state.termsOfReferenceFile) {
        	  state.view.loaderMessage = 'Step 2/2: uploading the terms of reference';
        	  this.trigger(state);
            ContractService.uploadTermOfReference(state.termsOfReferenceFile, contractNumber)
            .then(() => ContractActions.createContract.completed(data.contractNumber))
            .catch(error => ContractActions.updateContract.failed(error));
          } else {
            ContractActions.updateContract.completed(data);
          }
        })
        .catch(error => ContractActions.updateContract.failed(error));
    } else {
      state.applyValidation = true;
      NotificationsService.warning('You need to fill some required fields', 'Validation Errors');
      printValidationErrorsToConsole();
      this.trigger(state);
    }
  },
  onUpdateContractCompleted(data) {
    NotificationsService.success(data.status);
    originalState = _.cloneDeep(state);
    state.loading = false;
    this.trigger(state);
  },
  onUpdateContractFailed(error) {
    state.loading = false;
    this.trigger(state);
    NotificationsService.error(`Failed to update the contract: ${error}`);
  },

  onPrepareAmendment() {
    state.loading = true;
    this.trigger(state);
  },
  onPrepareAmendmentCompleted(data) {
    loadContractData(data);
    state.loading = false;
    originalState = _.cloneDeep(state);
    Validator.initializeValidationSchema(data.contractInfo.specOptions, data.contractInfo.poolInfo.isTermsOfReferenceRequired);
    this.trigger(state);
    NotificationsService.success('Contract loaded successfully');
  },
  onPrepareAmendmentFailed(error) {
    state.loading = false;
    this.trigger(state);
    NotificationsService.error(`Failed to load contract: ${error}`);
  },

  onCreateAmendment(poolCode, candReference) {
    if (Validator.isContractValid(state.contractInfo)) {
      const objectToPost = _.assign({}, state.contractInfo);
      delete objectToPost.poolInfo;
      delete objectToPost.expertInfo;
      let contractNumber = null;

      state.loading = true;
      const {isTermsOfReferenceRequired} = state.contractInfo;
      state.view.loaderMessage = isTermsOfReferenceRequired ?
        'Step 1/2 creating the amendment' :
        'Creating the amendment';
      ContractService.createAmendment(objectToPost, poolCode, candReference)
        .then(data => {
          contractNumber = data.contractNumber;
          if (isTermsOfReferenceRequired && state.termsOfReferenceFile) {
            state.view.loaderMessage = 'Step 2/2: uploading the terms of reference';
            this.trigger(state);
            ContractService.uploadTermOfReference(state.termsOfReferenceFile, contractNumber)
            .then(() => ContractActions.createAmendment.completed(contractNumber))
            .catch(error => {
              NotificationsService
                .error(`Failed to upload the term of reference with error: ${error.statusText}
                        but the ammendment has been created`);
              state.view.loaderMessage = '';
              state.loading = false;
              this.trigger(state);
              originalState = _.cloneDeep(state);
              hashHistory.push(`/editcontract/${contractNumber}`);
            });
          } else {
            ContractActions.createAmendment.completed(contractNumber);
          }
        })
        .catch(error => {
          ContractActions.createAmendment.failed(error.statusText);
        });
    } else {
      NotificationsService.warning('You need to fill some required fields', 'Validation Errors');
      printValidationErrorsToConsole();
      state.applyValidation = true;
    }
    this.trigger(state);
  },
  onCreateAmendmentCompleted(contractNumber) {
    // Both contract and terms of reference have been saved successfully
    // we need to redirect to the edit route at this stage
    NotificationsService.success('Amendement created successfully');
    originalState = _.cloneDeep(state);
    state.view.loaderMessage = '';
    state.loading = false;
    this.trigger(state);
    hashHistory.push(`/editcontract/${contractNumber}`);
  },
  onCreateAmendmentFailed(error) {
    state.loading = false;
    this.trigger(state);
    NotificationsService.error(`Failed to create the amendment: ${error}`);
    printValidationErrorsToConsole();
  },

  onUpdateContractInfo(newValue) {
    _.assign(state.contractInfo, newValue);
    this.trigger(state);
  },
  onUpdateGeneralOption(itemId, value) {
    state.contractInfo.specOptions[itemId] = value;
    this.trigger(state);
  },
  onUpdateGeneralOptions() {
    const objectToPost = _.assign({}, state.contractInfo);
    delete objectToPost.poolInfo;
    delete objectToPost.expertInfo;
    ContractActions.refreshContract(
      state.contractInfo.poolInfo.code,
      state.contractInfo.expertInfo.candidatureReference,
      objectToPost
    );
    state.loading = true;
    this.trigger(state);
  },
  onRefreshContractCompleted(data) {
    data.contractInfo.poolInfo = _.assign({}, state.contractInfo.poolInfo);
    data.contractInfo.expertInfo = _.assign({}, state.contractInfo.expertInfo);
    data.contractInfo.specOptions = _.assign({}, state.contractInfo.specOptions);
    loadContractData(data);
    state.loading = false;
    originalState = _.cloneDeep(state);
    Validator.initializeValidationSchema(data.contractInfo.specOptions, data.contractInfo.poolInfo.isTermsOfReferenceRequired);
    this.trigger(state);
    NotificationsService.success('Contract refreshed successfully');
  },
  onRefreshContractFailed(data) {
    NotificationsService.warning(JSON.stringify(data));
  },

  onUpdateDocument(itemId, value) {
    state.contractInfo.specOptions[itemId] = value;
    const days = ContractHelper.getTotalWorkingDays(state.contractInfo.specOptions);
    state.contractInfo.centralWorkingDays = days.centralWorkingDays;
    state.contractInfo.remoteWorkingDays = days.remoteWorkingDays;
    state.datesRules = ContractDatesService.getDatesRules(state.contractInfo.specOptions);
    state.document = ContractHelper.getUpdatedDocument(
        state.contractInfo.specOptions,
        state.document,
        state.previousContractInfo ? state.previousContractInfo.specOptions : null
      );
    this.trigger(state);
  },

  onToggleSidebar() {
    state.view.sidebarIsVisible = !state.view.sidebarIsVisible;
    this.trigger(state);
  },
  onCollapseAll() {
    state.view.isDocumentExpanded = false;
    updateDocumentExpansion(false);
    this.trigger(state);
  },
  onExpandAll() {
    state.view.isDocumentExpanded = true;
    updateDocumentExpansion(true);
    this.trigger(state);
  },
  onToggleCover() {
    state.document.cover.view.isExpanded = !state.document.cover.view.isExpanded;
    this.trigger(state);
  },
  onToggleChapter(chapterId) {
    const chapterToUpdate = _.find(state.document.chapters, {id: chapterId});
    chapterToUpdate.view.isExpanded = !chapterToUpdate.view.isExpanded;
    this.trigger(state);
  },
  onToggleArticle(articleId) {
    const articleToUpdate = getArticle(articleId);
    articleToUpdate.view.isExpanded = !articleToUpdate.view.isExpanded;
    this.trigger(state);
  },
  onToggleAnnex(annexId) {
    const annexToUpdate = _.find(state.document.annexes, {id: annexId});
    annexToUpdate.view.isExpanded = !annexToUpdate.view.isExpanded;
    this.trigger(state);
  },

  onSpecOptionFocus(specOptionId) {
    specOptionFocus(specOptionId);
    this.trigger(state);
  },
  onSpecOptionBlur(specOptionId) {
    specOptionBlur(specOptionId);
    this.trigger(state);
  },
});

export default ContractStore;
