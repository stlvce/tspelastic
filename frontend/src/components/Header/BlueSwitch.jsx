import Switch from "@mui/material/Switch";
import { alpha, styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const BlueSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: blue[200],
        '&:hover': {
            backgroundColor: alpha(blue[900], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: blue[900],
    },
}));

export default BlueSwitch;