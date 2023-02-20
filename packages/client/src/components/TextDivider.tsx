import React from 'react';

interface TextDividerProps {
  text: string;
}

const TextDivider: React.FC<TextDividerProps> = ({ text }) => (
  <div className="flex items-center py-[15px] w-full">
    <hr className="w-full" />
    <span className="text-[12px] py-[2px] px-[6px]">{text}</span>
    <hr className="w-full" />
  </div>
);

export default React.memo(TextDivider);
