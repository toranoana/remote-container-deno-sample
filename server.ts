// deno run --allow-net server.ts で起動
import { Client } from "https://deno.land/x/mysql@v2.10.1/mod.ts";
import { serve } from "https://deno.land/std@0.116.0/http/server.ts";
import Handlebars from "https://cdn.skypack.dev/handlebars@4.7.7";

// deno lintで警告が出る想定
const unusedVar = 1;

const client = await new Client().connect({
  hostname: "db",
  username: "root",
  password: "pass",
  db: "sample",
  charset: "utf8mb4",
});

await client.execute("SELECT 1");

const template = Handlebars.compile(`<body>
チーム一覧<br />
<ul>
  {{#teams}}
    <li>{{id}}: {{name}}</li>
  {{/teams}}
</ul>
</body>`);

const server = serve(async () => {
  const teams = await client.query("SELECT * FROM teams");

  const body = template({ teams });

  return new Response(body, {
    headers: { ["Content-type"]: "text/html; charset=UTF-8" },
  });
}, { addr: ":8000" });

console.log("http://localhost:8000/");

try {
  await server;
} finally {
  await client.close();
}
