import "dotenv";

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(Deno.env.get("CLIENT_ID"));
  console.log(Deno.env.get("TENANT_ID"));
}
