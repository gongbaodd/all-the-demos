import * as OneDriveApi from "npm:onedrive-api";
import * as DotEnv from "npm:dotenv";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  OneDriveApi.items.listChildren({});
}
