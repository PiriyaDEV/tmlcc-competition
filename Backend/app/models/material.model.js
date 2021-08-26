const sql = require("../database/db.connection");

const Material = function (material) {
  this.material_id = material.material_id;
  this.folder_id = material.folder_id;
  this.fileName = material.fileName;
  this.status = material.status;
  this.createdAt = material.createdAt;
  this.updatedAt = material.updatedAt;
};

Material.create = (materials, result) => {
  sql.query("INSERT INTO Materials VALUES ?", [materials], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: insert ${materials.length} material(s)`);
    result(null, materials);
    return;
  });
};

Material.update = (material, result) => {
  material.updatedAt = Date.now();

  sql.query(
    `UPDATE Materials SET ? WHERE 
      material_id = '${material.material_id}'`,
    material,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: material updated -> ${material.material_id}`);
      result(null, material);
      return;
    }
  );
};

Material.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Materials", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: ${res[0].count} file(s)`);
    result(null, res[0].count);
    return;
  });
};

Material.find = (material, result) => {
  console.log(material)
  sql.query(
    `SELECT * FROM Materials WHERE
      material_id = '${material.material_id}'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        console.log("Result: material not found");
        result(null, { isFound: false });
        return;
      }

      console.log(`Result: material found -> ${res[0].material_id}`);
      result(null, { isFound: true, ...res[0] });
      return;
    }
  );
};

Material.getAll = (result) => {
  sql.query(
    `SELECT
      F.folder_id,
      F.folderName,
      F.description,
      F.createdAt,
      IFNULL(
          (
              SELECT
                  JSON_ARRAYAGG(
                      JSON_OBJECT(
                          'material_id',
                          M.material_id,
                          'fileName',
                          M.fileName
                      )
                  )
              FROM
                  Materials M
              WHERE
                  F.folder_id = M.folder_id
                  AND M.status = 'active'
          ),
          JSON_ARRAY()
      ) AS materials
   FROM
       Folders F
   WHERE
       F.status = 'active'
   ORDER BY F.createdAt DESC`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: ${res.length} folder(s)`);
      result(null, res);
      return;
    }
  );
};

Material.folderDelete = (material, result) => {
  material.updatedAt = Date.now();

  sql.query(
    `UPDATE Materials SET ? WHERE 
      folder_id = '${material.folder_id}'`,
    material,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: all materials deleted from folder -> ${material.folder_id}`);
      result(null, material);
      return;
    }
  );
};

module.exports = Material;
