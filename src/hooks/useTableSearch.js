import { useState, useMemo } from 'react';

export default function useTableSearch(data, columns) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(item => {
      return columns.some(col => {
        const value = item[col.key];
        if (value == null) return false;
        
        const stringValue = typeof value === 'string' 
          ? value 
          : String(value);
        
        return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, columns]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    hasSearch: searchTerm.length > 0,
    searchResultsCount: filteredData.length,
    totalDataCount: data.length
  };
}