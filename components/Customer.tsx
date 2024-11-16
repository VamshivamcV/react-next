import Button from "@mui/material/Button";
// import Info from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
// import { wrap } from "module";
import Tooltip from "@mui/material/Tooltip";
import type { Customer } from "@/pages/customers";
import { Grid } from "@mui/material";
import Link from "next/link";

const Customer = ({ customer }: { customer: Customer }) => {
  return (
    <Grid
      item
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Tooltip title={customer._id?.toString()}>
          <PersonIcon fontSize="small" style={{ marginRight: 5 }} />
        </Tooltip>
        {customer.name}
      </span>

      {/* <p>{customer._id?.toString()}</p> */}
      <p>{customer.industry}</p>
      <Link href={{
        pathname: '/orders',
        query: {
          customerId: customer._id?.toString(),
        }
      }}>
          <Button variant="contained">View Orders</Button>
      </Link>
    </Grid>
  );
};

export default Customer;
