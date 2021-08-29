const sql = require("../database/db.connection");

const Folder = function (folder) {
  this.folder_id = folder.folder_id;
  this.folderName = folder.folderName;
  this.description = folder.description;
  this.status = folder.status;
  this.createdAt = folder.createdAt;
  this.updatedAt = folder.updatedAt;
};

Folder.create = (folder, result) => {
  sql.query(
    `INSERT INTO Folders SET ?`, folder, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: new folder created -> ${folder.folderName}`);
    result(null, folder);
    return;
  });
};

Folder.update = (folder, result) => {
  folder.updatedAt = Date.now();

  sql.query(
    `UPDATE Folders SET ? WHERE 
      folder_id = '${folder.folder_id}'`,
    folder,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: folder updated -> ${folder.folder_id}`);
      result(null, folder);
      return;
    }
  );
};

Folder.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Folders", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: ${res[0].count} folder(s)`);
    result(null, res[0].count);
    return;
  });
};

Folder.find = (folder, result) => {
  sql.query(
    `SELECT * FROM Folders WHERE
      folder_id = '${folder.folder_id}' OR
      folderName = '${folder.folderName}'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        console.log("Result: folder not found");
        result(null, { isFound: false });
        return;
      }

      console.log(`Result: folder found -> ${res[0].folder_id}`);
      result(null, { isFound: true, ...res[0] });
      return;
    }
  );
};

module.exports = Folder;
