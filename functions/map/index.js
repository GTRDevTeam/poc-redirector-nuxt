const fs = require("fs").promises;
const path = require("path");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

exports.handler = async (event, context) => {
  const instance = event.headers.host.split(('.'))[0]
  const from = event.headers.referer.split(`${event.headers.host}/`)[1]
  try {
    const content = await fs.readFile(path.join(__dirname, instance, "store.json"), {
      encoding: "utf-8",
    });
    const store = JSON.parse(content);
    if (store[from]) {
      return {
        statusCode: 200,
        headers,
        body: store[from],
      };
    }
    return {
      statusCode: 200,
      headers,
      body: store["default"],
    };
  } catch (e) {
    return {
      statusCode: 404,
      headers,
      body: e.message,
    };
  }
};
