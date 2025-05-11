import { createLogger, transports, format } from "winston"
import DailyRotateFile from "winston-daily-rotate-file"
import path from "path"
import fs from "fs"

/**
 * Path to the logs' directory.
 */
const LogsDirectory = path.join(process.cwd(), "/logs")

// Ensure the logs directory exists
if (!fs.existsSync(LogsDirectory)) {
    fs.mkdirSync(LogsDirectory, { recursive: true })
}

/**
 * Winston logger instance for handling application logs.
 */
const logger = createLogger({
    level: "info", // Default log level
    format: format.combine(
        // Add a timestamp to each log
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        // Define the log message format
        format.printf(({ timestamp, level, message }) => `[${timestamp}] [${level}]: ${message}`),
    ),
    transports: [
        // Transport for daily rotated info logs
        new DailyRotateFile({
            filename: path.join(LogsDirectory, "info-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d", // Keep logs for 14 days
        }),
        // Transport for daily rotated error logs
        new DailyRotateFile({
            filename: path.join(LogsDirectory, "error-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            level: "error",
            zippedArchive: true,
            maxSize: "10m",
            maxFiles: "7d", // Keep logs for 7 days
        }),
        // Transport for console logging
        new transports.Console({
            format: format.combine(
                format.colorize(), // Add colors to console logs
                format.printf(({
                    timestamp,
                    level,
                    message,
                }) => `[${timestamp}] [${level}]: ${message}`),
            ),
        }),
    ],
})

export default logger