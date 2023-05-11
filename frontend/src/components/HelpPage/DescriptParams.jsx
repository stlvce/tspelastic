import React, { useContext } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { LangContext } from "../../context/langContext";

export default function DescriptParams() {
    const [selectLang] = useContext(LangContext);

    return (
        <List>
            {Object.keys(selectLang.parmDescript).map(key =>
                <ListItem key={key} >
                    <Typography variant="body1" sx={{ fontSize: "20px"}}>
                        {key} - {selectLang.parmDescript[key].toLowerCase()}
                    </Typography>
                </ListItem>    
            )}
        </List>        
    )
}