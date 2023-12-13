import mysql from "mysql2/promise";
import config from "../config/config.js";

class DB {
  constructor() {
    if (DB.instance) {
      return DB.instance;
    }

    this.pool = mysql.createPool({
      ...config.databaseConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    DB.instance = this;

    this.init();
  }

  async init() {
    try {
      this.connection = await this.pool.getConnection();
      const { host, port, database } = this.connection.config;
      console.log(`Connected to the database: ${host}:${port}/${database}`);
      this.connection.release();
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  }

  async beginTransaction() {
    this.connection = await this.pool.getConnection();
    await this.connection.beginTransaction();
  }

  async commit() {
    await this.connection.commit();
    this.connection.release();
  }

  async rollback() {
    await this.connection.rollback();
    this.connection.release();
  }

  async query(sql, args = []) {
    try {
      const rows = await this.connection.query(sql, args);
      return rows;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

  async queryWithTransaction(sql, args = []) {
    try {
      if (!this.connection) {
        return Promise.reject(new Error("Transaction not started"));
      }

      const rows = await this.connection.query(sql, args);
      return rows;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }
}

export default new DB();
