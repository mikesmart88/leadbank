import React, {useState} from "react";
import { Link } from "react-router";
import TransactionPopCard from "../Cards/TransactionPopCard";

/**
 * @param {object} props
 * @param {React.CSSProperties} [props.style]
 * @returns 
 */

export default function TransactionTable({
    style,
    className,
    tableData,
    ...props
}) {

    const [showdetail, setShowdetail] = useState(false)

    const [details, setDetails] = useState({})

    const handleSetdetails =( e, data) => {
        e.preventDefault();
        setShowdetail(true)
        setDetails({
            amount: data.amount,
            currencySign: data.currencySign,
            date: data.date,
            accountNumber: data.account,
            type: data.type,
            status: data.status,
            description: data.description,
            id: data.id,
            currency: data.currency,
        })
    }

    return (
        <section className="table-holder-section" style={{width: "fit-content", minWidth: "100%", overflowX: "scroll"}}>
             <TransactionPopCard
                    className="transaction-card"
                    isopen={showdetail}
                    amount={Number(details.amount) || 0}
                    code={details.currencySign}
                    date={details.date}
                    account={details.accountNumber}
                    type={details.type}
                    status={details.status}
                    description={details.description}
                    id={details.id}
                    currency={details.currency}
                    onclose={() => {setShowdetail(false)}}
                  />
            <div className="table-wrapper" style={{width: "100%"}}>
                <table style={style} className={className} {...props}>
            <thead>
                <tr>
                <th>Reference #</th> 
                <th>Amount</th>
                <th>source</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
           <tbody>
             {tableData.map((data, index) => (
                <tr key={index}>
                    <td># {data.id}</td>
                   <td>{data.currencySign}{data.amount.toLocaleString()}</td>
                   <td>{data.type}</td>
                   <td><span className="destination">{data.destination}</span></td>
                   <td className={`status ${data.status}`}>{data.status}</td>
                   <td>
                    <Link onClick={(e) => {handleSetdetails(e, {
                        amount: data.amount,
                        currencySign: data.currencySign,
                        date: data.created_at,
                        account: data.account,
                        type: data.type,
                        status: data.status,
                        description: data.destination,
                        id: data.id,
                        currency: data.currency,
                    })}}>View Details</Link>
                   </td>
                </tr>
            ))}
           </tbody>
        </table>
            </div>
        </section>
    )
}