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
    const { title, content, id } = JSON.parse(req.body);
    try {
      const createdPost = await prisma.post.create({
        data: {
          title: title,
          content: content,
          id: "",
        },
      });
      res.status(200).json(createdPost);
    } catch (e) {
      console.error(e);
      return res.status(500);
    }
  } else {
    res.status(404);
  }
};
