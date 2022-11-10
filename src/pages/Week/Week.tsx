import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Week.module.scss';
import windIcon from '../../assets/icons/wind.svg';
import humidityIcon from '../../assets/icons/humidity.svg';

// 1M7CwWRJiJBt9ktm6GSBtXw06OJ6QZGM
const Week = () => {
  const [webcams, setWebcams] = useState([]);

  useEffect(() => {
    axios.get('https://api.windy.com/api/webcams/v2/?key=1M7CwWRJiJBt9ktm6GSBtXw06OJ6QZGM').then((response) => {
      setWebcams(response.data);
    });
  }, []);

  return (

    <div>
      {JSON.stringify(webcams)}
    </div>
  );
};

export { Week };
