import OAuth from "oauth-1.0a";
import crypto from "crypto";

const oauth = OAuth({
  consumer: {
    key: process.env.API_KEY,
    secret: process.env.API_SECRET_KEY
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

export default oauth;
