import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';
import Status from './Status.js';
import Confirm from './Confirm.js';
import Error from './Error.js';

export default function Appointment(props) {
  return (
    <article className='appointment' >
      <Header time={props.time} />
      {(props.interview) ? <Show interview={props.interview} /> : <Empty />}
    </article>
  );
}