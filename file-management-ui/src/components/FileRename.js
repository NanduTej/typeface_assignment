import React, { useState } from 'react';

function FileRename({ fileId, onRename }) {
    const [newFileName, setNewFileName] = useState('');

    const handleChange = (event) => {
        setNewFileName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://127.0.0.1:5000/files/${fileId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newFileName })
        })
        .then(response => response.json())
        .then(data => {
            console.log('File renamed:', data);
            onRename();
        })
        .catch(error => {
            console.error('Rename error:', error);
        });
    };

    return (
        <div>
            <h2>Rename File</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newFileName} onChange={handleChange} />
                <button type="submit">Rename</button>
            </form>
        </div>
    );
}

export default FileRename;