Research: Eliza User recognition system
=======================================

## 1. User Recognition Methods

### **Unique User Identification**

#### **Traditional Registration & Authentication**
- **Forms & Social Login:**  
  - **React Components & React Router:** Use standard React components along with `react-router-dom` to build registration and login forms.
  - **State Management:** Store user inputs using React’s `useState` and `useContext` for managing authentication state.
- **JWT-Based Sessions:**  
  - After traditional login, your back end could issue a JSON Web Token (JWT) that you store in memory or in secure cookies (if you later integrate a back-end framework).

#### **Web3 Wallet Registration**
- **Wallet Integration via StarkNet:**  
  - **Packages:** Use `@starknet-react/core`, `starknet`, and `starknet.js` to allow users to connect their StarkNet-compatible wallets (e.g., Argent X or other supported wallets).
  - **Connection & Signature:**  
    - When a user selects wallet login, prompt them to connect their wallet using the hooks and components provided by `@starknet-react/core`.
    - Implement a “Sign-In with Wallet” mechanism where the user is asked to sign a challenge message. This signed message serves as proof of wallet ownership.
  - **Wallet as Unique ID:**  
    - The connected wallet’s address becomes the unique identifier for that user. This identifier can be used to create or link to a user profile, and further interactions (e.g., token rewards) can be managed on-chain or off-chain as needed.

---

## 2. Session Management

### **Session Tracking**
- **React State & Context:**  
  - Utilize React’s built-in state management (via `useState`, `useContext`, or even `useReducer`) to track whether a user is logged in (by traditional authentication or via wallet connection).
  - Use `react-router-dom` to create protected routes that render only when a valid session exists.
- **Token-Based Sessions:**  
  - For traditional sessions, if JWTs are issued, they can be stored in memory or via secure, HttpOnly cookies (managed by your back end) to persist authentication between page reloads.
- **Wallet Session Persistence:**  
  - The wallet connection state from `@starknet-react/core` can be maintained in a React context. This ensures that if the user refreshes the page, your app can reinitialize the connection state (as long as the wallet remains connected).

### **Security Best Practices**
- **Secure Storage:**  
  - If storing tokens on the client side, use secure practices (e.g., HttpOnly cookies where possible) to mitigate XSS risks.
- **Session Expiration & Renewal:**  
  - Implement session expiration logic in your React context. For example, after a set period, prompt the user to re-authenticate, whether through a traditional login or by re-signing the challenge message.

---

## 3. Data Persistence Options

### **Storing User and Application Data**
- **Profile Data & Learning Progress:**
  - **Local State & API Integration:**  
    - Use React state (or a context provider) for immediate UI updates.
    - Persist data (e.g., user profiles, learning progress, AI interaction logs) by interfacing with your back-end API. Although you’re not using a dedicated database package in your dependencies, you can use the native `fetch` API (or similar lightweight approaches) to interact with your server.
- **On-Chain vs. Off-Chain:**
  - **Wallet Data:**  
    - The wallet address (from StarkNet) is stored as part of the user’s profile. Depending on your architecture, some interactions or token rewards might be recorded on-chain using StarkNet transactions (handled by `starknet` and `starknet.js`), while detailed user progress can remain off-chain.

### **API Layer Considerations**
- **RESTful/GraphQL API:**  
  - Although your package list does not include an API client like Axios, the standard `fetch` API (built into modern browsers) is fully adequate to interface with your back-end services, which handle the heavy lifting for data persistence.

---

## 4. Memory Management Systems

### **Client-Side Memory Management**
- **React’s Virtual DOM & Hooks:**  
  - With React’s declarative nature, the virtual DOM manages much of the rendering efficiency. Use hooks such as `useEffect` to handle side effects, ensuring you clean up subscriptions (e.g., wallet connection listeners from `@starknet-react/core`) to prevent memory leaks.
- **Component Unmounting:**  
  - Leverage React’s lifecycle (via hooks) to dispose of unused state or event listeners when components unmount, ensuring optimal memory usage.

### **Server-Side Considerations (if applicable)**
- **Back-End Session Caching:**  
  - Although not directly covered by your current package list (which is frontend-focused), any server-side caching or memory management (using solutions like Redis) should follow similar principles: cleanup, expiration policies, and efficient state management.

---

## 5. Privacy Considerations

### **Data Protection & User Consent**
- **Minimal Data Collection:**
  - Only collect data that is necessary for learning personalization and wallet authentication. For example, using the wallet address as the unique identifier minimizes the need for additional sensitive personal data.
