import config from "../config";
import { Pool } from "pg";

const pool = new Pool({ connectionString: config.DB_URL });

const fetch = async (SQL: string, params: any) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = await client.query(SQL, params);
    return row;
  } finally {
    client.release();
  }
};

const fetchAll = async (SQL: string, params: any) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(SQL, params);
    return rows;
  } finally {
    client.release();
  }
};

export  { fetch, fetchAll };
