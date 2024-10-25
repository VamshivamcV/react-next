import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Customer } from "@/pages/customers";

export const getCustomer = async (id: string | ObjectId): Promise<Customer> => {
  id = typeof id === "string" ? new ObjectId(id) : id;
  const mongoClient = await clientPromise;
  const data = (await mongoClient
    .db()
    .collection("customerss")
    .findOne({ _id: id })) as Customer;
  return data;
};

export const editCustomer = async (
  id: string | ObjectId,
  customer: Customer
) => {
  id = typeof id === "string" ? new ObjectId(id) : id;
  const mongoClient = await clientPromise;
  const data = await mongoClient
    .db()
    .collection("customerss")
    .replaceOne({ _id: id }, customer);

  return data;
};

export const deleteCustomer = async (id: string | ObjectId) => {
  id = typeof id === "string" ? new ObjectId(id) : id;
  const mongoClient = await clientPromise;
  const data = await mongoClient
    .db()
    .collection("customerss")
    .deleteOne({ _id: id });

  return data;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<
    | { modifiedCount: number }
    | { customer: Customer }
    | { deletedCount: number }
    | { error: string }
  >
) => {
  const id = req.query.id!;

  if (req.method === "GET") {
    const data = await getCustomer(new ObjectId(id as string));

    if (!data) {
      res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json({ customer: data });
  } else if (req.method === "PUT") {
    const data = await editCustomer(id as string, {
      name: req.body.name,
      industry: req.body.industry,
    });

    res.status(200).json({ modifiedCount: data.modifiedCount });
  } else if (req.method === "DELETE") {
    const data = await deleteCustomer(id as string);

    res.status(200).json({ deletedCount: data.deletedCount });
  }
};
