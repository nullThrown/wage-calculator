import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import './CustomDatePicker.css';

const CustomDatePicker = ({ date, onChange }) => {
  const CustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <input
      value={value}
      className='custom-input'
      onClick={onClick}
      onChange={onChange}
      ref={ref}></input>
  ));
  return (
    <DatePicker
      selected={date}
      onChange={onChange}
      maxDate={new Date()}
      customInput={<CustomInput />}
      dayClassName={() => 'datepicker-day-class'}
      popperClassName='datepicker-class'
      todayButton='TODAY'
    />
  );
};

export default CustomDatePicker;
