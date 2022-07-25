// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotEnv = require('dotenv')
const parsedEnv = dotEnv.config().parsed


module.exports = () => {
  for(let key in parsedEnv) {
    if(typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = JSON.stringify(parsedEnv[key])
    }
  }
  return parsedEnv;
}
