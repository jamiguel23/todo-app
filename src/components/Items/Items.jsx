import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { SiteContext } from '../../context/SiteContext';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

function Items({ list, toggleComplete, incomplete  }) {
  let siteContext = useContext(SiteContext);
  const numToShow = siteContext.state.numItemsToDisplay;
  const displayComplete = siteContext.state.displayComplete;

  const [showIndex, setShowIndex] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  //Needs Fixed, probably work with array methods vs doing it manually
  // Adding and removing works, but doesn't add more to page if you mark
  //them complete
  const setList = (list, numShow) => {
    let num = numShow;
    // console.log('inSetItems:', num)
    if (list.length <= num) num = list.length;
    let tempArr = [];
    for (let i = showIndex; i < showIndex + num; i++) {
      console.log(displayComplete)
      if(displayComplete){
        tempArr.push(list[i]);
      } else {
        if(list[i].complete){
          showIndex + num > list.length ?? num++;
        } else {
          tempArr.push(list[i]);
        }
      }      
    }
    console.log("temp In set items", tempArr)
    return tempArr;
  }

  

  const makeItems  = (list) => {
    let items = list.map((item) => (
      <Box
        key={Math.random()*10}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 0,
            width: '65%',
            height: 150,
          },
        }}
      >
        <Paper elevation={2}>
          <Stack
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              variant='outlined'
              sx={{
                backgroundColor: item.complete ? 'lightGrey' : '#1976D2',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ m: 2 }} variant='h6' gutterBottom component='div'>
                {item.text}
              </Typography>
            </Card>
            <Stack
              direction='row'
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                textAlign: 'center',
                pt: 3,
              }}
            >
              <Paper>
                <Typography
                  sx={{ m: 2 }}
                  variant='h6'
                  gutterBottom
                  component='span'
                >
                  Assigned to: {item.assignee}
                </Typography>
              </Paper>
  
              <Paper>
                <Typography
                  sx={{ m: 2 }}
                  variant='h6'
                  gutterBottom
                  component='span'
                >
                  Difficulty: {item.difficulty}
                </Typography>
              </Paper>
              <Paper>
                <Typography
                  sx={{ m: 3 }}
                  variant='h6'
                  gutterBottom
                  component='span'
                >
                  Complete: {item.complete.toString()}
                </Typography>
              </Paper>
  
              <Button
                sx={{
                  backgroundColor: item.complete ? 'lightGrey' : '#1976D2',
                }}
                variant='contained'
                onClick={() => toggleComplete(item.id)}
              >
                Complete
              </Button>
            </Stack>
            {item.id}
          </Stack>
        </Paper>
      </Box>
    ));
    return items
  }

    let tempArr = setList(list, numToShow);
    

  return (
    <>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant='outlined'
          style={{ margin: '10px' }}
          onClick={() => {
            pageNum > 1 && setShowIndex(showIndex - numToShow);
            pageNum > 1 && setPageNum(pageNum - 1);
          }}
        >
          prev
        </Button>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2em',
          }}
        >
          {pageNum}
        </div>
        <Button
          variant='outlined'
          style={{ margin: '10px' }}
          onClick={() => {
            if(pageNum * numToShow < incomplete){
            setShowIndex(showIndex + numToShow);
            setPageNum(pageNum + 1);
            }
          }}
        >
          next
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          '& > :not(style)': {
            mb: 3,
            p:3,
            width: '90%',
            height: '100%'
          },
        }}
      >
      {makeItems(tempArr)}
      </Box>
    </>
  );
}

export default Items;
