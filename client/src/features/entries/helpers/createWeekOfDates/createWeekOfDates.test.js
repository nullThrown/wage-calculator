import createWeekOfDates from './createWeekOfDates.js';
const date = new Date();

it(' should return something with a length of 7', () => {
  expect(createWeekOfDates(date)).toHaveLength(7);
});

describe.each(createWeekOfDates(date))('with params', (day) => {
  it(`${day.date} should be of type <Any>Date`, () => {
    expect(day).toHaveProperty('date', expect.any(Date));
  });
  it(`${day.entries} should be of type <Any>Array`, () => {
    expect(day).toHaveProperty('entries', expect.any(Array));
  });
});

const weekOfDates = createWeekOfDates(date);
let iterator = 1;
const paramWeek = weekOfDates.map((day) => {
  if (iterator === 7) iterator = 0;
  return { date: day.date, entries: day.entries, expected: iterator++ };
});
describe.each(paramWeek)('With params %s', ({ date, entries, expected }) => {
  it(`${date.getDay()} should be ${expected}`, () => {
    expect(date.getDay()).toBe(expected);
  });
});
