const Video = require("../models/video.model");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Video.getCount((err, count) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while getting the number of videos!",
      });
    }

    count++;
    count = count.toString();

    let video = req.body;

    video.video_id = "VI" + count.padStart(6, "0");
    video.status = "active";
    video.createdAt = Date.now();
    video.updatedAt = Date.now();

    Video.create(video, (err, result) => {
      if (err) {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the new video!",
        });
      }

      return res.status(201).send({
        video_id: result.video_id,
        status: result.status,
        message: "Video created!",
      });
    });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let video = req.body;

  Video.update(video, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while updating video information!",
      });
    }

    return res.status(200).send({
      video_id: result.video_id,
      videoName: result.videoName,
      message: "Video updated!",
    });
  });
};

exports.delete = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let video = req.body;

  video.status = "deleted";

  Video.update(video, (err, result) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while deleting the video!",
      });
    }

    return res.status(200).send({
      video_id: result.video_id,
      message: "Video deleted!",
    });
  });
};

exports.getAll = (req, res) => {
  Video.getAll((err, result) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while getting all videos!",
      });
    }

    return res.status(200).send(result);
  });
};
