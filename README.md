

# Virtual Study Buddy Platform

## Description

Virtual Study Buddy is an online platform designed for collaborative studying among students. It features integrated AI-powered study resources from various educational platforms, real-time note-taking, community and private chat rooms, an event calendar for scheduling, and a resource-sharing hub.

## Features

1. **AI-Powered Study Resources**
   - Personalized study resources curated from YouTube, Udemy, GeeksforGeeks (GFG), Coursera, and Skillshare, TutorialsPoint.

2. **Real-Time Note-Taking**
   - Collaborative note-taking during study sessions with text editing, formatting, and sharing capabilities.

3. **Community and Private Chat**
   - Forums, chat rooms, or discussion boards for various study topics.
   - Community chat and private chat options.

4. **Event Calendar**
   - Scheduling and tracking events for users.

5. **Resource-Sharing Hub**
   - Centralized platform for sharing educational resources, including uploading, browsing, and downloading articles, videos, tutorials, and study materials.

6. **User Management**
   - Storage and management of user details.

## Technologies Used

### Frontend

- **React.js**: Library for building user interfaces.
- **Redux**: State management for React applications.
- **Styled-Components**: Styling for React components.
- **Recoil**: State management.
- **React Router**: For routing.
- **MUI (Material-UI)**: UI component library.
- **Socket.io Client**: Real-time communication.
- **React Big Calendar**: Calendar component.
- **React Player**: Media player.
- **React Icons**: Icon library.
- **React Loader Spinner**: Loading spinner.
- **Emoji Picker React**: Emoji picker component.
- **React Copy to Clipboard**: Copy to clipboard functionality.
- **TipTap**: Rich text editor.
  - `@tiptap/react`
  - `@tiptap/starter-kit`
  - `@tiptap/pm`
  - `@tiptap/extension-bold`
  - `@tiptap/extension-color`
  - `@tiptap/extension-font-family`
  - `@tiptap/extension-heading`
  - `@tiptap/extension-highlight`
  - `@tiptap/extension-image`
  - `@tiptap/extension-link`
  - `@tiptap/extension-list-item`
  - `@tiptap/extension-text-align`
  - `@tiptap/extension-text-style`
  - `@tiptap/extension-underline`

### Backend

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB, handling data modeling.
- **Socket.io**: Real-time communication for features like chat and note-taking.
- **Passport.js**: Authentication middleware for Node.js.
- **Google API**: Various integrations including authentication.
- **Gemini API**: For accessing cryptocurrency market data.
- **Nodemailer**: Email sending.
- **Puppeteer**: Headless browser for scraping.
- **Axios**: HTTP client.
- **Bcrypt.js**: Password hashing.
- **Cors**: Cross-Origin Resource Sharing.
- **Dotenv**: Environment variables management.
- **Express-Session**: Session management.
- **Googleapis**: Google APIs integration.
- **Jsonwebtoken**: JWT for authentication.
- **Morgan**: HTTP request logger.
- **Node-Cron**: Scheduled tasks.
- **Nodemon**: Development tool for auto-restarting server.
- **Slugify**: URL slugs generation.
- **Zod**: Validation library.

## Collections in MongoDB

1. **Course Collection**: Storing course-related data.
2. **ChatMessages**: Storing private chat messages.
3. **CommunityMessages**: Storing community chat messages.
4. **Community**: Storing community-related data.
5. **Events**: Storing user events.
6. **Notes**: Storing notes.
7. **Folders**: Organizing notes into folders.
8. **Topics**: Categorizing notes and discussions.
9. **Users**: Storing user details.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Lagnajit09/StudyBuddy.git
    cd StudyBuddy
    ```
2. You can remove all other files exceept STUDYBUDDY and SB-Server folders.

3. Install frontend dependencies:
    ```sh
    cd STUDYBUDDY
    npm install
    ```

4. Install backend dependencies:
    ```sh
    cd ../SB-Server
    npm install
    ```

5. Set up environment variables:
    - Create a `.env` file in the `server` directory and add the required environment variables (e.g., MongoDB URI, API keys).

```
CONN_STRING=mongodb+srv://<username>:<password>@<cluster-url>/<database>

JWT_SECRET_KEY=<your-jwt-secret-key>

GEMINI_API=<your-gemini-api-key>

ADMIN_EMAIL=<your-admin-email>
```
```
Google OAuth2 Credentials
CLIENT_ID=<your-google-client-id>

CLIENT_SECRET=<your-google-client-secret>

REDIRECT_URI=https://developers.google.com/oauthplayground

REFRESH_TOKEN=<your-google-refresh-token>
```
```
Google Client Credentials for Passport.js
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=http://localhost:5173/auth/google/callback
```
```
# Session Key
SESSION_KEY=<your-session-key>
```


6. Run the application:
    - Start the backend server:
      ```sh
      node server.js
      ```
    - Start the frontend application:
      ```sh
      cd ../STUDYBUDDY
      npm run dev
      ```

## Usage

- **Courses**: Navigate to the course page to browse, find, and view course details.
- **Chat**: Use the community chat for public discussions and private chat for one-on-one conversations.
- **Notes**: Create, organize, and share notes in real-time.
- **Events**: Schedule and track events using the event calendar.
- **Resources**: Upload, browse, and download educational resources from the resource-sharing hub.


## Contribution

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.
