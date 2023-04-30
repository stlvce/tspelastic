import React, { useState, useContext } from "react";
import { FormControl, Select, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText} from "@mui/material";
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

export default function CategoriaSelect({ categories }) {
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
                <InputLabel id="demo-multiple-checkbox-label">{selectLang.categor}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label={selectLang.categor} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {categories.map((item) => (
                        <MenuItem
                            key={item.name}
                            value={item.name}
                        >
                            <Checkbox checked={personName.indexOf(item.name) > -1} />
                            <ListItemText primary={item.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}