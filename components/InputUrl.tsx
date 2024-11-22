"use client"
import { useState } from "react";
import { Button, TextField, FormHelperText, Box, Typography, Link } from "@mui/material";


export default function InputUrl() {
    const [originalURL, setOriginalURL] = useState("");
    const [alias, setAlias] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
    
    async function submitNewUrl() {
        try {
            const response = await fetch('/api/shorten-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ alias, origURL: originalURL }),
            });
  
            const data = await response.json();
  
            if (response.ok) {
                //set the shortened url with my domain and alias
                setShortenedUrl(data.shortenedUrl);  
            } else {
                alert("Failed to shorten the URL. Try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while shortening the URL.");
        }
    }
  

    return (
        <div>
            <form className="w-96 p-4 rounded-xl bg-sky-300"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitNewUrl();
                }}
            >
            <TextField
                variant="filled"
                sx={{backgroundColor: "white", width: "100%" }}
                label="Original URL"
                value={originalURL}
                onChange={(e) => setOriginalURL(e.target.value)}
            />
            <TextField
                variant="filled"
                sx={{backgroundColor: "white", width: "100%" }}
                placeholder="Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
            />
            
            <Button variant="contained" type="submit" disabled={!originalURL! || !alias}>
                Shorten URL
            </Button>
                
            <Box
                sx={{
                    marginTop: 2,
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                    minHeight: '50px', 
                    display: 'flex',

                }}
            >
                {shortenedUrl ? (
                    <Typography variant="body1" color="text.primary">
                        Shortened URL:{' '}
                        <Link
                            href={shortenedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: 'primary.main', textDecoration: 'underline' }}
                        >
                            {shortenedUrl}
                        </Link>
                    </Typography>
                    ) : (
                    <Typography variant="body2" color="text.secondary">
                        Your shortened URL will appear here.
                    </Typography>
                )}
            </Box>
            </form>
        </div>
        );
    };
    

