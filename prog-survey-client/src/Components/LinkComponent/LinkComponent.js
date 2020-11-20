import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';


function LinkComponent() {
    return (
        <>
            <div className="graph-selector-container">
                <ButtonGroup aria-label="Basic example">
                    <Link to='/'>
                        <Button variant="outline-info">Bar Graph</Button>
                    </Link>
                    <Link to='/pie'>
                        <Button variant="outline-success">Pie Graph</Button>
                    </Link>
                </ButtonGroup>
            </div>
        </>
    )
}

export default LinkComponent;