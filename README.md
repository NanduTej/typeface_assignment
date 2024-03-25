# File Management App

This project is a simple file management application built using Flask for the backend and React for the frontend. It allows users to perform basic CRUD operations (Create, Read, Update, Delete) on files, as well as listing and sorting them based on upload time and file name.

## Features

- **Upload Files**: Users can upload files to the server.
- **List Files**: The application displays a list of uploaded files, including their name, size, and upload time.
- **Rename Files**: Users can rename files.
- **Delete Files**: Users can delete files.

## Backend (Flask)

- **Endpoints**:
  - `/files/uploads`: POST (Upload file)
  - `/files`: GET (List files)
  - `/files/<file_id>`: PUT (Rename file), DELETE (Delete file)
- **Sorting**: The backend supports sorting of files by name and upload time.

## Frontend (React)

- **Components**:
  - `FileList`: Displays the list of files, allows sorting, pagination, renaming, and deleting files.
  - `FileUpload`: Component for uploading files.
- **Pagination**: Implemented using pagination controls to navigate between pages and choose the number of records per page.
- **Sorting**: Implemented sorting functionality in the file list table header.

## Installation and Usage

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask server:

   ```bash
   flask run
   ```

4. Install frontend dependencies:

   ```bash
   cd file-management-ui
   npm install
   ```

5. Run the React development server:

   ```bash
   npm start
   ```

6. Access the application at http://localhost:3000.
