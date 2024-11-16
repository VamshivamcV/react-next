import type {
  //  InferGetStaticPropsType,
   GetStaticProps, NextPage } from "next";
import axios from "axios";
import {
  // MongoClient,
  ObjectId,
} from "mongodb";
// import clientPromise from "@/lib/mongodb";
import { getCustomers } from "../api/customers";
import { useQuery } from "@tanstack/react-query";
import CustomerComponent from "@/components/Customer";
import Grid from "@mui/material/Grid"
import { Container } from "@mui/material";

export type Order = {
  description: string;
  price: {$numberDecimal: number};
  _id: ObjectId;
}

export type Customer = {
  _id?: ObjectId;
  name: string;
  industry: string;
  orders?: Order[];
};

type Props = {
  customers: Customer[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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

const Customers: NextPage<Props> = ({
  customers: c
}) => {
  console.log(c);
  const { data: {data: { customers = c} = {}} = {}} = useQuery({
    queryKey: ["customers"],
    queryFn: () => axios("/api/customers")
  });

  return (
    <Container>
      <Grid container spacing={5} sx={{mt: 1}}>
        {customers.map((customer: Customer) => {
          return (
            <CustomerComponent key={customer._id?.toString()} customer={customer}/>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Customers;
