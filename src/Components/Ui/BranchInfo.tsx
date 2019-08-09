import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BranchInfo: React.FC<{
  baseRefName: string;
  headRefName: string;
}> = ({ baseRefName, headRefName }) => {
  return (
    <div>
      <span>
        <FontAwesomeIcon
          style={{ marginRight: '5px' }}
          icon={['fas', 'code-branch']}
        />
        {baseRefName}
      </span>
      <span>
        <FontAwesomeIcon
          style={{ margin: '0 5px' }}
          icon={['fas', 'arrow-circle-left']}
        />
        {headRefName.substring(0, 30)}
        {headRefName.length > 30 && '...'}
      </span>
    </div>
  );
};

export default BranchInfo;
