import React from "react";
const Breadcrumb = ({ heading, add, subheading,params }) => {
	return (
		<>
			<div className="container-fluid">
				<div className="page-header">
					<div className="row">
						<div className="col-sm-6">
							<h3>{heading}</h3>
							<ol className="breadcrumb">
								<li className="breadcrumb-item active">{subheading}</li>
							</ol>
						</div>
						<div className="col-sm-6 text-end">{add}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Breadcrumb;
