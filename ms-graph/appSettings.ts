require("dotenv").config();

const settings = {
  clientId: process.env.CLIENT_ID ?? "",
  clientSecret: process.env.CLIENT_SECRET ?? "",
  tenantId: process.env.TENANT_ID ?? "",
};

console.log(settings);

export default settings;
