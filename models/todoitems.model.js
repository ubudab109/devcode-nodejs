const sql = require('./db');

class TodoItems {
    /**
     * The constructor function is a special function that is called when a new object is created from a
     * class.
     * @param item - {
     */
    constructor(item) {
        this.activity_group_id = item.activity_group_id;
        this.title = item.title;
        this.priority = item.priority;
    }

    /**
     * This function will return all the todo items that have not been deleted.
     * @param result - This is the callback function that will be called when the query is executed.
     */
    static get(result) {
        sql.query("SELECT * FROM todo_items WHERE deleted_at IS NULL", (err, res) => {
            if (err) {
                return result(null, err);
            } else {
                return result(null, res);
            }
        });
    }

    /**
     * Inserts a new row into the todo_items table with the data provided in the data object, and
     * returns the newly created row.
     * @param data - The data to be inserted into the database.
     * @param result - The result of the query.
     */
    static create(data, result) {
        sql.query("INSERT INTO todo_items SET ?", data, (err, res) => {
            if (err) {
                return result(null, err);
            } else {
                return result(null, {
                    id: res.insertId,
                    ...data,
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                });
            }

        });
    }

    /**
     * "If the query returns a result, return the result, otherwise return the string 'not_found'."
     * 
     * The problem is that the function is returning the string 'not_found' when the query returns a
     * result.
     * 
     * Here's the output from the console:
     * @param id - the id of the todo item
     * @param result - This is the callback function that will be called when the query is complete.
     */
    static findById(id, result) {
        sql.query(`SELECT * FROM todo_items WHERE deleted_at IS NULL AND id = ${id}`, (err, res) => {
            if (err) {
                return result(null, err);
            } else {
                if (res.length) {
                    return result(null, res[0]);
                } else {
                    return result("not_found", null);
                }
            }

        });
    }

    /**
     * "Update the title of a todo item with the given id, and return the updated todo item."
     * 
     * The function takes three parameters:
     * 
     * id: The id of the todo item to update.
     * data: The data to update the todo item with.
     * result: A callback function to call when the update is complete.
     * The function first calls the query method on the sql object, passing in the SQL query string and
     * the data to update the todo item with.
     * 
     * The query method takes a callback function as its third parameter. This callback function takes
     * two parameters: err and res.
     * 
     * If there was an error, the callback function calls the result callback function, passing in null
     * as the first parameter and the error as the second parameter.
     * 
     * If there was no error, the callback function checks if the affectedRows property of the res
     * object is equal
     * @param id - The id of the todo item to update.
     * @param data - The data to be updated.
     * @param result - This is the callback function that will be called when the query is complete.
     */
    static updateById(id, data, result) {
        sql.query(
            "UPDATE todo_items SET title = ? WHERE deleted_at IS NULL AND id = ?",
            [data.title, id], (err, res) => {

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
        )
    }

    /**
     * The function will update the deleted_at column of the row with the specified id to the current
     * date and time.
     * @param id - The id of the todo item to be deleted
     * @param result - The callback function that will be called when the query is complete.
     */
    static remove(id, result) {
        sql.query(`UPDATE todo_items SET deleted_at = NOW() WHERE id = ${id}`, (err, res) => {
            if (err) {
                return result(null, err);
            } else {
                return result(null, `Data TODO items With ID ${id} Deleted Successfully`);
            }


        });
    }
}

module.exports = {
    TodoItems
};