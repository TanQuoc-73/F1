export const en = {
  // Navigation
  nav: {
    home: "Home",
    schedule: "Schedule",
    drivers: "Drivers",
    teams: "Teams",
    results: "Results",
    news: "News",
    login: "Login",
    logout: "Logout",
    profile: "Profile",
    settings: "Settings",
    adminPanel: "Admin Panel",
    signIn: "SIGN IN",
  },

  // Auth Modal
  auth: {
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    signInSubtitle: "Sign in to your account",
    joinCommunity: "Join our community",
    username: "Username",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    register: "Register",
    processing: "Processing...",
    loginSuccessful: "Login successful!",
    registrationSuccessful: "Registration successful!",
    invalidCredentials: "Invalid username or password",
    registrationFailed: "Registration failed.",
    errorOccurred: "An error occurred. Please try again.",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    adminDashboard: "Admin Dashboard",
    enterUsername: "Enter your username",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
  },

  // Forgot Password
  forgotPassword: {
    title: "Forgot Password",
    subtitle: "Enter your email to reset your password",
    emailSent: "Password reset email sent!",
    checkEmail: "Please check your email for reset instructions.",
    sendResetLink: "Send Reset Link",
    backToLogin: "Back to Login",
  },

  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    viewDetails: "View Details",
  },

  // Home Page
  home: {
    hero: {
      title: "Experience the Thrill",
      subtitle: "Follow every race, every driver, every moment",
      cta: "Explore Now",
    },
    upcomingRaces: "Upcoming Races",
    latestNews: "Latest News",
    topDrivers: "Top Drivers",
  },

  // Schedule
  schedule: {
    title: "Race Schedule",
    round: "Round",
    grandPrix: "Grand Prix",
    circuit: "Circuit",
    date: "Date",
    time: "Time",
    status: "Status",
    upcoming: "Upcoming",
    completed: "Completed",
    live: "Live",
  },

  // Drivers
  drivers: {
    title: "Drivers",
    number: "Number",
    name: "Name",
    team: "Team",
    nationality: "Nationality",
    points: "Points",
    wins: "Wins",
    podiums: "Podiums",
    biography: "Biography",
  },

  // Teams
  teams: {
    title: "Teams",
    teamName: "Team Name",
    base: "Base",
    teamChief: "Team Chief",
    technicalChief: "Technical Chief",
    chassis: "Chassis",
    powerUnit: "Power Unit",
    firstEntry: "First Entry",
    worldChampionships: "World Championships",
    polePositions: "Pole Positions",
    fastestLaps: "Fastest Laps",
  },

  // Results
  results: {
    title: "Race Results",
    position: "Position",
    driver: "Driver",
    team: "Team",
    laps: "Laps",
    time: "Time",
    points: "Points",
    fastestLap: "Fastest Lap",
    status: "Status",
  },

  // News
  news: {
    title: "Latest News",
    readMore: "Read More",
    publishedOn: "Published on",
    author: "Author",
    category: "Category",
    relatedNews: "Related News",
  },

  // Admin
  admin: {
    dashboard: "Dashboard",
    manageDrivers: "Manage Drivers",
    manageTeams: "Manage Teams",
    manageRaces: "Manage Races",
    manageNews: "Manage News",
    manageUsers: "Manage Users",
    addNew: "Add New",
    update: "Update",
    confirmDelete: "Are you sure you want to delete this item?",
  },
};

export type Translations = typeof en;
