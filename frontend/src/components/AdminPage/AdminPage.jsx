import React, { useContext } from "react";
import { LangContext } from "../../context/langContext";
import { Container, Box, Tab, Tabs } from "@mui/material";
import TableParametrs from "../Scheme/TableParametrs";
import TableProducts from "./TableProducts";

function TabPanel({ children, value, index, ...other }) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminPage = () => {
    const [value, setValue] = React.useState(0);
    const [selectLang] = useContext(LangContext);
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <main>
            <Container sx={{ pt: '100px' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={value} 
                            onChange={handleChange} 
                            aria-label="basic tabs example"
                            textColor="secondary"
                            indicatorColor="secondary"
                        >
                            <Tab label={selectLang.tableProdLabel} {...a11yProps(0)} />
                            <Tab label={selectLang.tableParamLabel} {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <TableProducts/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TableParametrs />
                    </TabPanel>
                </Box>
            </Container>
        </main>    
    )
}

export default AdminPage;