import type { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next'
import axios from 'axios';

export type Customer = {
    id: number;
    name: string;
    industry: string;
}

export const getStaticProps: GetStaticProps = (async () => {
    const result = await axios.get<{
        customers: Customer[];
    }>('http://127.0.0.1:8000/api/customers/');
    console.log(result.data.customers);
    return {
        props: {
            customers: result.data.customers
        },
        revalidate: 60,
        
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