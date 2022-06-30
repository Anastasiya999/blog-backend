import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(", "),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failure to create post",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const all = await PostModel.find().populate("user").exec();

    res.json(all);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failure to get posts",
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const all = await PostModel.find().limit(5);
    const tags = all
      .map((item) => item.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failure to get tags",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const results = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: {
          viewsCount: 1,
        },
      }
    ).populate("user");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failure to get a post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить статью",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(", "),
      }
    );

    res.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failure to update post",
    });
  }
};

export const getByTag = async (req, res) => {
  try {
    const tagName = req.params.name;
    const all = await PostModel.find();

    const sorted = all.filter((item) =>
      Object.values(item.tags).includes(tagName)
    );
    res.json(sorted);
  } catch (error) {
    console.error(error);
    res.json({
      message: "Failure to load posts by tag",
    });
  }
};
