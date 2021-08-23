const sql = require("../database/db.connection");

const Video = function (video) {
  this.video_id = video.video_id;
  this.videoName = video.videoName;
  this.link = video.link;
  this.time = video.time;
  this.description = video.description;
  this.status = video.status;
  this.createdAt = video.createdAt;
  this.updatedAt = video.updatedAt;
};

Video.create = (video, result) => {
  sql.query("INSERT INTO Videos SET ?", video, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: new video created -> ${video.video_id}`);
    result(null, video);
    return;
  });
};

Video.update = (video, result) => {
  video.updatedAt = Date.now();

  sql.query(
    `UPDATE Videos SET ? WHERE 
      video_id = '${video.video_id}'`,
    video,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: video updated -> ${video.video_id}`);
      result(null, video);
      return;
    }
  );
};

Video.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Videos", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: ${res[0].count} video(s)`);
    result(null, res[0].count);
    return;
  });
};

Video.getAll = (result) => {
  sql.query(
    `SELECT
      video_id,
      videoName,
      link,
      time,
      description
     FROM
         Videos
     WHERE
         status = 'active'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: ${res.length} video(s)`);
      result(null, res);
      return;
    }
  );
};

module.exports = Video;
