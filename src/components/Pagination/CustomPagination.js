import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import usePagination from '@mui/material/usePagination';
import './CustomPagination.css';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

export default function CustomPagination({ setPage, numOfPages = 10, page }) {
  const { items } = usePagination({
    count: numOfPages,
    page,
    onChange: (_e, value) => {
      setPage(value);
      window.scroll(0, 0);
    },
  });

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 1,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <div className="custom-pagination">
          {items.map(({ page, type, selected, ...item }, index) => {
            let children;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '...';
            } else if (type === 'page') {
              children = (
                <Button
                  {...item}
                  sx={{
                    backgroundColor: selected ? '#006eff' : 'transparent',
                    color: 'white', // Warna teks diubah menjadi putih
                    fontWeight: selected ? 'bold' : 'bold', // Ubah jika diperlukan
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: selected ? '#00aeff' : '#006eff',
                    },
                  }}
                >
                  {page}
                </Button>
              );
            } else {
              children = (
                <Button
                  {...item}
                  sx={{
                    backgroundColor: selected ? '#006eff' : 'transparent',
                    color: 'white', // Warna teks diubah menjadi putih
                    fontWeight: selected ? 'bold' : 'bold', // Ubah jika diperlukan
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: selected ? '#00aeff' : '#006eff',
                    },
                  }}
                >
                  {type === 'next' ? <ArrowRightIcon /> : <ArrowLeftIcon />}
                </Button>
              );
            }
            return <span key={index}>{children}</span>;
          })}
        </div>
      </ThemeProvider>
    </div>
  );
}
