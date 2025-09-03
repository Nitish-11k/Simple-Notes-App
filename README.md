# Notes App

A simple notes application built with Java Spring Boot backend and React frontend, featuring CRUD operations and note sharing functionality.

## Features

- ✅ Create, read, update, and delete notes
- ✅ Search notes by title
- ✅ Share notes with unique links
- ✅ Shared notes expire after 7 days
- ✅ Responsive design
- ✅ Modern UI with beautiful styling

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (in-memory)
- Maven

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Modern CSS with responsive design

## Project Structure

```
Note app/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/example/notesapp/
│   │   ├── controller/      # REST controllers
│   │   ├── model/          # JPA entities
│   │   ├── repository/     # Data repositories
│   │   └── NotesAppApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   └── App.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

3. (Optional) Access H2 Database Console:
   - Go to `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:notesdb`
   - Username: `sa`
   - Password: `password`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

## API Endpoints

### Notes API
- `GET /api/notes` - Get all notes
- `GET /api/notes/{id}` - Get note by ID
- `POST /api/notes` - Create new note
- `PUT /api/notes/{id}` - Update note
- `DELETE /api/notes/{id}` - Delete note
- `GET /api/notes/search?title={title}` - Search notes by title

### Share API
- `POST /api/share/{noteId}` - Create share link for note
- `GET /api/share/{shareToken}` - Get shared note by token
- `DELETE /api/share/{noteId}` - Revoke share link

## Usage

1. **Create Notes**: Click "Create New Note" to add a new note with title and content
2. **Edit Notes**: Click the "Edit" button on any note to modify it
3. **Delete Notes**: Click the "Delete" button to remove a note (with confirmation)
4. **Search Notes**: Use the search bar to find notes by title
5. **Share Notes**: Click "Share" to generate a shareable link
6. **View Shared Notes**: Access shared notes via the generated link

## Features in Detail

### Note Sharing
- Each note can be shared with a unique token
- Share links expire after 7 days
- Shared notes are read-only
- Share links can be revoked by the note owner

### Responsive Design
- Mobile-friendly interface
- Modern gradient design
- Smooth animations and transitions
- Intuitive user experience

### Data Persistence
- Uses H2 in-memory database for development
- All data is lost when the application restarts
- For production, configure a persistent database in `application.properties`

## Development

### Backend Development
- The backend uses Spring Boot with JPA for data persistence
- CORS is configured to allow requests from `http://localhost:3000`
- All API responses are in JSON format

### Frontend Development
- React components are organized in the `src/components` directory
- API calls are centralized in `src/services/api.js`
- Styling uses modern CSS with responsive design principles

## Production Deployment

For production deployment:

1. **Backend**: Configure a persistent database (PostgreSQL, MySQL, etc.) in `application.properties`
2. **Frontend**: Build the React app with `npm run build` and serve the static files
3. **CORS**: Update CORS configuration to allow your production domain

## License

This project is open source and available under the MIT License.
