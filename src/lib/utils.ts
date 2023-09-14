import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'
import { BookAge } from "@prisma/client"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}

export const getBookAgeStringFromEnum = (bookAge: BookAge) => {
  if (bookAge === "ALMOST_NEW") {
    return "Almost new";
  } else if (bookAge === "LESS_THAN_2") {
    return "< 2 years";
  } else if (bookAge === "LESS_THAN_4") {
    return "< 4 years";
  } else if (bookAge === "LESS_THAN_6") {
    return "< 6 years";
  } else if (bookAge === "LESS_THAN_8") {
    return "< 8 years";
  } else if (bookAge === "MORE_THAN_8") {
    return "8 + years";
  }
};