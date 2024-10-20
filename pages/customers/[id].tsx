import { useRouter } from "next/router";

export default function Customers(){
    const router = useRouter();
    const {id} = router.query;
    return (<h1>Customer {id}</h1>);
}