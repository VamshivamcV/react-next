import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Customer } from ".";
// import axios, { AxiosError } from "axios";
import { ParsedUrlQuery } from "querystring";
// import clientPromise from "@/lib/mongodb";
// import { ObjectId } from "mongodb";
import { BSONError } from "bson";
import { getCustomer } from "../api/customers/[id]";

type Props = {
  customer?: Customer;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  //   const result = await axios.get("http://127.0.0.1:8000/api/customers/");

  //   const paths = result.data.customers.map((customer: Customer) => {
  //     console.log(customer.id);
  //     return { params: { id: customer.id.toString() } };
  //   });

  return {
    paths: [],
    // paths
    fallback:
      // "blocking"
      true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;

  try {
    // const mongoClient = await clientPromise;

    // const data = await mongoClient
    //   .db()
    //   .collection("customerss")
    //   .findOne({"_id": new ObjectId(params.id)}) as Customer;
    const data = await getCustomer(params.id);
    console.log("!!!", data);

    if(!data){
        return {
            notFound: true ,
            revalidate: 60
        }
    }

    // const result = await axios.get<{ customer: Customer }>(
    //   `http://127.0.0.1:8000/api/customers/${params.id}`
    // );

    return {
      props: {
        customer: JSON.parse(JSON.stringify(data)),

        // customer: result.data.customer,
      },
      revalidate: 60,
    };
  } catch (err) {
    if (err instanceof BSONError
        // AxiosError
    ) {
    //   if (err.response?.status === 404) {
        return {
          notFound: true,
        //   revalidate: 60,
        };
    //   }
    }
    // throw err
    return {
      props: {},
    };
  }
};

const Customers: NextPage<Props> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  return <h1>{props.customer ? "Customer " + props.customer.name : "Page Not Found"}</h1>;
};

export default Customers;
