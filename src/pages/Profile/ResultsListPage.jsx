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

import { withResultContext, useResult } from 'contexts/resultDataContext';
import { useUser } from 'contexts/userDataContext';
import withAuth from 'utils/withAuth';
import { createResult } from "./actions/resultActions";
import { getUserById } from "actions/userActions";

import ResultDataComponent from "./components/ResultDataComponent";
import ResultsListItemComponent from "./components/ResultsListItemComponent";


const ResultsListPage = () => {
	const navigate = useNavigate();
	const { userData, updateUserData } = useUser();
	const { openResultIdx, updateOpenResultIdx, updateResultData } = useResult();
	const [pageData, setPageData] = useState({});
	const { projectId, pageId } = useParams();

	// Use Effect Hooks
	useEffect(() => {

		const newPageData = userData.projects.find(
			project => project._id === projectId
		).pages.find(
			page => page._id === pageId
		);

		// TODO Add open index checking for index set on user data update
		setPageData(newPageData);
		updateOpenResultIdx(newPageData?.results?.length > 0 ? newPageData.results.length - 1 : null);
		updateResultData(newPageData?.results?.length > 0 ? newPageData.results.at(-1) : null);

	}, [userData, projectId, pageId])

	// Handlers
	const createNewResultHandler = () => {

		createResult({
			userId: userData._id,
			projectId: projectId,
			pageId: pageId,
		})
		.then((response) => {
			console.log("Result created:", response.data);
			updateOpenResultIdx(openResultIdx === null ? 0 : pageData.results.length); // Set the selected index to where the new result will be
			updateResultData(response.data);
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
					<h1 style={{textAlign: 'center'}}>{pageData?.name} - Results</h1>
				</Grid.Column>
				</Grid>
			</Segment>

			<Grid className='aligned-grid min-h-0'>
				<Grid.Row stretched style={{ height: '100%' }}>
					{/* ------------------------------------------------------------------ */}
					{(openResultIdx != null) ? (

						<ResultDataComponent pageData={pageData} />
					) : (
						<Grid.Column width={10} style={{ height: 'inherit', paddingRight: '0px' }}>
							<div style={{ display: 'flex', flexDirection: 'column'}} >
								<h3>No result selected</h3>
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
							<Button onClick={() => createNewResultHandler()} style={{ margin: '10px', height: "70px" }}>
								{pageData?.results?.length === 0 ? "Get started!" : <Icon name='plus' />}
							</Button>

							<Container style={{ overflowY: 'auto', padding: '10px' }}>
								{pageData?.results?.slice().reverse().map((result, resultIndex) => (
									<ResultsListItemComponent
										key={resultIndex}
										data={result}
										idx={pageData.results.length - resultIndex - 1}
										active={openResultIdx === pageData.results.length - resultIndex - 1}
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

export default withAuth(withResultContext(ResultsListPage));
