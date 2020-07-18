import React from 'react'

export const Loader = () => {
    console.log("loader")
    return (
        <div style={{ paddingTop: '5%', paddingBottom: '5%' }}>
            <i className="fas fa-spinner fa-pulse fa-7x"></i>
        </div>
    )
}
