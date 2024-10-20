import type { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next'
import React from 'react';

type Customer = {
    id: number,
    name: string,
    industry: string
}

export const getStaticProps: GetStaticProps = (async (context) => {
    return {
        props: {
            customers: [
                {
                    id: 1,
                    name: "John Smith",
                    industry: "Restaurant"
                },
                {
                    id: 2,
                    name: "Sal Brown",
                    industry: "tech"
                }
            ] as Customer[]
        }
    }
});

const Customers: NextPage = ({customers}: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(customers);
    return (
        <>
            <h1>Customers</h1>
            {customers.map((customer: Customer) => {
                return(<div key={customer.id}>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                    <p>{customer.industry}</p>
                </div>
            )})}
        </>
    );
}

export default Customers