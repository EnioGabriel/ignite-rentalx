import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";

import createConnection from "../../typeorm";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XSXSXS')`
  );

  await connection.close;
}

create().then(() => console.log("User admin created!"));
