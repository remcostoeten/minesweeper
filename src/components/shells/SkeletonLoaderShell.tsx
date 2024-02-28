import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 25 }).map((_, idx) => (
        <div
          key={idx}
          className="h-10 w-10 bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
