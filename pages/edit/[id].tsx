// 経年劣化に耐える ReactComponent の書き方
// https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a
// https://blog.ojisan.io/storybook-first-develop/
// (1) import層
import React from 'react'
import styled from 'styled-components'
// (2) Types層
type ContainerProps = {

}
type Props = {

} & ContainerProps
// (3) DOM層
const Component: React.FC<Props> = props => (
    <>
        edit sheet
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
    return <StyledComponent {...props} />
}

export default Container;
