"use client"
import { useState } from "react";
import { Button, TextField, FormHelperText, Box, Typography } from "@mui/material";


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
                console.log("API Response:", data);
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
            <h2>Shorten Your URL</h2>
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
            <FormHelperText>Enter the URL and alias you'd like to shorten.</FormHelperText>
                <Button variant="contained" type="submit" disabled={!originalURL! || !alias}>
                    Shorten URL
                </Button>
                
                <div
                    style={{
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        minHeight: '50px',
                    }}
                >
                    {shortenedUrl ? (
                        <p>
                            Shortened URL:{' '}
                            <a
                                href={shortenedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'blue', textDecoration: 'underline' }}
                            >
                                {shortenedUrl}
                            </a>
                        </p>
                    ) : (
                        <p style={{ color: '#888' }}>Your shortened URL will appear here.</p>
                    )}
                </div>

            
            </form>
        </div>
        );
    };
    

