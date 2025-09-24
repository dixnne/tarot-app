
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center p-4">
    <div className="w-12 h-12 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;
