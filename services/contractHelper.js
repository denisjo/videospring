/* eslint no-param-reassign: 0*/
// Probably we need to enable this rule and write the functions with map
import _ from 'lodash';
import uuid from 'uuid';

import ItemConstants from 'constants/itemConstants';

const centralWorkingDaysOptionsIds = [
  'wdAttendingBriefing',
  'wdCentralEvaluation',
  'wdfapm',
  'wdfarm',
  'wdfatm',
];
const remoteWorkingDaysOptionsIds = [
  'wdRemoteEvaluation',
  'wdRemotePreparation',
  'wdFinalisingReport',
  'wdfrw',
];

export default {
  /**
   * Traverses all the text items in the document and assigns them an id
   * in order to avoid not required rerender and improve performance
   * @param {obj} doc the contract document
   */
  initializeContractContent(doc) {
    const initializeParagraphs = paragraphs => {
      paragraphs.forEach(paragraph => {
        paragraph.items
                .filter(item => item.type === ItemConstants.TEXT)
                .forEach(item => {
                  item.id = uuid.v4();
                });
      });
    };
    initializeParagraphs(doc.cover.paragraphs);
    doc.chapters.forEach(chapter => {
      chapter.articles.forEach(article => {
        initializeParagraphs(article.paragraphs);
      });
    });
    doc.annexes.forEach(annex => {
      if (annex.articles) {
        annex.articles.forEach(article => {
          initializeParagraphs(article.paragraphs);
        });
      } else {
        initializeParagraphs(annex.paragraphs);
      }
    });
  },

   /**
   * Creates and Returns an array containing all the specific options with types based on the suplied document object
   * @param {obj} doc the contract document
   * @return {array} an array with the specific options with their values
   */
  getSpecificOptionsInfo(doc) {
    const result = [];
    const addOptionsForArticles = articles => {
      articles.forEach(article => {
        article.paragraphs.forEach(paragraph => {
          result.push(...paragraph.items
            .filter(item => item.type !== ItemConstants.TEXT)
            .map(item => _.assign({}, item))
          );
        });
      });
    };
    doc.chapters.forEach(chapter => {
      addOptionsForArticles(chapter.articles);
    });
    doc.annexes.forEach(annex => {
      if (annex.articles) {
        addOptionsForArticles(annex.articles);
      } else {
        // Case for annex2
        annex.paragraphs.forEach(paragraph => {
          paragraph.items
            .filter(item => item.type !== ItemConstants.TEXT)
            .forEach(item => {
              if (item.type !== ItemConstants.ANNEX2) {
                result.push(_.assign({}, item));
              } else {
                result.push(...item.items.map(annex2Item => {
                  // This is a hacky way to present the body of annex2 table as text area
                  if (annex2Item.id === 'actionsString') {
                    return _.assign({}, annex2Item, {type: ItemConstants.ANNEX2});
                  }
                  return _.assign({}, annex2Item);
                }));
              }
            });
        });
      }
    });
    return result;
  },

  /**
   * Creates and Returns an array containing all the specific options with types based on the suplied document object
   * @param {obj} context an object containing the specific options with their values
   * @param {obj} doc the contract document
   * @param {obj} previousContext optional parameter with the specific options and their values
   * from the previous contract state
   * @return {object} the updated document
   */
  getUpdatedDocument(context, doc, previousContext) {
    const updateEntityWithArticles = entityWithArticles => {
      entityWithArticles.isValid = true;
      entityWithArticles.hasChanges = false;
      entityWithArticles.articles.forEach(article => {
        article.isValid = true;
        article.hasChanges = false;
        article.paragraphs.forEach(paragraph => {
          paragraph.isValid = true;
          paragraph.hasChanges = false;
          paragraph.items
                  .filter(item => item.type !== ItemConstants.TEXT)
                  .forEach(item => {
                    item.value = context[item.id];
                    item.isValid = item.value !== '';
                    if (paragraph.isValid) {
                      paragraph.isValid = item.isValid;
                    }
                    if (!paragraph.hasChanges && previousContext && item.value !== previousContext[item.id]) {
                      paragraph.hasChanges = true;
                    }
                  });
          if (article.isValid) {
            article.isValid = paragraph.isValid;
          }
          if (!article.hasChanges) {
            article.hasChanges = paragraph.hasChanges;
          }
        });
        if (entityWithArticles.isValid) {
          entityWithArticles.isValid = article.isValid;
        }
        if (!entityWithArticles.hasChanges) {
          entityWithArticles.hasChanges = article.hasChanges;
        }
      });
    };
    doc.chapters.forEach(updateEntityWithArticles);
    doc.annexes.forEach(annex => {
      if (annex.articles) {
        updateEntityWithArticles(annex);
      }
    });
    const annex2 = _.find(doc.annexes, {id: 'annex2'});
    if (annex2) {
      annex2.isValid = true;
      annex2.hasChanges = false;
      annex2.paragraphs.forEach(paragraph => {
        paragraph.isValid = true;
        paragraph.hasChanges = false;
        paragraph.items.filter(item => item.type !== ItemConstants.TEXT)
        .forEach(item => {
          if (item.type !== ItemConstants.ANNEX2) {
            item.value = context[item.id];
            item.isValid = item.value !== '';
            if (paragraph.isValid) {
              paragraph.isValid = item.isValid;
            }
            if (!paragraph.hasChanges && previousContext && item.value !== previousContext[item.id]) {
              paragraph.hasChanges = true;
            }
          } else {
            // Here we are sure that it's the case of annex2 table that it's the only one
            item.items.forEach(annex2TableItem => {
              annex2TableItem.value = context[annex2TableItem.id];
            });
            // This is a work arround as all the specific options have a field value
            // and we don't want to break that convention
            item.value = item.items;
          }
          if (annex2.isValid) {
            annex2.isValid = paragraph.isValid;
          }
          if (!annex2.hasChanges) {
            annex2.hasChanges = paragraph.hasChanges;
          }
        });
      });
    }
    return doc;
  },

  /**
   * Calculates the total central and remote working days
   * @param  {object} specificOptions an object with all specific options and their values
   * @return {object} an object containing the central and remote working days
   */
  getTotalWorkingDays(specificOptions) {
    let centralWorkingDays = 0;
    let remoteWorkingDays = 0;
    Object.keys(specificOptions).forEach(key => {
      if (_.includes(centralWorkingDaysOptionsIds, key)) {
        const numberValue = Number(specificOptions[key]);
        if (!isNaN(numberValue)) {
          centralWorkingDays += numberValue;
        }
      } else if (_.includes(remoteWorkingDaysOptionsIds, key)) {
        const numberValue = Number(specificOptions[key]);
        if (!isNaN(numberValue)) {
          remoteWorkingDays += numberValue;
        }
      }
    });
    return {centralWorkingDays, remoteWorkingDays};
  },
};
