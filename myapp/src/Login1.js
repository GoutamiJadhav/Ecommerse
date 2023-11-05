import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
//  import ProductListing from "./ProductListing";

const Login1 = () => {
    const navigate = useNavigate();
    const [Inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handlechange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(Inputs);
        // Add your login logic here
        try {
            const response = await fetch("http://127.0.0.1:5000/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Inputs),
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/product');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
        
    };

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <Box
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    alignItems={"center"}
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    padding={3}
                    borderRadius={5}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc",
                        },
                    }}
                >
                    <Typography variant="h3" padding={3} textAlign={"center"}>
                        Login
                    </Typography>
                    <TextField
                        onChange={handlechange}
                        name="email"
                        value={Inputs.email}
                        margin="normal"
                        type={"email"}
                        variant="outlined"
                        placeholder="Email"
                    />
                    <TextField
                        onChange={handlechange}
                        name="password"
                        value={Inputs.password}
                        margin="normal"
                        type={"password"}
                        variant="outlined"
                        placeholder="Password"
                    />
                    <Button
                        type="submit"
                        sx={{ marginTop: 3, borderRadius: 3 }}
                        variant="contained"
                        color="success"
                    >
                        Login
                    </Button>
                    

                </Box>
            </form>
        </div>
    );
};

export default Login1;
