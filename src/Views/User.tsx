import React, { Suspense } from 'react';

import styled from '../Theme/styled-components';
import RequestReviewList from '../Components/RequestReviewList';
import OpenPrList from '../Components/OpenPrList';
import IssueList from '../Components/IssuesList';
import Spinner from '../Components/Ui/Spinner';

const UserWrapper = styled.div`
  display: flex;
`;

const UserView: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '50px' }}>Personal dashboard</h1>
      <UserWrapper>
        <Suspense fallback={<Spinner />}>
          <div style={{ width: '50%', marginRight: '20px' }}>
            <RequestReviewList />
            <OpenPrList />
          </div>
          <div style={{ width: '50%', marginLeft: '20px' }}>
            <IssueList />
          </div>
        </Suspense>
      </UserWrapper>
    </div>
  );
};

export default UserView;