- **User-Controlled Privacy:**
  - Provide users with options (through settings pages built in React) to control what data is stored, whether they want to enable AI data logging, or how their learning progress is tracked.
- **Consent & Transparency:**
  - Clearly inform users how their data is used (both on-chain and off-chain). If certain actions (e.g., blockchain transactions) are public, explain what data is recorded and provide a mechanism to opt out if possible.

### **Secure Data Handling**
- **Encryption & HTTPS:**
  - Ensure all communications between your front end and any back-end services occur over HTTPS.
- **On-Chain Data Awareness:**
  - Since blockchain data is inherently public, educate users on what information (like their wallet address or transaction history) will be visible and ensure that any sensitive details are managed off-chain.

---

## Integrating the Concepts in Your Application

1. **User Recognition & Wallet Registration:**
   - Build your login and registration flows using React components.
   - For wallet registration, utilize `@starknet-react/core`, `starknet`, and `starknet.js` to allow users to connect their wallet and sign a challenge message for authentication.
   - Store the wallet address as the unique identifier in the user’s profile, alongside any additional data gathered through traditional means.

2. **Session Tracking & Profile Management:**
   - Use React Context and `react-router-dom` to maintain and protect session states.
   - Implement logic to handle JWT tokens (for traditional logins) and wallet connection states (for web3 users), ensuring sessions remain valid and secure across page reloads.
   - Provide user interfaces for profile management where users can update language preferences and view learning progress.

3. **Data Persistence:**
   - Persist user data by calling your back-end APIs using the native `fetch` API.
   - Store learning progress, AI interaction logs (possibly using packages like `ElizaOS` for AI interactions), and wallet-related events securely in your chosen back-end systems (Eliza already do this per default).
   - Consider separating on-chain data (wallet interactions, token rewards) from off-chain data (user progress) for better security and compliance.

4. **Memory & Performance:**
   - Rely on React’s efficient rendering and cleanup mechanisms to manage memory on the client side.
   - Use best practices for component cleanup (especially for wallet listeners) to ensure that your application remains performant as users interact with AI agents and blockchain elements.

5. **Privacy Controls:**
   - Embed privacy settings within your user profile management pages, allowing users to control the data they share.
   - Clearly display privacy policies and obtain user consent, especially for blockchain interactions that might expose wallet addresses.
   - Limit data collection to only what’s necessary for providing a personalized and secure language learning experience.

---

## Eliza Database Structure and Relationships

Eliza sets up a SQLite‐like database with several key tables. Each table is designed to store specific types of data—from user profiles to conversation memories—and the tables are interconnected to support a seamless, stateful application experience. The main tables include:

1. **Accounts**  
2. **Cache**  
3. **goals**  
4. **logs**  
5. **memories**  
6. **participants**  
7. **relationships**  
8. **rooms**

---

### 1. Accounts

**Purpose:**  
This table serves as the central repository for user profiles. It stores the basic details for every user—whether they registered using traditional methods or via web3 wallet authentication.

**Fields:**

- **id:**  
  A unique identifier for each account (e.g., a UUID). This key is referenced by other tables (such as goals, logs, and memories) to associate data with a specific user.
  
- **createdAt:**  
  The timestamp marking when the account was created.
  
- **username:**  
  The chosen display name for the user. For wallet-based users, this might be a default or user-provided alias.
  
- **email:**  
  The email address provided when communicating with Eliza (you can send it in the payload for direct client).
  
- **avatarUrl:**  
  An optional URL to the user's avatar image. If no image is provided, this may be `Null`.
  
- **details:**  
  A JSON field that can store extended metadata about the user. For example, when a user registers with a web3 wallet, you might store the wallet address here along with other preferences (such as a summary or additional flags).

---

### 2. Cache

**Purpose:**  
This table is used for storing temporary or ephemeral data. It is especially useful for caching AI responses or session-related information to reduce repeated computations and improve performance.

**Fields:**

- **key:**  
  A unique key to identify the cache entry.
  
- **agentId:**  
  References an agent (such as an AI agent’s account ID) that may be associated with the cached data.
  
- **value:**  
  The cached data itself. This could include conversation context or any computed result that benefits from caching.
  
- **createdAt:**  
  The timestamp when the cache entry was created.
  
- **expiresAt:**  
  The expiration time after which the cache entry is no longer valid.

