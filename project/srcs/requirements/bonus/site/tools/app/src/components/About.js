import React, { Fragment } from 'react';
 
const About = () => {
    return (
        <Fragment>
            <div id="about" className="container-fluid">
                <div className="row">
                    <div className="col-sm-8">
                        <h2>Syadmin Niggers company : </h2><br />
                        <p>Down the rabbit hole, sysadmin niggers glow in the dark, therefore darkness is your new master</p>
                        <br /><button className="btn btn-default btn-lg">Get in Touch</button>
                    </div>
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-signal logo"></span>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-grey">
                <div className="row">
                    <div className="col-sm-4">
                        <span className="glyphicon glyphicon-globe logo slideanim"></span>
                    </div>
                    <div className="col-sm-8">
                        <h2>Inception is shit !</h2><br />
                        <h4><strong>MISSION:</strong> We are here to make you fuckup inception like projects, so cease your faggotery my friend!</h4><br />
                        <p><strong>VISION:</strong> Sysadministration is for dummies, aint gonna learn more. Fuck off akhay sat!</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
export default About;
