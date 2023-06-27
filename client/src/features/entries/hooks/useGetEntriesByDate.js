import { useQuery, queryCache } from 'react-query';
import { getAllEntries } from '../api/entries';
import formatReadableDate from 'util/formatReadableDate';

const filterEntriesByDate = (entries, date) => {
  const filterDate = formatReadableDate(date);
  entries.filter((entry) => {
    return formatReadableDate(entry.shiftDate) === filterDate;
  });
};

const useGetEntriesByDate = (filter, date) => {
  const {
    isLoading,
    isError,
    data: entries,
  } = useQuery(['entries', { filter: filter }], () => getAllEntries(filter), {
    select: () => filterEntriesByDate(entries, date),
  });
  return { isLoading, isError, entries };
};

export default useGetEntriesByDate;
