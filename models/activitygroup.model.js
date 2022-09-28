const sql = require("./db");

/**
 * This function takes in a group object and returns a new ActivityGroup object with the email and
 * title properties of the group object.
 */
class ActivityGroup {
    constructor(group) {
        this.email = group.email;
        this.title = group.title;
    }
    /* Assigning a function to the ActivityGroup object. */
    static create(data, result) {
        sql.query("INSERT INTO activity_group SET ?", data, (err, res) => {
            if (err) {
                return result(null, err);
            }
            
            return result(null, {
                id: res.insertId,
                ...data,
                created_at : new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null,
            });
        });
    }
    /* A function that is being assigned to the ActivityGroup object. */
    static findById(id, result) {
        sql.query(`SELECT * FROM activity_group WHERE deleted_at IS NULL AND id = ${id}`, (err, res) => {
            if (err) {
                return result(null, err);
            }
            if (res.length > 0) {
                return result(null, res[0]);
            }
            return result(null, err);
        });
    }
    /* A function that is being assigned to the ActivityGroup object. */
    static get(result) {
        sql.query("SELECT * FROM activity_group WHERE deleted_at IS NULL", (err, res) => {
            if (err) {
                return result(null, err);
            }

            return result(null, res);
        });
    }
    /* Updating the title of the activity group with the given id. */
    static updateById(id, data, result) {
        sql.query(
            "UPDATE activity_group SET title = ? WHERE deleted_at IS NULL AND id = ?", [data.title, id], (err, res) => {
                if (err) {
                    return result(null, err);
                }

                if (res.affectedRows == 0) {
                    return result("not_found", null);
                }

                return result(null, {
                    id: id,
                    ...data,
                    created_at : new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    deleted_at: null,
                });
            }
        );
    }
    /* A function that is being assigned to the ActivityGroup object. */
    static remove(id, result) {
        sql.query(`UPDATE activity_group SET deleted_at = NOW() WHERE id = ${id}`, (err, res) => {
            if (err) {
                return result(null, err);
            } else {
                return result(null, `Data Activity With ID ${id} Deleted Successfully`);
            }


        });
    }
} 


module.exports = {ActivityGroup};



