// 経年劣化に耐える ReactComponent の書き方
// https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a
// https://blog.ojisan.io/storybook-first-develop/
// (1) import層
import React from 'react'
import styled from 'styled-components'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

// (2) Types層
type ContainerProps = {
    name: string
    sheet_name: string[]
}
type Props = {
    className: string
    handleClick: () => void
    isOpen: boolean
} & ContainerProps
// (3) DOM層
const Component: React.FC<Props> = props => (
    <>
        <ListItemButton onClick={props.handleClick}>
            <ListItemIcon>
                <BiotechOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={props.name} />
            {props.isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <ListItem>
            <Collapse in={props.isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ width: '100%' }}>
                        <ListItemIcon>
                            <ScienceOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={props.sheet_name} />
                    </ListItemButton>
                </List>
            </Collapse>
        </ListItem>
    </>
)
// (4) Style層
const StyledComponent = styled(Component)`
> h1 {
    font-size: 24px;
  }
`
// (5) Container層
export const Container: React.FC<ContainerProps> = props => {
    const [isOpen, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    };

    return <StyledComponent {...{
        isOpen,
        handleClick,
        ...props
    }} />
}