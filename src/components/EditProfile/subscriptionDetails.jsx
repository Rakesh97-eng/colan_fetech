import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SubscriptionDetails = ({ data,dataLoading }) => {
  const navigate = useNavigate();
  const handleChange = (action) => {
    navigate("/payment",{state:{isUpgrade:true,paymentAction:action}});
  };
  return (
    <div>
      <p className="compheading">Subscription Details</p>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th scope="col">Status</th>
            <td scope="col">{data.status?"Active":"InActive"}</td>
          </tr>
          <tr>
            <th scope="row">Plan</th>
            <td>
              {data.subscription_plan} <Button variant="info" onClick={()=>handleChange('update')}>upgrade</Button> <Button variant="danger" onClick={()=>handleChange('degrade')}>downgrade</Button>
            </td>
          </tr>
          <tr>
            <th scope="row">Terms</th>
            <td>{data.plan_period ==="month"?"Monthly":"Yearly"}</td>
          </tr>
          <tr>
            <th scope="row">Intial Amount</th>
            <td>{data.billing}/{data.plan_period ==="month"?"Month":"Year"}</td>
          </tr>
          <tr>
            <th scope="row">Start</th>
            <td>{data.created_at?.split('T')[0]}</td>
          </tr>
          <tr>
            <th scope="row">Renewal Date</th>
            <td>{data.renewal_date || data?.created_at?.split('T')[0]  }</td>
          </tr>
          <tr>
            <th scope="row">Payment</th>
            <td>Card</td>
          </tr>
          <tr>
            <th scope="row">Action</th>
            <td>
              <Button className="cancelBtn">Cancel</Button>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="compheading">Subscription Orders</p>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Total</th>
          </tr>
          <tr>
            <td scope="row">#75482145</td>
            <td>July 25,2024</td>
            <td>completed</td>
            <td>11,0000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionDetails;
