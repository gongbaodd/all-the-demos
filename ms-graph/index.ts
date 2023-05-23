import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { User } from "@microsoft/microsoft-graph-types";
import settings from "./appSettings";
import * as graphHelper from "./graphHelper";
import {
  ChainedTokenCredential,
  ClientSecretCredential,
} from "@azure/identity";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { Client } from "@microsoft/microsoft-graph-client";

const rl = readline.createInterface({ input, output });

main();

async function main() {
  console.log("Welcome to the Microsoft Graph TypeScript Connect sample");

  let choice = 1;

  const { authProvider, credential, appClient } = initGrap();

  const choices = ["Display access token", "List users", "Make a Graph call"];
  while ([1, 2, 3].includes(choice)) {
    const choice = await rl.question(
      "What do you want to do?" +
        choices.map((c, i) => `\n${i + 1}. ${c}`).join("") +
        "\n"
    );

    switch (choice) {
      case "1":
        await displayAccessToken(credential);
        break;
      case "2":
        await listUsers(appClient);
        break;
      case "3":
        await makeGraphCall(appClient);
        break;
      default:
        console.log("Invalid choice");
    }
  }
}

function initGrap() {
  const credential = new ClientSecretCredential(
    settings.tenantId,
    settings.clientId,
    settings.clientSecret
  );

  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });

  const appClient = Client.initWithMiddleware({
    authProvider,
  });

  return { credential, authProvider, appClient };
}

async function displayAccessToken(credential: ClientSecretCredential) {
  const token = await credential.getToken(
    "https://graph.microsoft.com/.default"
  );
  console.log(token?.token);
  return token?.token;
}

async function listUsers(client: Client) {
  const result = await client
    .api("/users")
    .select(["displayName", "id", "mail"])
    .top(25)
    .orderby("displayName")
    .get();

  for (const user of result.value) {
    console.log(`User: ${user.displayName}`);
    console.log(`ID: ${user.id}`);
    console.log(`Email: ${user.mail ?? "Missing email"}`);
  }

  return result.value;
}

async function makeGraphCall(client: Client) {
  const result = await client.api("/applications").get();
  console.log(result.value);
}
