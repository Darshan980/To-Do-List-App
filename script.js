// To-Do List App - Complete Implementation
class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingTaskId = null;
        this.taskIdCounter = 0;
        
        this.initializeElements();
        this.loadFromStorage();
        this.bindEvents();
        this.updateDisplay();
        this.initializeTheme();
    }

    // Initialize DOM elements
    initializeElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.taskCount = document.getElementById('taskCount');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.themeToggle = document.getElementById('themeToggle');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        
        // Modal elements
        this.editModal = document.getElementById('editModal');
        this.editInput = document.getElementById('editInput');
        this.closeModal = document.getElementById('closeModal');
        this.cancelEdit = document.getElementById('cancelEdit');
        this.saveEdit = document.getElementById('saveEdit');
    }

    // Bind event listeners
    bindEvents() {
        // Add task events
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter events
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Modal events
        this.closeModal.addEventListener('click', () => this.closeEditModal());
        this.cancelEdit.addEventListener('click', () => this.closeEditModal());
        this.saveEdit.addEventListener('click', () => this.saveTaskEdit());
        
        // Close modal on outside click
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) this.closeEditModal();
        });

        // Edit input enter key
        this.editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveTaskEdit();
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.editModal.classList.contains('show')) {
                this.closeEditModal();
            }
        });
    }

    // Add new task
    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) {
            this.showInputError();
            return;
        }

        const task = {
            id: ++this.taskIdCounter,
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.unshift(task); // Add to beginning for newest first
        this.taskInput.value = '';
        this.saveToStorage();
        this.updateDisplay();
        this.showSuccessMessage('Task added successfully!');
    }

    // Show input error animation
    showInputError() {
        this.taskInput.style.borderColor = 'var(--danger-color)';
        this.taskInput.placeholder = 'Please enter a task!';
        
        setTimeout(() => {
            this.taskInput.style.borderColor = '';
            this.taskInput.placeholder = 'Add a new task...';
        }, 2000);
    }

    // Show success message
    showSuccessMessage(message) {
        // Create temporary success indicator
        const successDiv = document.createElement('div');
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveToStorage();
            this.updateDisplay();
        }
    }

    // Delete task
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveToStorage();
            this.updateDisplay();
            this.showSuccessMessage('Task deleted successfully!');
        }
    }

    // Open edit modal
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.editingTaskId = id;
            this.editInput.value = task.text;
            this.editModal.classList.add('show');
            this.editInput.focus();
            this.editInput.select();
        }
    }

    // Close edit modal
    closeEditModal() {
        this.editModal.classList.remove('show');
        this.editingTaskId = null;
        this.editInput.value = '';
    }

    // Save task edit
    saveTaskEdit() {
        const newText = this.editInput.value.trim();
        if (!newText) {
            this.editInput.style.borderColor = 'var(--danger-color)';
            return;
        }

        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (task) {
            task.text = newText;
            this.saveToStorage();
            this.updateDisplay();
            this.closeEditModal();
            this.showSuccessMessage('Task updated successfully!');
        }
    }

    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.updateDisplay();
    }

    // Get filtered tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            default:
                return this.tasks;
        }
    }

    // Update display
    updateDisplay() {
        this.renderTasks();
        this.updateStats();
        this.updateProgress();
    }

    // Render tasks
    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            this.taskList.style.display = 'none';
            this.emptyState.classList.add('show');
            this.updateEmptyStateMessage();
        } else {
            this.taskList.style.display = 'flex';
            this.emptyState.classList.remove('show');
            
            this.taskList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
            
            // Bind task events
            this.bindTaskEvents();
        }
    }

    // Update empty state message based on filter
    updateEmptyStateMessage() {
        const messages = {
            all: 'No tasks yet. Add one above!',
            pending: 'No pending tasks. Great job!',
            completed: 'No completed tasks yet.'
        };
        
        this.emptyState.querySelector('p').textContent = messages[this.currentFilter];
    }

    // Create task HTML
    createTaskHTML(task) {
        const completedClass = task.completed ? 'completed' : '';
        const checkedClass = task.completed ? 'checked' : '';
        const checkIcon = task.completed ? '<i class="fas fa-check"></i>' : '';
        
        return `
            <li class="task-item ${completedClass}" data-id="${task.id}">
                <div class="task-checkbox ${checkedClass}" data-action="toggle">
                    ${checkIcon}
                </div>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <div class="task-actions">
                    <button class="task-btn edit-btn" data-action="edit" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn delete-btn" data-action="delete" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Bind task events
    bindTaskEvents() {
        this.taskList.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;
            
            const taskId = parseInt(taskItem.dataset.id);
            const action = e.target.closest('[data-action]')?.dataset.action;
            
            switch (action) {
                case 'toggle':
                    this.toggleTask(taskId);
                    break;
                case 'edit':
                    this.editTask(taskId);
                    break;
                case 'delete':
                    this.deleteTask(taskId);
                    break;
            }
        });
    }

    // Update statistics
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        let statsText = '';
        switch (this.currentFilter) {
            case 'completed':
                statsText = `${completed} completed task${completed !== 1 ? 's' : ''}`;
                break;
            case 'pending':
                statsText = `${pending} pending task${pending !== 1 ? 's' : ''}`;
                break;
            default:
                statsText = `${total} total task${total !== 1 ? 's' : ''}`;
        }
        
        this.taskCount.textContent = statsText;
    }

    // Update progress bar
    updateProgress() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        
        this.progressFill.style.width = `${percentage}%`;
        this.progressText.textContent = `${percentage}% Complete (${completed}/${total})`;
    }

    // Theme management
    initializeTheme() {
        const savedTheme = localStorage.getItem('todoTheme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('todoTheme', theme);
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Local storage management
    saveToStorage() {
        try {
            const data = {
                tasks: this.tasks,
                taskIdCounter: this.taskIdCounter,
                currentFilter: this.currentFilter
            };
            localStorage.setItem('todoAppData', JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem('todoAppData');
            if (data) {
                const parsed = JSON.parse(data);
                this.tasks = parsed.tasks || [];
                this.taskIdCounter = parsed.taskIdCounter || 0;
                this.currentFilter = parsed.currentFilter || 'all';
                
                // Set active filter button
                this.filterBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
                });
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            this.tasks = [];
            this.taskIdCounter = 0;
        }
    }

    // Clear all tasks (bonus feature)
    clearAllTasks() {
        if (this.tasks.length === 0) return;
        
        if (confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
            this.tasks = [];
            this.saveToStorage();
            this.updateDisplay();
            this.showSuccessMessage('All tasks cleared!');
        }
    }

    // Clear completed tasks (bonus feature)
    clearCompletedTasks() {
        const completedTasks = this.tasks.filter(t => t.completed);
        if (completedTasks.length === 0) return;
        
        if (confirm(`Are you sure you want to delete ${completedTasks.length} completed task${completedTasks.length !== 1 ? 's' : ''}?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveToStorage();
            this.updateDisplay();
            this.showSuccessMessage('Completed tasks cleared!');
        }
    }

    // Export tasks as JSON (bonus feature)
    exportTasks() {
        if (this.tasks.length === 0) {
            alert('No tasks to export!');
            return;
        }
        
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `todo-tasks-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showSuccessMessage('Tasks exported successfully!');
    }

    // Get app statistics (bonus feature)
    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        const today = new Date().toDateString();
        const completedToday = this.tasks.filter(t => 
            t.completed && t.completedAt && 
            new Date(t.completedAt).toDateString() === today
        ).length;
        
        return {
            total,
            completed,
            pending,
            completedToday,
            completionRate: total === 0 ? 0 : Math.round((completed / total) * 100)
        };
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to add task
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        document.getElementById('taskInput').focus();
    }
    
    // Ctrl/Cmd + / to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        app.toggleTheme();
    }
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TodoApp();
    
    // Add some sample tasks for demo (remove in production)
    if (app.tasks.length === 0) {
        const sampleTasks = [
            'Welcome to your To-Do List! 🎉',
            'Try editing this task by clicking the edit button',
            'Mark tasks as complete by clicking the circle',
            'Use the filter buttons to view different task states',
            'Toggle dark mode with the moon/sun button'
        ];
        
        sampleTasks.forEach((text, index) => {
            const task = {
                id: ++app.taskIdCounter,
                text: text,
                completed: index === 0, // Mark first task as completed for demo
                createdAt: new Date().toISOString(),
                completedAt: index === 0 ? new Date().toISOString() : null
            };
            app.tasks.push(task);
        });
        
        app.saveToStorage();
        app.updateDisplay();
    }
});

// Console commands for advanced users
window.todoCommands = {
    clearAll: () => app.clearAllTasks(),
    clearCompleted: () => app.clearCompletedTasks(),
    export: () => app.exportTasks(),
    stats: () => {
        const stats = app.getStats();
        console.table(stats);
        return stats;
    },
    help: () => {
        console.log(`
🚀 To-Do List App Console Commands:
- todoCommands.clearAll() - Clear all tasks
- todoCommands.clearCompleted() - Clear completed tasks
- todoCommands.export() - Export tasks as JSON
- todoCommands.stats() - Show app statistics
- todoCommands.help() - Show this help

⌨️ Keyboard Shortcuts:
- Ctrl/Cmd + Enter - Focus task input
- Ctrl/Cmd + / - Toggle theme
- Enter - Add task (when input is focused)
- Escape - Close modal
        `);
    }
};

// Show help on first load
setTimeout(() => {
    console.log('🎯 Welcome to the To-Do List App! Type "todoCommands.help()" for console commands.');
}, 1000);