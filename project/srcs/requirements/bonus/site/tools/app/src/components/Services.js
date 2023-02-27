import React from 'react';

const Services = () => {
    return (
        <div id="services" className="container-fluid text-center">
            <h2>SERVICES</h2>
            <h4>Offers : </h4>
            <br />
            <div className="row slideanim">
                <div className="col-sm-4">
                    <span className="glyphicon glyphicon-off logo-small"></span>
                    <h4>POWER</h4>
                    <p>Kill yourself</p>
                </div>
                <div className="col-sm-4">
                    <span className="glyphicon glyphicon-heart logo-small"></span>
                    <h4>LOVE</h4>
                    <p>Bitchs and hoes</p>
                </div>
                <div className="col-sm-4">
                    <span className="glyphicon glyphicon-lock logo-small"></span>
                    <h4>JOB DONE</h4>
                    <p>Validated inception</p>
                </div>
            </div>
        </div>
    )
}

export default Services;
