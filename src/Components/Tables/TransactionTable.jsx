import React from "react";
import { Link } from "react-router";

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
    return (
        <table style={style} className={className} {...props}>
            <thead>
                <tr>
                <th>Reference #</th> 
                <th>Amount</th>
                <th>source</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
           <tbody>
             {tableData.map((data, index) => (
                <tr key={index}>
                    <td># {data.id}</td>
                   <td>{data.currencyIcon}{data.amount.toLocaleString()}</td>
                   <td>{data.source}</td>
                   <td><span className="destination">{data.destination}</span></td>
                   <td className={`status ${data.status}`}>{data.status}</td>
                   <td>
                    <Link>View Details</Link>
                   </td>
                </tr>
            ))}
           </tbody>
        </table>
    )
}