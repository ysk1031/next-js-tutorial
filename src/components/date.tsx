import { parseISO, format } from 'date-fns';
import React from "react";

export const Date: React.FC<{dateString: string}> = ({ dateString }: { dateString: string }) => {
  const date: Date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
};
