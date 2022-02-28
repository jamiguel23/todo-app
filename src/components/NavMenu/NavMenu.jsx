import * as React from 'react';
import { useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { SiteContext } from '../../context/SiteContext';

export default function NavMenu({ anchorEl, open, handleClose }) {
  let siteContext = useContext(SiteContext);
  const toggleDisplay = siteContext.state.toggleDisplay;
  const displayComplete = siteContext.state.displayComplete;
  const numItemsToDisplay = siteContext.state.numItemsToDisplay;
  const setNumDisplay = siteContext.state.setNumDisplay;

  const ShowButton = ({ bool }) => {
    return (
      <Button
        variant={bool ? 'contained' : 'outlined'}
        color='secondary'
        onClick={() => {
          toggleDisplay();
        }}
      >
        {bool ? ' Remove Completed Items' : 'Show Completed Items'}
      </Button>
    );
  };

  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem>
        <ShowButton bool={displayComplete} />
      </MenuItem>
      <MenuItem>Number of To Do Items:</MenuItem>
      <MenuItem
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <ButtonGroup
          variant='text'
          aria-label='outlined primary button group'
          size='large'
        >
          <Button
            color={numItemsToDisplay === 1 ? 'secondary' : 'primary'}
            onClick={() => setNumDisplay(1)}
          >
            One
          </Button>
          <Button
            color={numItemsToDisplay === 2 ? 'secondary' : 'primary'}
            onClick={() => setNumDisplay(2)}
          >
            Two
          </Button>
          <Button
            color={numItemsToDisplay === 3 ? 'secondary' : 'primary'}
            onClick={() => setNumDisplay(3)}
          >
            Three
          </Button>
        </ButtonGroup>
      </MenuItem>
      <MenuItem
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button
          sx={{ backgroundColor: 'hsla(0, 39%, 61%, 0.3)' }}
          onClick={handleClose}
        >
          Logout
        </Button>
      </MenuItem>
    </Menu>
  );
}
