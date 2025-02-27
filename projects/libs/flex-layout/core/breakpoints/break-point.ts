export interface BreakPoint {
  mediaQuery: string;
  alias: string;
  suffix?: string;
  overlapping?: boolean; // Does this range overlap with any other ranges
  priority?: number; // determine order of activation reporting: higher is last reported
}
