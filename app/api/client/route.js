import database from "@/database";

export async function GET() {
  const body = (await database.query("SELECT * FROM clients;")).rows;

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

export async function POST(req) {
  const newClientData = await req.json();

  await database.query(
    "INSERT INTO clients (name, age, adress) VALUES ($1, $2, $3);",
    [newClientData.name, newClientData.age, newClientData.adress]
  );

  return new Response(null, {
    status: 201,
  });
}

export async function PUT(req) {
  const updatedClientData = await req.json();

  console.log(updatedClientData);

  await database.query(
    "UPDATE clients SET name = $1, age = $2, adress = $3 WHERE id = $4;",
    [
      updatedClientData.name,
      updatedClientData.age,
      updatedClientData.adress,
      updatedClientData.id,
    ]
  );

  return new Response(null, {
    status: 200,
  });
}

export async function DELETE(req) {
  const updatedClientData = await req.json();

  console.log(updatedClientData);

  const client = (
    await database.query("DELETE FROM clients WHERE id = $1 RETURNING *;", [
      updatedClientData,
    ])
  ).rows[0];

  console.log(client);

  return new Response(null, {
    status: 200,
  });
}
