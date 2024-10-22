import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Button,
	Container,
	Divider,
  Grid,
  Icon,
  Segment,
} from "semantic-ui-react";

import { useUser } from "../../contexts/userDataContext";
import withAuth from "../../utils/withAuth";

import ResultInformationViewComponent from "./components/ResultInformationViewComponent";
import ResultPreviewComponent from "./components/ResultPreviewComponent";


const ResultsListPage = () => {
	const navigate = useNavigate();
	const { userData } = useUser();

	const { projectId, pageId } = useParams();
	const pageData = userData.projects.find(
		project => project.id === projectId
	).pages.find(
		page => page.id === pageId
	);
	// console.log("Results page, data:", pageData);

	const [openResultIdx, setOpenResultIdx] = useState(pageData.results.length === 0 ? null : 0);
	const [ , updateCounter] = useState(0);
  const addOneToCounter = () => {
    updateCounter(prevState => prevState + 1);
  }

	const createNewResult = () => {
    const date = new Date(Date.now());

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    console.log(formattedDate);
    
    const newObject = {
      id: 999,
      screenshot: "",
      updated: "",
      analysis: "",
      imagePalette: ['', '', '', '', '', ''],
      suggestedPalettes: [[], []],
      updatedImagePalette: [],
    }
    pageData.results.push(newObject);
    setOpenResultIdx(pageData.results.length - 1)
  }
	
	return (
		<div> 
			<Segment secondary>
        <Grid className='alignedGrid' columns={3}>
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

			<Grid className='alignedGrid'>
				<Grid.Row stretched style={{ height: '100%' }}>
					{/* ------------------------------------------------------------------ */}
					{(openResultIdx != null) ? (
						<ResultInformationViewComponent
							openResultIdx={openResultIdx}
							setOpenResultIdx={setOpenResultIdx}
							pageData={pageData}
							incrementCounter={addOneToCounter}
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
										key={resultIndex}
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
