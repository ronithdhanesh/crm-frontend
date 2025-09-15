# Mini CRM Frontend

A modern React frontend for the Mini CRM system with Google OAuth authentication, customer management, and AI-powered campaign creation.

## Features

- **🔐 Google OAuth Authentication** - Secure login with Google accounts
- **👥 Customer Management** - Full CRUD operations for customer data
- **🎯 Audience Segmentation** - Create targeted customer segments using rules or AI
- **📧 Campaign Management** - Create and manage marketing campaigns
- **🤖 AI Integration** - Natural language to rule conversion
- **📱 Responsive Design** - Works on desktop and mobile devices
- **🎨 Modern UI** - Clean, professional interface with Tailwind CSS

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **TanStack Query** for data fetching
- **Axios** for API calls
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running at `https://mini-crm-backend-xeno.onrender.com/`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Layout/           # Main layout components
│   ├── Auth/            # Authentication components
│   ├── Customers/       # Customer management components
│   └── Campaigns/       # Campaign and audience components
├── pages/               # Main page components
├── hooks/               # Custom React hooks
├── services/            # API service layer
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Key Features

### Dashboard
- Overview of business metrics
- Recent activity feed
- Quick action buttons

### Customer Management
- View all customers in a card layout
- Add, edit, and delete customers
- Search functionality
- Customer details with spending and visit history

### Audience Segmentation
- **Manual Rule Builder**: Create rules using a visual interface
- **AI-Powered**: Convert natural language to structured rules
- **Real-time Preview**: See audience size as you build rules
- **Drag & Drop**: Reorder rules easily

### Campaign Management
- Create campaigns with custom message templates
- View campaign history and performance
- Delivery statistics (sent, failed, pending)
- Campaign status tracking

## API Integration

The frontend integrates with the backend API at `https://mini-crm-backend-xeno.onrender.com/`:

- **Authentication**: Google OAuth flow
- **Customers**: Full CRUD operations
- **Orders**: Order management
- **AI**: Natural language to rules conversion
- **Campaigns**: Campaign creation and management

## Authentication Flow

1. User visits the application
2. If not authenticated, redirected to login page
3. Click "Continue with Google" to authenticate
4. Redirected to Google OAuth
5. After successful authentication, redirected back to dashboard
6. Session maintained with cookies

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

### Environment Variables

No environment variables are required for development. The backend URL is hardcoded in the API service.

## Deployment

The application can be deployed to any static hosting service:

1. Build the application:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.