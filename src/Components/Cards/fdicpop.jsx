import React, {useEffect, useState} from "react";

export default function Fdicpop() {

    const [isopen, setIsopen] = useState(true)

    useEffect(() => {
        setIsopen(true)
        setTimeout(() => {
            setIsopen(false)
        }, 5000);
    }, [isopen])

    if (!isopen) {
        return null
    }

    return (
        <div className="fdic-pop">
            <div>
                <h3>FDIC</h3>
            <p>FDIC Insured - Backed by the full faith and credit of the U.s</p>
            </div>
        </div>
    )
}