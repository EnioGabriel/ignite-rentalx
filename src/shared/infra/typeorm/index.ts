import { Connection, createConnection, getConnectionOptions } from "typeorm";

// se o host for vazio, seu valor é atribuído para "database"
export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host, // Nome do host deve ser igual ao nome do service no docker-compose
    })
  );
};
