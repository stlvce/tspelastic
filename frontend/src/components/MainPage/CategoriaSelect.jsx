import React, { useState, useContext } from "react";
import { FormControl, Select, InputLabel, OutlinedInput, MenuItem, Box, Chip} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { LangContext } from "../../context/langContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightBold,
    };
}

export default function CategoriaSelect({ categories }) {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [selectLang] = useContext(LangContext);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 600 }} color="secondary">
                <InputLabel id="demo-multiple-chip-label">{selectLang.categor}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label={selectLang.categor} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {categories.map((item) => (
                        <MenuItem
                            key={item.name}
                            value={item.name}
                            style={getStyles(item.name, personName, theme)}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}