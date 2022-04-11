import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Stack } from '@mui/material';

import { useRouter } from 'next/router';

export default function WorkerCard() {

    const router = useRouter();
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', border:'none', width:400,height:200, margin:10 }}>
        <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://www.jquery-az.com/html/images/banana.jpg"
        alt="Live from space album cover"
      />

      <CardContent><Box>
          Hello<Stack style={{cursor:"pointer"}} >View</Stack>
          </Box></CardContent>
      
    </Card>
  );
}
