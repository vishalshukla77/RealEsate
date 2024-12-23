import { useQuery } from '@tanstack/react-query'; // Correct import for React Query
import { getAllProperties } from '../utlis/api';  // Fix the import path if necessary

function useProperties() {
  const { data, isError, isLoading ,refetch} = useQuery(
    'allProperties',  // The key to identify the query
    getAllProperties,  // Function to fetch data
    { refetchOnWindowFocus: false }  // Prevent refetching when window is focused
  );

  return { data, isError, isLoading ,refetch};  // Return the data, error state, and loading state
}

export default useProperties;