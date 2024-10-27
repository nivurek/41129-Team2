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
import { Tooltip } from "primereact/tooltip";

import { withVersionContext, useVersion } from 'contexts/versionDataContext';
import { useUser } from 'contexts/userDataContext';
import withAuth from 'utils/withAuth';
import { createVersion } from "actions/versionActions";
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
		const updatedPageData = userData.projects.find(
			project => project._id === projectId
		).pages.find(
			page => page._id === pageId
		);

		setPageData(updatedPageData);

		if (updatedPageData?.versions?.length === 0) {
			updateOpenVersionIdx(null);
			updateVersionData(null);
		} else {
			const maxIndex = updatedPageData.versions.length - 1;
			const newIndex = Math.min(maxIndex, openVersionIdx ?? maxIndex);
			updateVersionData(updatedPageData?.versions[newIndex]);
			updateOpenVersionIdx(newIndex);
		}
	}, [projectId, pageId, userData])

	// Handlers
	const createNewVersionHandler = () => {

		createVersion({
			userId: userData._id,
			projectId: projectId,
			pageId: pageId,
		})
		.then((response) => {
			console.log("Version created:", response.data);
			updateOpenVersionIdx(pageData?.versions?.length ?? 0); // Set the selected index to where the new verison will be
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

						<VersionDataComponent />
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
							<Tooltip target={".new-version-button-disabled"} content={"An empty version already exists. \nUpload an image to create a new one!"}  mouseTrack mouseTrackLeft={10} />
							<div className={`m-2 flex ${!pageData?.versions?.at(-1).screenshotUrl && "new-version-button-disabled"}`}>
								<Button className="h-5rem w-full" onClick={() => createNewVersionHandler()} disabled={!pageData?.versions?.at(-1).screenshotUrl}>
									{pageData?.versions?.length === 0 ? "Get started!" : <Icon name='plus' />}
								</Button>
							</div>

							<Container className="p-2 overflow-y-auto" >
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
