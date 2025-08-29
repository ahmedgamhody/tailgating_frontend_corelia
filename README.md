# Frontend Structure

```bash

├── src                                             # directory for source code for the whole Frontend logic
│    ├── components                                 # dir for reusable UI components
│    │   ├── actions                                # dir for action components
│    │   │   ├── MoveToEndSectionIconAction.tsx     # Move to end section action component
│    │   │   └── RemoveIconAction.tsx               # Remove icon action component
│    │   │
│    │   ├── channels                               # dir for channel-related components
│    │   │   ├── EndedChannels.tsx                  # Component for ended channels display
│    │   │   ├── LiveChannels.tsx                   # Component for live channels display
│    │   │   └── PausedChannels.tsx                 # Component for paused channels display
│    │   │
│    │   ├── headers                                # dir for header and navigation components
│    │   │   └── NavBar.tsx                         # Main navigation bar component
│    │   │
│    │   ├── Modal                                  # dir for modal dialog components
│    │   │   └── AddChannelModal.tsx                # Modal for adding new channels
│    │   │
│    │   └── SideBar                                # dir for sidebar components
│    │       ├── ChannelsSideBar.tsx                # Sidebar for channel management
│    │       └── PlotsSideBar.tsx                   # Sidebar for plots and analytics
│    │
│    ├── pages                                      # dir for application pages
│    │   ├── Dashboard                              # dir for dashboard page
│    │   │   └── DashboardPage.tsx                  # Main dashboard page component
│    │   │
│    │   ├── homePage                               # dir for home page components
│    │   │   ├── Frame.tsx                          # Frame component for home page
│    │   │   └── HomePage.tsx                       # Main home page component
│    │   │
│    │   ├── Live streaming                         # dir for live streaming functionality
│    │   │   ├── LiveStreaming.tsx                  # Main live streaming component
│    │   │   └── Plots/                             # dir for streaming plots and analytics
│    │   │
│    │   └── loginPage                              # dir for login page components
│    │       └── ...                                # Login page related components
│    │
│    ├── store                                      # dir for state management (Redux/Zustand)
│    │   ├── hooks.ts                               # Custom hooks for store
│    │   ├── store.ts                               # Main store configuration
│    │   ├── auth/                                  # Auth state management
│    │   ├── channel/                               # Channel state management
│    │   └── ui/                                    # UI state management
│    │
│    ├── layouts                                    # dir for layout components
│    │   └── MainLayout.tsx                         # Main application layout
│    │
│    ├── interfaces                                 # dir for TypeScript interfaces
│    │   └── index.ts                               # Main interfaces export file
│    │
│    ├── types                                      # dir for type definitions
│    │   ├── index.ts                               # Main types export file
│    │   └── guards/                                # Type guards directory
│    │
│    ├── utils                                      # dir for utility functions
│    │   ├── api.ts                                 # API utility functions
│    │   ├── axiosErrorHandler.ts                   # Axios error handling utilities
│    │   └── axiosInstance.ts                       # Axios instance configuration
│    │
│    ├── ui                                         # dir for UI utilities and skeletons
│    │   └── skeletons/                             # Loading skeleton components
│    │
│    ├── assets                                     # dir for static assets
│    │   └── login.png                              # Login page image
│    │
│    ├── App.tsx                                    # Main App component
│    ├── main.tsx                                   # Application entry point
│    ├── index.css                                  # Global CSS styles
│    └── vite-env.d.ts                              # Vite environment type definitions
│
├── index.html                                      # Main HTML template
├── package.json                                    # Dependencies and scripts configuration
├── vite.config.ts                                  # Vite bundler configuration
├── tailwind.config.js                              # Tailwind CSS configuration
├── postcss.config.js                               # PostCSS configuration
├── eslint.config.js                                # ESLint configuration
├── tsconfig.json                                   # TypeScript configuration
├── tsconfig.app.json                               # TypeScript app-specific configuration
├── tsconfig.node.json                              # TypeScript node-specific configuration
├── .env                                            # Environment variables script
├── dockerfile                                      # Docker configuration for containerization
├── Makefile                                        # Build and deployment commands
└── README.md                                       # ...
```
