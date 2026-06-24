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
        <section className="table-holder-section" style={{width: "fit-content", minWidth: "100%", overflowX: "scroll"}}>
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
                    <Link>View Details</Link>
                   </td>
                </tr>
            ))}
           </tbody>
        </table>
            </div>
        </section>
    )
}