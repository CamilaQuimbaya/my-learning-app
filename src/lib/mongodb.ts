import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Falta la variable de entorno "MONGODB_URI" en .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// En desarrollo reutilizamos la conexión entre recargas (HMR) para no
// abrir cientos de conexiones contra Atlas.
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

/** Devuelve la base de datos por defecto definida en la cadena de conexión. */
export async function getDb() {
  const c = await clientPromise;
  return c.db();
}
