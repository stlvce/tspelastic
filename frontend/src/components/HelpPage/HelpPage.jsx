import React, { useContext } from 'react';
import { LangContext } from '../../context/langContext';
import { Typography, Box, Tabs, Tab, Grid } from '@mui/material';

function TabPanel({ children, value, index, spacing, ...other }) {  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Grid container sx={{ p: 5 }} spacing={spacing}>
                {children}
            </Grid>
        )}
      </div>
    );
}
  
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
  

const HelpPage = () => {
    const [selectLang] = useContext(LangContext);
    const [value, setValue] = React.useState(0);  
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <main>
            <Box
                sx={{ display: 'flex', pt: "100px" }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', minWidth: 150 }}
                    textColor='secondary'
                >
                    <Tab label={selectLang.tutor} {...a11yProps(0)} />
                    <Tab label={selectLang.param} {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0} spacing={1}>
                    <Grid item xs="12">
                        <Typography variant='h4' sx={{ mb: "0.3em" }}>{selectLang.tutor}</Typography>
                    </Grid>
                    {selectLang.textTutor.map((el, i) =>
                        <Box key={i}>
                            <Grid item>
                                <Typography sx={{ fontSize: "18px" }}>{selectLang.textTutor[i]}</Typography>
                            </Grid>
                            <Grid item sx={{mb: "1em"}}>
                                <img 
                                    src={selectLang.imgTutor[i]} 
                                    alt={selectLang.tutor} 
                                    loading="lazy" 
                                    width="80%"
                                    border="1px"
                                />
                            </Grid>
                        </Box>
                    )}
                </TabPanel>
                <TabPanel value={value} index={1} spacing={3}>
                    <Grid item xs="12"> 
                        <Typography variant='h4' sx={{ mb: "0.3em" }} >{selectLang.param}</Typography>
                        <Typography sx={{ fontSize: "18px" }}>
                            {selectLang.description}
                        </Typography>
                    </Grid>
                    {Object.keys(selectLang.parmDescript).map(key =>
                        <Grid item xs="6">
                            <Typography sx={{ fontSize: "16px"}} key={key}>
                                {key} - {selectLang.parmDescript[key].toLowerCase()}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs="12">
                        <img 
                            src={selectLang.imgParam} 
                            alt={selectLang.param} 
                            loading="lazy" 
                            width="80%"
                        />
                    </Grid>
                </TabPanel>
            </Box>
        </main>    
    )
}

export default HelpPage;