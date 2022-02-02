import React, { useEffect } from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";
import PropTypes from 'prop-types';

const ProgressBar = ({ completed, result }) => {

    const container = {
        display: "grid",
        gridTemplateColumns: "90% 1fr",
        alignItems: "center"
    }

    const containerStyles = {
        display: "flex",
        height: 15,
        width: '100%',
        backgroundColor: "whitesmoke",
        borderRadius: "2px",
        margin: "10px 0px",
        overflowY: "hidden",
    }

    const fillerStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        height: '100%',
        width: `${completed}%`,
        backgroundColor: "blue",
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: `width ${completed} ease-in-out`,
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: '12px'
    }

    const resultStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const checkSuccess = {
        color: "green",
        marginLeft: "5px"
    }

    const checkFailed = {
        color: "red",
        marginLeft: "5px"
    }


    return (
        <div style={container}>
            <div style={containerStyles}>
                <div style={fillerStyles}>
                    <span style={labelStyles}>{`${ completed }%`}</span>
                </div>
            </div>
            <div style={resultStyles}>
                {result !== null ? result ? <FaCheck style={ checkSuccess } /> : <FaTimes style={ checkFailed } /> : <></> }
            </div>
        </div>
    );
}

ProgressBar.propTypes = {
    completed: PropTypes.number.isRequired,
    result: PropTypes.bool
}

export default ProgressBar;