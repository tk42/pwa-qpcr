// (1) import層
import React from 'react'
import styled from 'styled-components'
import { HeaderPage } from './consts'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Experiment } from '../components/item';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Modal } from '@mui/material';
import { WellType } from './welltype';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// (2) Types層
export type ContainerProps = {
    headerPage: HeaderPage
}
type Props = {
    isOpen: boolean
    handleClick: () => void
    selectedWellType: string
    handleWellTypeChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
    experimentName: string
    handleExperimentNameChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined
} & ContainerProps

// (3) DOM層
const Component: React.FC<Props> = props => (
    <>
        <Box onClick={props.handleClick}>
            <AddCircleIcon />
        </Box>
        <Modal
            open={props.isOpen}
            onClose={props.handleClick}
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Create a new modal
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField label="Experiment Name" variant="outlined" onChange={props.handleExperimentNameChange} />
                </Box>

                <FormControl>
                    <FormLabel>WellType</FormLabel>
                    <RadioGroup
                        defaultValue={'384'}
                        name="welltype"
                        row
                        onChange={props.handleWellTypeChange}
                    >
                        <FormControlLabel value={'96'} control={<Radio />} label="96 Well" />
                        <FormControlLabel value={'384'} control={<Radio />} label="384 Well" />
                    </RadioGroup>
                </FormControl>
                <Button
                    variant="contained"
                    onClick={() => {
                        const wellType: WellType = props.selectedWellType === '96' ? WellType.WELL_96 : WellType.WELL_384
                        Experiment.New(props.experimentName, wellType)
                        props.handleClick()
                    }}>
                    Create
                </Button>
            </Box>
        </Modal>
    </>
)

// (4) Style層
const StyledComponent = styled(Component)`
>  {
    
  }
`

// (5) Container層
export const Container: React.FC<ContainerProps> = props => {
    const [isOpen, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!isOpen)
    }

    const [selectedWellType, setSelectedWellType] = React.useState('96');

    const handleWellTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedWellType(event.target.value);
    };

    const [experimentName, setExperimentName] = React.useState('Experiment');

    const handleExperimentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExperimentName(event.target.value);
    };

    return <StyledComponent {...{
        isOpen,
        handleClick,
        selectedWellType,
        handleWellTypeChange,
        experimentName,
        handleExperimentNameChange,
        ...props,
    }} />
}