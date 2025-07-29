# 🧮 NFT Marketplace Stats Dashboard

This project is a clone of the [OpenSea Stats](https://opensea.io/stats) page that displays real-time NFT collection statistics such as Floor Price, Volume, Sales, and Ownership across various time durations (1H, 6H, 24H, 7D). It uses **React.js** for the frontend and **Firebase** for backend integration.

## 🚀 Features

- NFT Marketplace-style UI
- View collection stats with filters (1H / 6H / 24H / 7D)
- Responsive search bar to find collections
- Connect Wallet button (UI placeholder)
- Firebase integration for data hosting
- Tailwind CSS for sleek design

## 🔧 Tech Stack

| Frontend   | Backend      | Others          |
|------------|--------------|-----------------|
| React.js   | Firebase     | Tailwind CSS    |
| Vite       | Firestore DB | Git & GitHub    |

## 📦 Project Setup


# Install dependencies
npm install

# Run the development server
npm run dev
<img width="909" height="353" alt="image" src="https://github.com/user-attachments/assets/7acb556c-1cbd-4d30-8127-5b9637cdbb56" />
// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
<img width="510" height="107" alt="image" src="https://github.com/user-attachments/assets/e8480483-2c4b-41bf-87d3-3dbfd26cf269" />

<img width="425" height="406" alt="image" src="https://github.com/user-attachments/assets/d60758dc-5b21-4993-bd5c-8a0b4ddb9866" />


<img width="1187" height="236" alt="image" src="https://github.com/user-attachments/assets/6dd09960-46a2-4b65-b593-929389acceed" />

🔗 [Live Demo] (https://market-stats.onrender.com)
