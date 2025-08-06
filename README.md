## 🔗 Live Demo
[Click here to try the Weather App](https://darshan980.github.io//)

# 🎯 To-Do List App

A modern, feature-rich To-Do List application built with vanilla HTML, CSS, and JavaScript. This project demonstrates state management, DOM manipulation, user input handling, and localStorage persistence.

![To-Do List App](https://img.shields.io/badge/Status-Complete-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🔹 Core Features
- ✅ **Add Tasks**: Input a task and add it to the list
- ✏️ **Edit Tasks**: Modify existing task entries with modal dialog
- 🗑️ **Delete Tasks**: Remove tasks with confirmation
- ☑️ **Mark Completed**: Toggle completion status with visual feedback

### 🔹 Advanced Features
- 🔍 **Filter Tasks**: View All, Pending, or Completed tasks
- 💾 **Persist Data**: Automatic localStorage saving and loading
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works perfectly on all device sizes
- 📊 **Progress Tracking**: Visual progress bar and statistics
- ⌨️ **Keyboard Shortcuts**: Quick actions with keyboard
- 🎨 **Smooth Animations**: Modern UI with CSS transitions
- 📤 **Export Tasks**: Download tasks as JSON file

### 🔹 Bonus Features
- 🎯 **Task Statistics**: Track completion rates and daily progress
- 🧹 **Bulk Actions**: Clear all or completed tasks
- 🔧 **Console Commands**: Advanced features via browser console
- 🎨 **Modern UI**: Gradient backgrounds, shadows, and animations
- 🛡️ **XSS Protection**: Safe HTML rendering
- 💡 **Sample Tasks**: Demo tasks for new users

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start managing your tasks!

```bash
# Clone the repository
git clone <repository-url>
cd todo-app

# Open in browser (or double-click index.html)
open index.html
```

## 🎮 Usage

### Basic Operations
1. **Add Task**: Type in the input field and press Enter or click the + button
2. **Complete Task**: Click the circle next to any task
3. **Edit Task**: Click the edit (pencil) icon to modify task text
4. **Delete Task**: Click the delete (trash) icon to remove a task

### Filtering
- **All**: Show all tasks
- **Pending**: Show only incomplete tasks  
- **Completed**: Show only finished tasks

### Theme Toggle
Click the moon/sun icon in the header to switch between light and dark modes.

### Keyboard Shortcuts
- `Ctrl/Cmd + Enter`: Focus the task input field
- `Ctrl/Cmd + /`: Toggle dark/light theme
- `Enter`: Add task (when input is focused)
- `Escape`: Close modal dialogs

## 🏗️ Project Structure

```
todo-app/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🛠️ Technical Implementation

### State Management
- **Task Storage**: Array of task objects with unique IDs
- **Filter State**: Current view filter (all/pending/completed)
- **Theme State**: Light/dark mode preference
- **Modal State**: Edit dialog visibility and current editing task

### Data Persistence
- **localStorage**: Automatic saving and loading of all app data
- **Error Handling**: Graceful fallback if localStorage is unavailable
- **Data Structure**: JSON serialization of tasks and app state

### DOM Manipulation
- **Dynamic Rendering**: Tasks rendered from JavaScript state
- **Event Delegation**: Efficient event handling for dynamic content
- **Modal Management**: Show/hide edit dialogs with proper focus handling
- **Theme Switching**: CSS custom properties for theme management

### User Experience
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Visual Feedback**: Animations, hover states, and status indicators
- **Error Prevention**: Input validation and confirmation dialogs

## 🎨 Styling Features

### CSS Custom Properties
- Theme-aware color system
- Consistent spacing and typography
- Smooth transitions and animations

### Responsive Breakpoints
- **Desktop**: Full feature layout
- **Tablet** (768px): Adjusted spacing and layout
- **Mobile** (480px): Stacked layout and touch-friendly buttons

### Modern CSS Features
- CSS Grid and Flexbox layouts
- CSS custom properties (variables)
- CSS animations and transitions
- Gradient backgrounds and shadows

## 🔧 Advanced Features

### Console Commands
Open browser developer tools and try these commands:

```javascript
// Show app statistics
todoCommands.stats()

// Clear all tasks
todoCommands.clearAll()

// Clear completed tasks only
todoCommands.clearCompleted()

// Export tasks as JSON
todoCommands.export()

// Show help
todoCommands.help()
```

### Data Export
Tasks can be exported as JSON files for backup or migration:
- Click export in console commands
- File saved as `todo-tasks-YYYY-MM-DD.json`
- Contains all task data with timestamps

## 📊 Statistics Tracking

The app tracks various metrics:
- **Total Tasks**: All tasks ever created
- **Completed Tasks**: Tasks marked as done
- **Pending Tasks**: Tasks still in progress
- **Daily Completion**: Tasks completed today
- **Completion Rate**: Percentage of tasks completed

## 🔒 Security Features

- **XSS Prevention**: HTML escaping for user input
- **Input Validation**: Length limits and sanitization
- **Safe DOM Manipulation**: Proper event handling and element creation

## 🌟 Learning Outcomes

This project demonstrates:

### JavaScript Concepts
- **ES6+ Features**: Classes, arrow functions, template literals
- **DOM Manipulation**: Creating, modifying, and removing elements
- **Event Handling**: Click, keyboard, and form events
- **Local Storage**: Data persistence in the browser
- **State Management**: Managing application state without frameworks
- **Error Handling**: Try-catch blocks and graceful degradation

### CSS Concepts
- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Custom Properties**: Theme management and consistency
- **Responsive Design**: Mobile-first approach
- **Animations**: CSS transitions and keyframe animations
- **Modern Selectors**: Advanced CSS selectors and pseudo-classes

### HTML Concepts
- **Semantic HTML**: Proper element usage for accessibility
- **Form Handling**: Input validation and submission
- **Modal Dialogs**: Accessible popup interfaces
- **Progressive Enhancement**: Works without JavaScript

## 🚀 Potential Enhancements

### Backend Integration
- **Firebase**: Real-time database and authentication
- **Node.js**: REST API with Express and MongoDB
- **User Accounts**: Multi-user support with login system

### Additional Features
- **Due Dates**: Task scheduling and reminders
- **Categories**: Organize tasks by project or type
- **Drag & Drop**: Reorder tasks with mouse/touch
- **Collaboration**: Share tasks with other users
- **Notifications**: Browser notifications for reminders

### Performance Optimizations
- **Virtual Scrolling**: Handle thousands of tasks efficiently
- **Service Worker**: Offline functionality
- **Code Splitting**: Lazy load features as needed

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
