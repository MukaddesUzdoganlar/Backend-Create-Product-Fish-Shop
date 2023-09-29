import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const products = await Product.find();
    return response.status(200).json(products);
  }
  if (request.method === "POST") {
    try {
      const newProduct = request.body;
      await Product.create(newProduct);

      response.status(201).json({ status: "Product created!" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal server error." });
    }
    return;
  }

  response.status(405).json({ message: "Method not allowed." });
}
