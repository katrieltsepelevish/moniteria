import React from 'react';

import HeartbeatItem from './HeartbeatItem';

export interface HeartbeatState {
  _id: string;
  monitorId: string;
  status: number;
  statusText: string;
  duration: number;
  down: boolean;
}

interface HeartbeatProps {
  heartbeat: HeartbeatState[];
}

const AXIOS_TIMEOUT_INTERVAL = 5; //seconds

const Heartbeat: React.FC<HeartbeatProps> = ({ heartbeat }) => {
  return (
    <div className="mt-6 flex flex-row gap-[2px] h-[60px] items-end justify-end">
      {heartbeat.length > 0 &&
        heartbeat.map((beat: HeartbeatState, index) => {
          const percentage = Math.round(
            100 - (beat.duration / AXIOS_TIMEOUT_INTERVAL) * 100
          );

          return (
            <HeartbeatItem
              key={index}
              percentage={percentage}
              failed={beat.down}
            />
          );
        })}
    </div>
  );
};

export default React.memo(Heartbeat);
