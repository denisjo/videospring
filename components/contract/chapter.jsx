import React, {PropTypes} from 'react';

import ContractActions from 'contractActions';
import Article from 'article';
import Panel from 'panel';

const Chapter = props => (
  <Panel
    id={props.id}
    title={props.title}
    handleToggle={ContractActions.toggleChapter}
    headerClasses="chapterHeading"
    isExpanded={props.view.isExpanded}
    isValid={props.isValid}
    hasChanges={props.hasChanges}
  >
    {props.articles.map(article => <Article key={article.id} isViewMode={props.isViewMode} {...article} />)}
  </Panel>
);

Chapter.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired,
  view: PropTypes.object,
  isViewMode: PropTypes.bool,
  hasChanges: PropTypes.bool,
};

export default Chapter;