---

### 3. goals

**Purpose:**  
This table tracks the language learning goals that users set for themselves. Each record represents a distinct goal that can be personalized to the user's learning journey.

**Fields:**

- **id:**  
  A unique identifier for the goal.
  
- **createdAt:**  
  The timestamp when the goal was created.
  
- **userId:**  
  A foreign key that links this goal to a specific user in the **Accounts** table.
  
- **name:**  
  A brief name or title for the goal.
  
- **status:**  
  Indicates the current state of the goal (for example, “active,” “completed,” or “in-progress”).
  
- **description:**  
  A longer text description providing more details about the goal.
  
- **roomId:**  
  Optionally, this field links a goal to a specific learning session or “room.”
  
- **objectives:**  
  This field may store additional structured information (such as a list of milestones or objectives) related to the goal.

---

### 4. logs

**Purpose:**  
Logs are used to record events and interactions that occur within the application. These entries are valuable for debugging, auditing, and understanding user behavior.

**Fields:**

- **id:**  
  A unique identifier for each log entry.
  
- **createdAt:**  
  The timestamp when the log was recorded.
  
- **userId:**  
  A reference to the user (from the **Accounts** table) that generated the log entry.
  
- **body:**  
  The main content of the log entry. This might be text or a JSON object, depending on what information needs to be captured.
  
- **type:**  
  A field that categorizes the log (e.g., “error,” “info,” “action”).
  
- **roomId:**  
  Optionally, this links the log to a specific session or conversation room.

---

### 5. memories

**Purpose:**  
The memories table stores AI interaction data and conversation snapshots. It is critical for maintaining context between interactions, enabling the AI to provide personalized responses based on past conversations.

**Fields:**

- **id:**  
  A unique identifier for the memory record.
  
- **type:**  
  Indicates the nature of the memory, such as “messages” for conversational data.
  
- **createdAt:**  
  The timestamp when the memory was recorded.
  
- **content:**  
  A JSON object or text that holds the message content. This may include text, attachments, or metadata about the source of the message (e.g., direct input, AI-generated).
  
- **embedding:**  
  A Blob (binary large object) that might store a vector embedding for the content. This embedding can be used for similarity searches or context recall.
  
- **userId:**  
  A foreign key that ties the memory to a specific user in the **Accounts** table.
  
- **roomId:**  
  A foreign key linking the memory to a particular conversation or learning session in the **rooms** table.
  
- **agentId:**  
  Identifies the AI agent (or another account) involved in the conversation. This helps distinguish between user-generated and AI-generated content.
  
- **unique:**  
  A flag (typically a numeric value) that may indicate whether this memory is unique or if it is a duplicate of existing records.

---

### 6. participants

**Purpose:**  
This table manages the association between users and conversation rooms. It tracks which users (or AI agents) are participating in which sessions, and it helps manage session state (e.g., what messages have been read).

**Fields:**

- **createdAt:**  
  The timestamp when the participant record was created.
  
- **userId:**  
  A reference to the user (from the **Accounts** table) who is a participant.
  
- **roomId:**  
  A foreign key linking the participant to a specific room.
  
- **userState:**  
  This field can store the current state of the user within the session (for example, “active” or “idle”). It may be `Null` if no state is set.
  
- **id:**  
  A unique identifier for the participant record.
  
- **last_message_read:**  
  Records the timestamp or identifier of the last message the participant read. This is useful for resuming conversations where the user left off.

---

### 7. relationships

**Purpose:**  
The relationships table is designed to manage any form of connection between two users. This could be useful in scenarios like mentorships, peer connections, or other social features within the learning application.

**Fields:**

- **createdAt:**  
  The timestamp when the relationship was established.
  
- **userA:**  
  A reference to one of the users in the relationship (typically a foreign key to **Accounts**).
  
- **userB:**  
  A reference to the other user in the relationship.
  
- **status:**  
  Indicates the current status of the relationship (e.g., “pending,” “accepted,” “blocked”).
  
- **id:**  
  A unique identifier for the relationship record.
  
- **userId:**  
  This additional field may serve as a redundant reference or indicate which user initiated the relationship. Its exact role can depend on the application’s specific social logic.

---

### 8. rooms

**Purpose:**  
Rooms represent distinct sessions or conversation spaces within the application. A room could correspond to a learning session, a chat between a user and an AI agent, or any other context where multiple participants interact.

**Fields:**

