import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import FileRename from './components/FileRename';

function App() {
    const [renamingFileId, setRenamingFileId] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [sortBy, setSortBy] = useState('upload_time');
    const [sortDir, setSortDir] = useState('desc');

    const handleUpload = () => {
      window.location.reload();
      console.log('File uploaded successfully');
    };

    const handleRename = (fileId) => {
        setRenamingFileId(fileId);
    };

    const handlePaginationChange = (newPage, newPerPage) => {
        setPage(newPage);
        setPerPage(newPerPage);
    };

    const handleSortChange = (newSortBy, newSortDir) => {
        setSortBy(newSortBy);
        setSortDir(newSortDir);
    };

    return (
        <div className="App">
            <main>
                <FileUpload onUpload={handleUpload}/>
                <FileList
                    page={page}
                    perPage={perPage}
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onRename={handleRename}
                    onPagination={handlePaginationChange}
                    onSort={handleSortChange}
                />
                {renamingFileId && <FileRename fileId={renamingFileId} onRename={() => {setRenamingFileId(null);window.location.reload();}} />}
            </main>
        </div>
    );
}

export default App;