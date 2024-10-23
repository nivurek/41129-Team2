import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
	Container,
	Divider,
  Grid,
  Icon,
  Segment,
} from "semantic-ui-react";

import { withVersionContext, useVersion } from 'contexts/versionDataContext';
import { useUser } from 'contexts/userDataContext';
import withAuth from 'utils/withAuth';
import { createVersion } from "./actions/versionActions";
import { getUserById } from "actions/userActions";

import VersionDataComponent from "./components/VersionDataComponent";
import VersionsListItemComponent from "./components/VersionsListItemComponent";


const VersionsListPage = () => {
	const navigate = useNavigate();
	const { userData, updateUserData } = useUser();
	const { openVersionIdx, updateOpenVersionIdx, updateVersionData } = useVersion();
	const [pageData, setPageData] = useState({});
	const { projectId, pageId } = useParams();

	// Use Effect Hooks
	useEffect(() => {

		const newPageData = userData.projects.find(
			project => project._id === projectId
		).pages.find(
			page => page._id === pageId
		);

		console.log("New page data:", newPageData);

		// TODO Add open index checking for index set on user data update
		setPageData(newPageData);
		updateOpenVersionIdx(newPageData?.versions?.length > 0 ? newPageData.versions.length - 1 : null);
		updateVersionData(newPageData?.versions?.length > 0 ? newPageData.versions.at(-1) : null);

	}, [userData, projectId, pageId])

	// Handlers
	const createNewVersionHandler = () => {

		createVersion({
			userId: userData._id,
			projectId: projectId,
			pageId: pageId,
		})
		.then((response) => {
			console.log("Version created:", response.data);
			updateOpenVersionIdx(openVersionIdx === null ? 0 : pageData.versions.length); // Set the selected index to where the new verison will be
			updateVersionData(response.data);
			return getUserById(userData._id);
		})
		.then((updatedData) => {
			console.log("Updated data:", updatedData);
			updateUserData(updatedData);
			
		})
		.catch((error) => {
			console.error("Unexpected error:", error);
		});
	}
	
	return (
		<> 
			<Segment secondary>
				<Grid className='aligned-grid' columns={3}>
				<Grid.Column width={3}>
					<Button
					onClick={()=>{navigate(-1)}}
					icon
					labelPosition='left'
					>
					<Icon name={'arrow left'} />
					Go back
					</Button>
				</Grid.Column>
				<Grid.Column width={10}>
					<h1 style={{textAlign: 'center'}}>{pageData?.name} - Versions</h1>
				</Grid.Column>
				</Grid>
			</Segment>

			<Grid className='aligned-grid min-h-0'>
				<Grid.Row stretched style={{ height: '100%' }}>
					{/* ------------------------------------------------------------------ */}
					{(openVersionIdx != null) ? (

						<VersionDataComponent pageData={pageData} />
					) : (
						<Grid.Column width={10} style={{ height: 'inherit', paddingRight: '0px' }}>
							<div style={{ display: 'flex', flexDirection: 'column'}} >
								<h3>No version selected</h3>
							</div>
						</Grid.Column>
					)}
					{/* ------------------------------------------------------------------ */}
					<Grid.Column width={6} style={{ height: 'inherit' }}>
						<Segment
							style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}
						>
							<div>
								<h2 style={{textAlign: 'center'}}>Version History</h2>
							</div>
							<Divider/>
							<Button onClick={() => createNewVersionHandler()} style={{ margin: '10px', height: "70px" }}>
								{pageData?.versions?.length === 0 ? "Get started!" : <Icon name='plus' />}
							</Button>

							<Container style={{ overflowY: 'auto', padding: '10px' }}>
								{pageData?.versions?.slice().reverse().map((version, versionIndex) => (
									<VersionsListItemComponent
										key={versionIndex}
										data={version}
										idx={pageData.versions.length - versionIndex - 1}
										active={openVersionIdx === pageData.versions.length - versionIndex - 1}
									/>
								))}
							</Container>
							
						</Segment>
					</Grid.Column>
					{/* ------------------------------------------------------------------ */}
				</Grid.Row>
			</Grid>
		</>
	)
}

export default withAuth(withVersionContext(VersionsListPage));
