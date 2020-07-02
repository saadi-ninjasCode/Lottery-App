export const customStyle = {
    rows: {
        style: {
            backgroundColor: 'rgb(30, 30, 47)',
        }
    },
    headRow: {
        style: {
            backgroundColor: 'rgb(30, 30, 47)',
        }
    },
    table: {
        style: {
            color: 'rgb(255, 255, 255,0.7)',
            backgroundColor: 'rgb(30, 30, 47)',
        },
    },
    headCells: {
        style: {
            fontSize: '16px',
            fontWeight: 600,
            color: '#525f7f'
        },
        activeSortStyle: {
            color: '#474f8f',
            '&:hover:not(:focus)': {
                color: '#474f8f',
            },
        },
        inactiveSortStyle: {
            '&:hover': {
                color: '#474f8f'
            },
        },
    },
    noData: {
        style: {
            backgroundColor: 'rgb(30, 30, 47)',
        },
    },
    progress: {
        style: {
            backgroundColor: 'rgb(30, 30, 47)',
        }
    }
}
