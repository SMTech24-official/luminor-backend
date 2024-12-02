"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNestedJSON = void 0;
const isJSONString = (str) => {
    return ((str.startsWith("{") && str.endsWith("}")) || // Check for JSON object
        (str.startsWith("[") && str.endsWith("]")) // Check for JSON array
    );
};
const parseNestedJSON = (req, res, next) => {
    console.log(req.body, "from parse nested json");
    for (const key in req.body) {
        if (typeof req.body[key] === "string" && isJSONString(req.body[key])) {
            try {
                req.body[key] = JSON.parse(req.body[key]); // Parse JSON strings
            }
            catch (err) {
                console.error(`Error parsing JSON for key "${key}": ${err.message}`);
                // Retain original string value if parsing fails
            }
        }
    }
    next(); // Ensure the next middleware is called
};
exports.parseNestedJSON = parseNestedJSON;
