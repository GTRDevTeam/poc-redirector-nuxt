const algoliasearch = require("algoliasearch")
const crypto = require("crypto")

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const ALGOLIA_APP_ID = "F1XZFUDSPJ"
const ALGOLIA_API_KEY = "fb71ffe2a825e195b385aeb276330b9a"

exports.handler = async (event, context) => {
  const from = event.headers.referer.split(`${event.headers.host}/`)[1]
  const instance = event.headers.host.split(".")[0]
  try {
    const hashed_instance = crypto.createHash("md5").update(instance).digest("hex")
    const ALGOLIA_CLIENT = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const INDEX = ALGOLIA_CLIENT.initIndex(`redirect_${hashed_instance}`)
    const hashed_from = crypto.createHash("md5").update(from).digest("hex")
    response = await INDEX.getObject(hashed_from)

    return {
      statusCode: 200,
      headers,
      // body: JSON.stringify(response),
      body: from
    }
  } catch (e) {
    return {
      statusCode: 404,
      headers,
      body: from,
    }
  }
}
