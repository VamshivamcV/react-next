import type { InferGetStaticPropsType, GetStaticProps, NextPage } from "next";
import axios from "axios";
import {
  // MongoClient,
  ObjectId,
} from "mongodb";
// import clientPromise from "@/lib/mongodb";
import { getCustomers } from "../api/customers";
import { useQuery } from "@tanstack/react-query";

export type Customer = {
  _id?: ObjectId;
  name: string;
  industry: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getCustomers();
  console.log("!!!", data);

  // const result = await axios.get<{
  //     customers: Customer[];
  // }>('http://127.0.0.1:8000/api/customers/');
  // console.log(result.data.customers);

  return {
    props: {
      customers: data,
      // result.data.customers
    },
    revalidate: 60,
  };
};

const Customers: NextPage = ({
  customers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // console.log(customers);
  const query = useQuery({
    queryKey: ["customers"],
    queryFn: () =>  axios("/api/customers") as any,
    initialData: {
      data: {
        customers: customers
      }
    },
  });
  console.log(customers, query);
  return (
    <>
      <h1>Customers</h1>
      {query.data.data.customers.map((customer: Customer) => {
        return (
          <div key={customer._id?.toString()}>
            <p>{customer._id?.toString()}</p>
            <p>{customer.name}</p>
            <p>{customer.industry}</p>
          </div>
        );
      })}
    </>
  );
};

export default Customers;
