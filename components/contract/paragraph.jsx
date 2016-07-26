import React, {PropTypes} from 'react';

import ContractContentItem from 'contractContentItem';

const Paragraph = props => (
  <div className={`contractParagraph indentLevel${props.indentLevel}`}>
    <span className="paragraphNumberingValue">
      {props.numberingValue}
    </span>
    {props.items.map(item => <ContractContentItem key={item.id} readOnly={props.isViewMode} {...item} />)}
  </div>
);

Paragraph.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  indentLevel: PropTypes.number.isRequired,
  numberingValue: PropTypes.string,
  isViewMode: PropTypes.bool,
};

export default Paragraph;