- **id:**  
  A unique identifier for the room. This ID is used by other tables (such as **participants**, **goals**, **logs**, and **memories**) to link data to a particular session.
  
- **createdAt:**  
  The timestamp when the room was created.

---

## How the Tables Relate

- **User Identification:**  
  The **Accounts** table is central. Its `id` is referenced by almost every other table (e.g., `userId` in **goals**, **logs**, **memories**, and **participants**) to tie data back to a specific user.

- **Session & Interaction Context:**  
  The **rooms** table defines a conversation or learning session.  
  - The **participants** table maps which users (from **Accounts**) are in each room.  
  - The **memories** table uses the `roomId` to fetch conversation history that is relevant to the ongoing session.  
  - The **logs** and **goals** tables can also reference a room via `roomId` to group related activities.

- **Ephemeral and Contextual Data:**  
  The **Cache** table stores temporary data that may relate to AI processing or short-lived session states.

- **Social and Mentorship Features:**  
  The **relationships** table defines connections between users, enabling social features such as peer mentoring or friend lists.

- **Learning Goals and Progress:**  
  The **goals** table keeps track of individual objectives that users set, which can be tied to sessions (rooms) and monitored over time.

---


## Strategy for Communicating with Eliza

### API Request Structure

To send a message to Eliza, your application must perform a **POST** request to the following endpoint:

```
POST ${ELIZA_API_URL}/${AGENT_ID}/message
```

The request payload must include:

- **text:** The message you want Eliza to process (e.g., `"Hi"`).
- **userId:** The unique identifier of the user sending the message.
- **roomId:** The identifier for the current conversation room or learning session.
- **userName:** The display name of the user.
- **unique:** A boolean flag (e.g., `true`) that can help prevent duplicate processing.

Eliza responds with a JSON object containing the reply in the `content` field:

```json
{
  "content": "Eliza reply"
}
```

---

## Implementing a User Recognition System

User recognition is vital to ensure that every message sent to Eliza is properly associated with a unique user profile. This system should support both traditional credentials (email/username) and web3 wallet authentication (using StarkNet libraries). The recognized user data (e.g., userId and userName) is then used in the payload when communicating with Eliza.

### Setting Up a React User Context

A common strategy is to use React’s Context API to store and manage the current user’s information. This context can be populated at login—whether it’s a traditional form or a wallet connection—and then used throughout your application.

#### User Context Implementation

```javascript
// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for user data.
const UserContext = createContext(null);

/**
 * UserProvider component to wrap your application.
 * This makes the user data available to all child components.
 */
export function UserProvider({ children }) {
  // `user` can contain { id, userName, email, details, ... }
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Custom hook to access user data.
 */
export function useUser() {
  return useContext(UserContext);
}
```

### Using the User Context in a Chat Component

In your chat or messaging component, you can use the stored user data when sending a message to Eliza. For example:

```javascript
// ChatComponent.jsx
import React, { useState } from 'react';
import { useUser } from './UserContext';
import { sendMessageToEliza } from './elizaAPI';

function ChatComponent() {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const handleSend = async () => {
    // Ensure that a user is recognized before sending a message.
    if (!user) {
      console.error("User not recognized. Please log in or connect your wallet.");
      return;
    }

    // Define the roomId based on the current session.
    const roomId = 'currentRoomId'; // Replace with your logic for room identification

    // Send the message to Eliza and retrieve the reply.
    const elizaReply = await sendMessageToEliza({
      text: message,
      userId: user.id,
      roomId,
      userName: user.userName,
      unique: true,
    });

    setReply(elizaReply);
  };

  return (
    <div className="chat-container">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
      <div className="reply">
        <strong>Eliza:</strong> {reply}
      </div>
    </div>
  );
}

export default ChatComponent;
```

---

## Putting It All Together

1. **User Login/Registration:**  
   - When a user logs in (either via traditional credentials or by connecting their web3 wallet), store their information (including `id` and `userName`) in the `Accounts` table.
   - Populate the React User Context (via the `UserProvider`) with the user’s data.

2. **Message Sending Flow:**  
   - When the user sends a message, the chat component uses the data from the User Context to form the request payload.
   - The application then calls the `sendMessageToEliza` function, which sends a POST request to the Eliza API.

3. **Handling the Response:**  
   - Eliza’s reply (found in the `content` field) is displayed in the chat UI.
   - Any errors during communication are caught and handled gracefully, with appropriate logging and user feedback.
