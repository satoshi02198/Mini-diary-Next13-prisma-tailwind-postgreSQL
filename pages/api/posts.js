import prisma from "../../lib/prisma";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const users = await prisma.post.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    const { title, content } = JSON.parse(req.body);
    try {
      const createdPost = await prisma.post.create({
        data: {
          title: title,
          content: content,
        },
      });
      res.status(200).json(createdPost);
    } catch (e) {
      console.error(e);
      return res.status(500);
    }
  } else if (req.method === "PUT") {
    const { editTitle, editContent, id } = JSON.parse(req.body);
    try {
      const result = await prisma.post.update({
        where: { id: id },
        data: {
          title: editTitle,
          content: editContent,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body);
    try {
      const result = await prisma.post.delete({
        where: { id: id },
      });
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else {
    res.status(404);
  }
};
