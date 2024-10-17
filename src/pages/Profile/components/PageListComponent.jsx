import React, { useState } from "react";
import {
  Button,
  Card,
  CardMeta, 
  CardHeader, 
  CardDescription, 
  CardContent, 
  Grid,
  Icon,
  Image,
  Segment
} from "semantic-ui-react";

const PageListComponent = ({pageData, projectName, changeDepth, setIndex}) => {
  console.log("===== Pagelistcomponent =====", pageData);
  
  const returnUpALevel = () => {
    changeDepth(0);
  }
  
  return (
    <Segment.Group style={{width: "100%", height: "100%"}}>
      <Segment secondary>
        <Grid columns={3}>
          <Grid.Column width={3}>
            <Button
              onClick={()=>{returnUpALevel()}}
              icon
              labelPosition='left'
            >
              <Icon name={'arrow left'} />
              Go back
            </Button>
          </Grid.Column>
          <Grid.Column width={10}>
            <h1 style={{textAlign: "center"}}>{projectName}</h1>
          </Grid.Column>
          <Grid.Column width={3}>

          </Grid.Column>
        </Grid>
      </Segment>
      {/* ========================================================== */}
      <Segment style={{width: "100%", height: "100%"}}>
        <h3>Pages</h3>
        <Card.Group>
          {pageData.Pages.map((page, idx) => (
            <Card key={idx}>
              <Image src='https://replicate.delivery/mgxm/8b4d747d-feca-477d-8069-ee4d5f89ad8e/a_high_detail_shot_of_a_cat_wearing_a_suit_realism_8k_-n_9_.png' wrapped ui={false} />
              <CardContent>
                <CardHeader>{page.Name}</CardHeader>
                <CardMeta>
                  <span className='date'>Last edited {page.LastEditedDate}</span>
                </CardMeta>
                {/* <CardDescription>
                  {page.Description}
                </CardDescription> */}
              </CardContent>
              <CardContent extra>
                <Icon name='file' />
                {page.Results.length} versions
              </CardContent>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    </Segment.Group>
  )
};

export default PageListComponent;