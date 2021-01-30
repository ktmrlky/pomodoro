import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const Progress = () => {
  const now = 1;

  return <ProgressBar animated now={now} label={`${now}%`} variant="info" />;
};

export default Progress;
