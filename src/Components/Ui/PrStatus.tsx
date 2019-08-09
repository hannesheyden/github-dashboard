import React from 'react';
import styled from '../../Theme/styled-components';

const Status = styled.div<{ mergeState: 'ready' | 'blocked' | 'warning' }>`
  height: 30px;
  padding: 0px 20px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${props =>
    props.mergeState === 'ready'
      ? props.theme.colors.success
      : props.mergeState === 'blocked'
      ? props.theme.colors.error
      : props.theme.colors.warning};
`;

const PrStatus: React.FC<{ mergeStateStatus: string }> = ({
  mergeStateStatus
}) => {
  const mergeState =
    mergeStateStatus === 'CLEAN'
      ? 'ready'
      : mergeStateStatus === 'BLOCKED'
      ? 'blocked'
      : 'warning';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <span
        style={{
          textTransform: 'uppercase',
          color: '#9b9b9b',
          fontWeight: 'bold',
          fontSize: '12px',
          marginRight: '5px'
        }}
      >
        Status:
      </span>
      <Status mergeState={mergeState}>{mergeState}</Status>
    </div>
  );
};

export default PrStatus;
