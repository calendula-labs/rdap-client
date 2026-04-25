const { RdapClient } = require('../src');
const { path } = require('path');

function printUsage(app, script) {
  const relativeAppPath = path.basename(app);
  const relativeScriptPath = path.relative(process.cwd(), script);

  console.error(`Usage: ${relativeAppPath} ${relativeScriptPath} <ip-address>`);
  console.error(`Example: ${relativeAppPath} ${relativeScriptPath} 8.8.8.8`);
}

async function main() {
  const args = process.argv;

  if (args.length !== 3) {
    console.error('Error: Invalid arguments.\n');

    printUsage(args[0], args[1]);
    process.exit(1);
  }

  const ip = args[2];

  const client = new RdapClient();
  const network = await client.lookupIp(ip);

  console.log(JSON.stringify({
    handle: network.handle,
    name: network.name,
    country: network.country,
    ipVersion: network.ipVersion,
    cidrCount: network.cidrs.length,
    entityCount: network.entities.length,
    firstEntityHandle: network.entities[0] ? network.entities[0].handle : null,
    links: network.links ? network.links : null,
  }, null, 2));

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
