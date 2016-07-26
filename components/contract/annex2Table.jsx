import React, {PropTypes} from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import ContractStore from 'stores/contractStore';

const Annex2Table = props => {
  const header = _.find(props.value, {id: 'daysCountingString'});
  const body = _.find(props.value, {id: 'actionsString'});
  const footer = _.find(props.value, {id: 'rapporteurString'});
  const tableData = [];
  // Create the rows of the table based on the string value we get from the props
  body.value.split('/').forEach(row => {
    const rowObject = {};
    row.split(';').forEach((cell, index) => { rowObject[`column-${index + 1}`] = cell; });
    tableData.push(rowObject);
  });
  // add manually the footer row
  const footerRow = {'column-1': footer.label};
  footer.value.split(';').forEach((cell, index) => { footerRow[`column-${index + 2}`] = cell; });
  tableData.push(footerRow);
  const callIds = ContractStore.getState().contractInfo.poolInfo.callIds;
  return (
    <div>
      <table
        id="annex2"
        className={classNames('table table-bordered table-striped table-condensed', {specOptionActive: props.isActive})}
      >
        <thead>
          <tr>
            <th>
              <div id="annex2ColumnsHeader"><span className="">{header.label}</span></div>
              <div id="annex2RowsHeader">{callIds.map((item, index) => (<p key={index}>{item}</p>))}</div>
            </th>
            {header.value.split(';').map((cell, cellIndex) => (<th key={cellIndex}><span>{cell}</span></th>))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>{Object.keys(row).map((cell, cellIndex) => (<td key={cellIndex}>{row[cell]}</td>))}</tr>)
          )}
        </tbody>
      </table>
    </div>
  );
};

Annex2Table.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.object),
  isActive: PropTypes.bool,
};

export default Annex2Table;
