import { assert } from 'console'
const hmac = async (key: any, url: string) => ((await import('./crypt')).default).hmac(key, url)

if(require.main === module) {
    require('dontenv/config')
    const { HMAC_KEY: key } = process.env
    assert(key != null, 'HMAC Key should be set to check the HMAC')
    const url = process.argv[2]
    assert(url != null, 'Please provide url as params')
    assert(url.charAt(0) === '/', 'url should be started with slash')
    process.stdout.write(await hmac(key, url))
}
