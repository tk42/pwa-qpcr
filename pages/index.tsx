import React from 'react'
import styled from 'styled-components'
import styles from '../styles/Home.module.css'
import { Container as Menu } from './experiments'
import { Container as Header } from '../components/header'
import { HeaderPage } from '../components/consts'

// (2) Types層
type ContainerProps = {
  headerPage: HeaderPage
}
type Props = {
  className: string
} & ContainerProps

// (3) DOM層
// const Component: React.FC<Props> = props => (
// )
// (4) Style層
// const StyledComponent = styled(Component)`
// > h1 {
//     font-size: 24px;
//   }
// `
// (5) Container層
export const MainContainer: React.FC<ContainerProps> = props => {
  switch (props.headerPage) {
    case HeaderPage.Experiments:
      return <Menu {...props} />
    case HeaderPage.Sheets:
      return <Menu {...props} />
    case HeaderPage.EditSheet:
      return <></>
    case HeaderPage.TraceSheet:
      return <></>
    default:
      return <></>
  }
}

export default function Home() {
  const [headerPage, setHeaderPage] = React.useState(HeaderPage.Experiments);

  const handleHeaderPage = (value: number) => {
    setHeaderPage(value);
  };

  return (
    <>
      <Header {...{ headerPage, handleHeaderPage }} />
      <MainContainer {...{ headerPage }} />
    </>
  )
}
