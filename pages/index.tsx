// 経年劣化に耐える ReactComponent の書き方
// https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a
// https://blog.ojisan.io/storybook-first-develop/
// (1) import層
import React, { useState, useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router';
import styled from 'styled-components'
import List from '@mui/material/List';
import NextLink from 'next/link';
import { Experiment } from '../components/item';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';


// (2) Types層
type ContainerProps = {
}
type Props = {
    router: NextRouter
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
                    <ListItemButton
                        href={`/experiments/${e.id}`}
                        component="a"
                        LinkComponent={NextLink}
                    >
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
const Container: React.FC<ContainerProps> = props => {
    const router = useRouter();
    const [experiments, setExperiments] = useState<Experiment[]>();

    useEffect(() => {
        setExperiments(Experiment.LoadItems());
    }, [experiments]);

    return (experiments === undefined) ? <></> : (
        <StyledComponent {...{
            router,
            experiments,
            ...props,
        }} />
    )
}

export default Container;