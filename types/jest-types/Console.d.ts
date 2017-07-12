export type LogMessage = string;
export interface LogEntry {
  message: LogMessage;
  origin: string;
  type: LogType;
}
export type LogType = 'log' | 'info' | 'warn' | 'error';
export type ConsoleBuffer = LogEntry[];
