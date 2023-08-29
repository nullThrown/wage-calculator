import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import './CustomDatePicker.css';
const CustomDatePicker = ({ date, setDate }) => {
  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <input
      value={value}
      className='example-custom-input'
      onClick={onClick}
      onChange={onChange}
      ref={ref}></input>
  ));
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      maxDate={new Date()}
      customInput={<ExampleCustomInput />}
      dayClassName={() => 'example-datepicker-day-class'}
      popperClassName='example-datepicker-class'
      todayButton='TODAY'
    />
  );
};

export default CustomDatePicker;
