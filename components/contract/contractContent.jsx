import React, {PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import classNames from 'classnames';

import ContractActions from 'contractActions';
import Panel from 'panel';
import Article from './article';
import Chapter from 'chapter';
import Paragraph from 'paragraph';

import maximizeIcon from 'images/maxic.png';
import minimizeIcon from 'images/minic.png';

const ContractContent = props => {
  const coverParagraphs = props.cover.paragraphs.map(paragraph =>
    <Paragraph key={paragraph.id} {...paragraph} />);

  const chapters = props.chapters.map(chapter =>
    <Chapter key={chapter.id} isViewMode={props.isViewMode} {...chapter} />
  );
  const annexes = [];
  annexes.push(...props.annexes.map(annex => {
    if (annex.articles) {
      return (
        <Panel
          key={annex.id}
          id={annex.id}
          title={annex.title.map(item => item.text).join()}
          handleToggle={ContractActions.toggleAnnex}
          headerClasses="annexHeading"
          isExpanded={annex.view.isExpanded}
          isValid={annex.isValid}
          hasChanges={annex.hasChanges}
        >
          {annex.articles.map(article => <Article key={article.id} isViewMode={props.isViewMode} {...article} />)}
        </Panel>
      );
    }
    return (
      <Panel
        key={annex.id}
        id={annex.id}
        title={annex.title.map(item => item.text).join()}
        handleToggle={ContractActions.toggleAnnex}
        headerClasses="annexHeading"
        isExpanded={annex.view.isExpanded}
        isValid={annex.isValid}
        hasChanges={annex.hasChanges}
      >
        {annex.paragraphs.map(paragraph => <Paragraph key={paragraph.id} {...paragraph} />)}
      </Panel>
    );
  }));
  const contentStyle = {
    maxHeight: `${props.maxHeight}px`,
  };
  return (
    <div id="contractContent">
      <Row id="contractContentTitle">
        <Col md={4} mdOffset={8}>
          <a onClick={ContractActions.collapseAll} className="pull-right">
            <img src={minimizeIcon} alt="minimize" />
            Collapse all
          </a>
          <a onClick={ContractActions.expandAll} className="pull-right">
            <img src={maximizeIcon} alt="maximize" />
            Expand all
          </a>
        </Col>
      </Row>
      <Row
        id="contractContentArea"
        className={classNames('resizable', {disabled: props.isViewMode})}
        style={contentStyle}
      >
        <Col md={12}>
          <Panel
            id={props.cover.id}
            title="Cover"
            handleToggle={ContractActions.toggleCover}
            headerClasses="coverHeading"
            isExpanded={props.cover.view.isExpanded}
          >
            {coverParagraphs}
          </Panel>
          {chapters}
          {annexes}
        </Col>
      </Row>
    </div>
  );
};

ContractContent.propTypes = {
  cover: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired,
  annexes: PropTypes.array.isRequired,
  maxHeight: PropTypes.number.isRequired,
  isViewMode: PropTypes.bool,
};

export default ContractContent;
