const { FALLBACK } = process.env || "google.com"
const algoliasearch = require("algoliasearch")
const crypto = require("crypto")
const winston = require("winston")
const { Loggly } = require("winston-loggly-bulk")

winston.add(
  new Loggly({
    token: "8843034e-85cd-469c-827b-01acc453a0c9",
    subdomain: "gtrtest",
    tags: ["Winston-NodeJS"],
    json: true,
  })
)

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
}

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY

exports.handler = async event => {
  try {
    const from = event.headers.referer.split(`${event.headers.host}/`)[1]
    const instance = event.headers.host.split(".")[0]
    const hashed_instance = crypto.createHash("md5").update(instance).digest("hex")
    const hashed_from = crypto.createHash("md5").update(from).digest("hex")
    const ALGOLIA_CLIENT = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    const INDEX = ALGOLIA_CLIENT.initIndex(`redirect_${hashed_instance}`)
    try {
      response = await INDEX.getObject(hashed_from)
      winston.log('info', JSON.stringify({from, instance, response}))
      return {
        statusCode: 200,
        headers,
        body: response.r,
      }
    }
    catch (e) {
      // Object does not exist -> returns client-specific fallback
      response = await INDEX.getObject("fallback")
       return {
         statusCode: 200,
         headers,
         body: response.r,
       }
    }
  } catch (e) {
    // Index does not exist or any other error -> returns hard coded client-agnostic fallback
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({FALLBACK, ALGOLIA_APP_ID}),
    }
  }
}
