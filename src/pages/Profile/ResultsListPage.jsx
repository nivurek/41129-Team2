import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
	Container,
	Divider,
  Grid,
  Icon,
  Segment,
} from "semantic-ui-react";

import { useUser } from 'contexts/userDataContext';
import withAuth from 'utils/withAuth';
import { createResult, updateResult, deleteResult } from "./actions/resultActions";
import { getUserById } from "actions/userActions";

import ResultInformationViewComponent from "./components/ResultInformationViewComponent";
import ResultPreviewComponent from "./components/ResultPreviewComponent";


const ResultsListPage = () => {
	const navigate = useNavigate();
	const { userData, updateUserData } = useUser();

	const { projectId, pageId } = useParams();
	const pageData = userData.projects.find(
		project => project._id === projectId
	).pages.find(
		page => page._id === pageId
	);
	console.log("Results page, data:", pageData);

	const [openResultIdx, setOpenResultIdx] = useState(pageData.results.length === 0 ? null : 0);

	const createNewResult = () => {
		// Create result
    createResult({
			userId: userData._id,
			projectId: projectId,
			pageId: pageId,
		})
		.then((response) => {
			console.log("Result created:", response.data);
			setOpenResultIdx(openResultIdx === null ? 0 : pageData.results.length); // Set the selected index to where the new result will be
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
		<div> 
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
            <h1 style={{textAlign: 'center'}}>{pageData.name} - Results</h1>
          </Grid.Column>
        </Grid>
      </Segment>

			<Grid className='aligned-grid'>
				<Grid.Row stretched style={{ height: '100%' }}>
					{/* ------------------------------------------------------------------ */}
					{(openResultIdx != null) ? (
						// <></>
						<ResultInformationViewComponent
							openResultIdx={openResultIdx}
							setOpenResultIdx={setOpenResultIdx}
							pageData={pageData}
							projectId={projectId}
						/>
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
							<Button onClick={() => createNewResult()} style={{ margin: '10px', height: "70px" }}>
								{pageData.results.length === 0 ? "Get started!" : <Icon name='plus' />}
							</Button>

							<Container style={{ overflowY: 'auto', padding: '10px' }}>
								{pageData.results.map((result, resultIndex) => (
									<ResultPreviewComponent
										data={result}
										idx={resultIndex}
										active={openResultIdx === resultIndex}
										setOpenResultIdx={setOpenResultIdx}
									/>
								))}
							</Container>
							
						</Segment>
					</Grid.Column>
					{/* ------------------------------------------------------------------ */}
				</Grid.Row>
			</Grid>
		</div>
	)
}

export default withAuth(ResultsListPage);
