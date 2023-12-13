import db from "../helpers/db.js";

class BaseModel {
  static async executeQuery(query, params) {
    return await db.query(query, params);
  }

  static async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    const [results] = await this.executeQuery(query);
    return results;
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const [results] = await this.executeQuery(query, [id]);
    return results[0];
  }

  static async findByColumnField(field, column) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${field} = ?`;
    const [results] = await this.executeQuery(query, [column]);
    return results[0];
  }

  static async create(data) {
    const query = `INSERT INTO ${this.tableName} SET ?`;
    const [result] = await this.executeQuery(query, data);
    return result.insertId;
  }

  static async update(id, data) {
    const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
    const [result] = await this.executeQuery(query, [data, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const [result] = await this.executeQuery(query, [id]);
    return result.affectedRows;
  }
}

export default BaseModel;
