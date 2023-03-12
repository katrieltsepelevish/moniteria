import React from 'react';
import ClassNames from 'classnames';

interface HeartbeatItemProps {
  percentage: number;
  failed: boolean;
}

const HeartbeatItem: React.FC<HeartbeatItemProps> = ({
  percentage,
  failed,
}) => {
  const height = React.useMemo(
    () => Math.round(((60 * 100) / 100) * (percentage / 100)),
    [percentage]
  );

  const classes = React.useMemo(
    () =>
      ClassNames('w-1/12 max-h-[60px]', {
        'bg-[#e20000]': failed,
        'bg-[#03c603]': !failed,
      }),
    [failed]
  );

  return <div className={classes} style={{ height: `${height || 1}px` }} />;
};

export default React.memo(HeartbeatItem);
