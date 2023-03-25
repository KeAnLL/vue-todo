type LogLevelType = "log" | "info" | "error" | "warn" | "trace" | "debug";
type DbOperationType = "select" | "insert" | "update" | "delete";

const logger = (level: LogLevelType, from: String, ...args: any[]) => {
  console[level](`[${from}]`, ...args);
};

const dbLogger = (level: LogLevelType, operation: DbOperationType, action: String, ...args: any[]) => {
  logger(level, `db ${operation} => ${action}`, args);
};

const storeLogger = (level: LogLevelType, ...args: any[]) => {
  logger(level, "store", args);
};

export { dbLogger, storeLogger };
