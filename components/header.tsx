// 経年劣化に耐える ReactComponent の書き方
// https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a
// https://blog.ojisan.io/storybook-first-develop/
// (1) import層
import React from 'react'
// import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Container as SearchBox, ContainerProps as SearchProps } from './search_box';
import { Container as AddItemModal } from './add_item_modal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import { HeaderPage } from './consts';

type HeaderConfig = {
    title: string
    left: JSX.Element,
    right: JSX.Element,
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    // backgroundColor: '#30E3CA',
    // color: '#40514e',
    alignItems: 'flex-grow',
    justifyContent: 'flex-start',
}));

// (2) Types層
export type ContainerProps = {
    headerPage: HeaderPage
    handleHeaderPage: (value: number) => void
}
type Props = {
    config: HeaderConfig
} & ContainerProps
// (3) DOM層
const Component: React.FC<Props> = props => (
    <AppBar position="static">
        <StyledToolbar>
            {props.config.left}
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                {props.config.title}
            </Typography>
            <SearchBox {...{ headerPage: props.headerPage }} />
            {props.config.right}
        </StyledToolbar>
    </AppBar>
)
// (4) Style層
// const StyledComponent = styled(Component)`
// > h1 {
//     font-size: 24px;
//   }
// `
// (5) Container層
export const Container: React.FC<ContainerProps> = props => {
    const router = useRouter();

    let config: HeaderConfig;
    switch (props.headerPage) {
        case HeaderPage.Experiments:
            config = {
                left: <></>,
                right: <AddItemModal headerPage={props.headerPage} />,
                title: 'Experiments',
            }
            break;
        case HeaderPage.Sheets:
            config = {
                left: <Box onClick={() => { router.back() }} ><ArrowBackIosIcon /></Box>,
                right: <AddItemModal headerPage={props.headerPage} />,
                title: 'Sheets',
            }
            break;
        case HeaderPage.EditSheet:
            config = {
                left: <Box onClick={() => { router.back() }} ><ArrowBackIosIcon /></Box>,
                right: <Link href="/" ><ColorizeOutlinedIcon /></Link>,
                title: 'Edit Sheet',
            }
            break;
        case HeaderPage.TraceSheet:
            config = {
                left: <Box onClick={() => { router.back() }} ><ArrowBackIosIcon /></Box>,
                right: <></>,
                title: 'Trace Sheet',
            }
            break;
    }

    return <Component {...{
        config,
        ...props,
    }} />
}