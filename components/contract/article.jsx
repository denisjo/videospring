import React, {PropTypes} from 'react';

import ContractActions from 'contractActions';
import Panel from 'panel';
import Paragraph from 'paragraph';

const Article = props => (
  <Panel
    id={props.id}
    title={props.title}
    handleToggle={ContractActions.toggleArticle}
    classes={props.view.isExpanded ? 'articleExpaned' : 'articleCollapsed'}
    isExpanded={props.view.isExpanded}
    isValid={props.isValid}
    hasChanges={props.hasChanges}
  >
    {props.paragraphs.map(par => <Paragraph key={par.id} isViewMode={props.isViewMode} {...par} />)}
  </Panel>
);

Article.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  hasChanges: PropTypes.bool,
  paragraphs: PropTypes.array.isRequired,
  view: PropTypes.object,
  isViewMode: PropTypes.bool,
};

export default Article;
