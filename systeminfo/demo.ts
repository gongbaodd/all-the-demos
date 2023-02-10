// deno run --allow-env --allow-sys --allow-read --allow-run demo.ts
import si from "npm:systeminformation@5";

si.get({
  cpu: "*",
  osInfo: "*",
  system: "*",
  uuid: "*",
  bios: "*",
  baseboard: "*",
  mem: "*",
}).then((data) => console.log(data));

si.cpuCurrentSpeed((data) => console.log(data));
