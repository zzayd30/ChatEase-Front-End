# ChatEase Front-End

ChatEase is a modern, real-time chat application built with React, designed to provide a seamless and engaging communication experience. This repository contains the front-end code for ChatEase, responsible for the user interface, user interactions, and communication with the back-end API.

## Features

*   **Real-time Messaging:** Send and receive messages instantly with real-time updates powered by WebSockets.
*   **User Authentication:** Secure user registration, login, and logout functionality.
*   **Profile Management:** Update profile information, including profile picture.
*   **Dynamic Theming:** Choose from a variety of themes to customize the look and feel of the application.
*   **User Presence:** See which users are online and available for chat.
*   **Responsive Design:**  Enjoy a consistent experience across different devices and screen sizes.
*   **Image Upload:** Send images within your chat conversations.
*   **Loading Indicators:** Skeleton loaders and progress bars to enhance user experience during data fetching and processing.

## Technologies Used

*   **Programming Language:** JavaScript
*   **Framework:** React
*   **UI Library:** Tailwind CSS, DaisyUI
*   **Routing:** React Router DOM
*   **State Management:** Zustand
*   **HTTP Client:** Axios
*   **Real-time Communication:** Socket.IO Client
*   **Bundler:** Vite
*   **Linting:** ESLint
*   **Icons:** Lucide React

## Installation

Follow these steps to set up the ChatEase front-end on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/zzayd30/ChatEase-Front-End.git
    cd ChatEase-Front-End
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install or pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory of the project. While this project doesn't explicitly require environment variables beyond the API URL, you might need to configure the backend URL if it's not running on the default `http://localhost:3000/api`.  If your backend requires specific API keys, add them to the `.env` file.

    ```
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

4.  **Start the development server:**

    ```bash
    npm run dev  # or yarn dev or pnpm dev
    ```

    This will start the Vite development server, and you can access the application in your browser at the address provided (usually `http://localhost:5173`).

## Usage

Once the development server is running, you can interact with the ChatEase application through your web browser.

*   **Sign Up/Log In:** Create a new account or log in with existing credentials.
*   **Browse Users:** View a list of available users in the sidebar.
*   **Start a Chat:** Select a user from the sidebar to initiate a chat.
*   **Send Messages:** Type your message in the input field and press Enter or click the send button.
*   **Receive Messages:** Messages from the selected user will appear in real-time.
*   **Change Theme:** Navigate to the settings page to select a different theme.
*   **Update Profile:** Go to the profile page to update your profile picture.

Example of sending a message:

```javascript
import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore';

function MessageInput() {
  const [messageText, setMessageText] = useState('');
  const sendMessage = useChatStore((state) => state.sendMessage);
  const selectedUser = useChatStore((state) => state.selectedUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim() && selectedUser) {
      sendMessage(selectedUser._id, messageText);
      setMessageText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;
```

## Project Structure

Here's a brief overview of the main files and directories in the project:

*   `src/`: Contains the main source code for the application.
    *   `components/`: Reusable React components.
        *   `AuthImagePattern.jsx`: Component for authentication page visual pattern.
        *   `ChatContainer.jsx`: Component that manages the chat interface.
        *   `ChatHeader.jsx`: Component for the chat header.
        *   `MessageInput.jsx`: Component for the message input field.
        *   `Navbar.jsx`: Component for the navigation bar.
        *   `NoChatSelected.jsx`: Component displayed when no chat is selected.
        *   `Sidebar.jsx`: Component for the sidebar containing user list.
        *   `skeletons/`: Skeleton loading components.
    *   `constants/`: Defines constant values used throughout the application.
        *   `index.js`: Contains the `THEMES` array.
    *   `lib/`: Utility functions and helper modules.
        *   `axios.js`: Configured Axios instance for API requests.
        *   `utils.js`: Utility functions, such as time formatting.
    *   `pages/`: React components representing different pages of the application.
        *   `HomePage.jsx`: The main chat page.
        *   `LogInPage.jsx`: Login page component.
        *   `ProfilePage.jsx`: User profile page.
        *   `SettingsPage.jsx`: Settings page for theme selection.
        *   `SignUpPage.jsx`: Signup page component.
    *   `store/`: Zustand stores for managing application state.
        *   `useAuthStore.js`: Store for authentication state.
        *   `useChatStore.js`: Store for chat-related state.
        *   `useStoreTheme.js`: Store for managing the application theme.
    *   `App.jsx`: The main application component.
    *   `main.jsx`: Entry point for the React application.
    *   `index.css`: Global CSS styles.
*   `public/`: Contains static assets like images.
*   `vite.config.js`: Vite configuration file.
*   `tailwind.config.js`: Tailwind CSS configuration file.
*   `postcss.config.js`: PostCSS configuration file.
*   `package.json`: Project dependencies and scripts.
*   `README.md`: Project documentation.
*   `vercel.json`: Vercel deployment configuration.
*   `eslint.config.js`: ESLint configuration file.

## Contributing

We welcome contributions to the ChatEase project! Please follow these guidelines:

1.  **Fork the repository:** Create your own fork of the repository on GitHub.
2.  **Create a branch:** Create a new branch for your feature or bug fix.
3.  **Make changes:** Implement your changes and ensure they are well-tested.
4.  **Commit changes:** Commit your changes with clear and concise commit messages.
5.  **Submit a pull request:** Submit a pull request to the main repository.

Please ensure your code adheres to the project's coding style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
