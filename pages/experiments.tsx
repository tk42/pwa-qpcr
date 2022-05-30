// 経年劣化に耐える ReactComponent の書き方
// https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a
// https://blog.ojisan.io/storybook-first-develop/
// (1) import層
import React, { useState, useEffect, Suspense } from 'react'
import styled from 'styled-components'
import List from '@mui/material/List';
import { Experiment } from '../components/item';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';


// (2) Types層
type ContainerProps = {
}
type Props = {
    experiments: Experiment[]
} & ContainerProps
// (3) DOM層
const Component: React.FC<Props> = props => (
    <List
        sx={{ width: '100%' }}
        component="nav">
        {
            props.experiments.map(e => {
                return (
                    <ListItemButton onClick={() => {
                    }}>
                        <ListItemIcon>
                            <BiotechOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={e.name} />
                    </ListItemButton>
                )
            })
        }
    </List>
)
// (4) Style層
const StyledComponent = styled(Component)`
> h1 {
    font-size: 24px;
  }
`
// (5) Container層
export const Container: React.FC<ContainerProps> = props => {
    const [experiments, setExperiments] = useState<Experiment[]>();

    useEffect(() => {
        setExperiments(Experiment.LoadItems());
    }, [experiments]);

    return (experiments === undefined) ? <></> : (
        <StyledComponent {...{
            experiments,
            ...props,
        }} />
    )
}