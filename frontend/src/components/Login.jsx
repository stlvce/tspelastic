import React, { useState, useContext } from "react";
import { LangContext } from "../context/langContext";
import { Container, Button, FormControl, TextField } from "@mui/material";
import { useCanvasStore } from "../services/state";
import { shallow } from "zustand/shallow";

export default function Login() {
    const state = useCanvasStore((state) => state, shallow);
    const [data, setData] = useState({ login: "", password: "" });
    const [error, setError] = useState(false);
    const [selectLang] = useContext(LangContext);

    const entryAdmin = () => {
        if (data.login === "admin" && data.password === "admin") {
            state.entry();
        } else {
            setError(true);
        }
    }

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        data[id] = value;
        setData(data);
    }

    return (
        <Container sx={{ pt: 30 }}>
            <FormControl sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <TextField id="login" label={selectLang.login} onChange={handleChange} error={error} helperText={error && selectLang.validEntry}/>
                <TextField id="password" label={selectLang.password} type="password" onChange={handleChange} error={error}/>
                <Button onClick={entryAdmin} variant="outlined" color="secondary">{selectLang.entry}</Button>
            </FormControl>
        </Container>
    )
}