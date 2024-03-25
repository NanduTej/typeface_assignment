import React, { useState, useEffect } from 'react';
import './FileList.css';

function FileList({ page, perPage, sortBy, sortDir, onRename, onDelete, onPagination, onSort }) {
    const [files, setFiles] = useState([]);
    const [selectedFileId, setSelectedFileId] = useState(null);

    const fetchFileList = () => {
        fetch(`http://127.0.0.1:5000/files?page=${page}&per_page=${perPage}&sort_by=${sortBy}&sort_dir=${sortDir}`)
            .then(response => response.json())
            .then(data => {
                setFiles(data.files);
            })
            .catch(error => {
                console.error('Error fetching file list:', error);
            });
    };

    useEffect(() => {
        fetchFileList();
    }, [page, perPage, sortBy, sortDir]);

    const handleRename = () => {
        if (selectedFileId !== null) {
            onRename(selectedFileId);
            console.log('Rename file with ID:', selectedFileId);
        }
    };

    const handleDelete = () => {
        if (selectedFileId !== null) {
            fetch(`http://127.0.0.1:5000/files/${selectedFileId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    console.log('File deleted successfully');
                } else {
                    throw new Error('Failed to delete file');
                }
            })
            .catch(error => {
                console.error(error);
            });
            window.location.reload();
        }
    };

    const handleCheckboxChange = (fileId) => {
        setSelectedFileId(fileId === selectedFileId ? null : fileId);
    };

    const handleNextPage = () => {
        onPagination(page + 1, perPage);
    };

    const handlePrevPage = () => {
        onPagination(page - 1, perPage);
    };

    const handlePerPageChange = (event) => {
        onPagination(1, parseInt(event.target.value));
    };

    const handleSort = (field, dir) => {
        if (dir===true){
            onSort(field, 'desc');
        }else{
            onSort(field, 'asc');
        }
        
    };

    return (
        <div>
            <h2>File List</h2>
            <div className="file-actions">
                <button onClick={handleRename} disabled={selectedFileId === null}>Rename</button>
                <button onClick={handleDelete} disabled={selectedFileId === null}>Delete</button>
            </div>
            <br></br>
            <table className="file-table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th onClick={() => {handleSort('name', sortDir === 'asc')}}>File Name {sortBy === 'name' && (sortDir === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => handleSort('upload_time', sortDir === 'asc')}>Upload Time {sortBy === 'upload_time' && (sortDir === 'asc' ? '▲' : '▼')}</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(file => (
                        <tr key={file.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedFileId === file.id}
                                    onChange={() => handleCheckboxChange(file.id)}
                                />
                            </td>
                            <td>{file.name}</td>
                            <td>{file.upload_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                <span>Page {page} </span>
                <button onClick={handleNextPage}>Next</button>
                <select value={perPage} onChange={handlePerPageChange}>
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                </select>
            </div>
        </div>
    );
}

export default FileList;