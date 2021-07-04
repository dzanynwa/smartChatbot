import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';

const ListRecords = ({ list, deleteEntry }) => {
    return (
        <Box mt="10%">
            <Typography variant="h2">
                Answers: 
            </Typography>
            {list.length === 0 && 
            <Typography variant="h5">
                No answers recorded, start recording!
            </Typography>
            }
            <Box display="flex" flexDirection="row" flexWrap="wrap" mt="3%">
            {list.map((item, index) => {
                return (
                    <Box key={index} flexDirection="column" width="25%" mr={5} mb={4}>
                        <Typography variant="h6">{index + 1 + ". " + item.title}</Typography>
                        <video style={{ width: '105%'}} controls src={window.URL.createObjectURL(item.video)} />
                        <Button
                            style={{width: 302}}
                            variant="contained"
                            color="secondary"
                            onClick={() => deleteEntry(index)}
                        >
                            Delete
                        </Button>
                    </Box>
                );
            })}
            </Box>
        </Box>
    );
};

export default ListRecords;
