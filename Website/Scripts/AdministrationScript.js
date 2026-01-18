// Administrator Module Script
(function () {
    'use strict';

    // ========================================
    // CONFIGURATION & API ENDPOINTS
    // ========================================
    const API_CONFIG = {
        // Replace these with your actual API endpoints
        endpoints: {
            getAdministrators: '/api/administrators/list',
            getAdministratorById: '/api/administrators/get',
            getActivityLogs: '/api/administrators/activity-logs',
            getAdminActivityLogs: '/api/administrators/activity-logs/by-admin'
        },
        useMockData: true // Set to false when connecting to real backend
    };

    // ========================================
    // SAMPLE DATA (Remove when using real API)
    // ========================================
    const MOCK_DATA = {
        administrators: [
            {
                administratorId: 1,
                administratorName: "Juan Dela Cruz",
                email: "juan.delacruz@school.edu",
                password: "SecurePass123!",
                lastActive: new Date('2026-01-14T10:30:00')
            },
            {
                administratorId: 2,
                administratorName: "Maria Santos",
                email: "maria.santos@school.edu",
                password: "Maria2026#Pwd",
                lastActive: new Date('2026-01-14T14:20:00')
            },
            {
                administratorId: 3,
                administratorName: "Pedro Garcia",
                email: "pedro.garcia@school.edu",
                password: "Pedro@2026",
                lastActive: new Date('2026-01-13T09:15:00')
            },
            {
                administratorId: 4,
                administratorName: "Ana Reyes",
                email: "ana.reyes@school.edu",
                password: "Ana$ecure99",
                lastActive: new Date('2026-01-14T11:45:00')
            },
            {
                administratorId: 5,
                administratorName: "Carlos Lopez",
                email: "carlos.lopez@school.edu",
                password: "Carlos2026!",
                lastActive: new Date('2026-01-12T16:30:00')
            },
            {
                administratorId: 6,
                administratorName: "Sofia Cruz",
                email: "sofia.cruz@school.edu",
                password: "Sofia#Admin1",
                lastActive: new Date('2026-01-14T08:00:00')
            },
            {
                administratorId: 7,
                administratorName: "Miguel Torres",
                email: "miguel.torres@school.edu",
                password: "Miguel@Pass26",
                lastActive: new Date('2026-01-11T13:20:00')
            },
            {
                administratorId: 8,
                administratorName: "Isabella Ramos",
                email: "isabella.ramos@school.edu",
                password: "Bella2026$",
                lastActive: new Date('2026-01-14T15:10:00')
            },
            {
                administratorId: 9,
                administratorName: "Diego Fernandez",
                email: "diego.fernandez@school.edu",
                password: "Diego#2026Sec",
                lastActive: new Date('2026-01-10T10:00:00')
            },
            {
                administratorId: 10,
                administratorName: "Gabriela Mendoza",
                email: "gabriela.mendoza@school.edu",
                password: "Gaby@SecPwd26",
                lastActive: new Date('2026-01-14T12:30:00')
            }
        ],
        activityLogs: [
            { logId: 1001, administratorId: 1, administratorName: "Juan Dela Cruz", actionType: "Login", actionTag: "Web", deviceInfo: "Chrome 120 / Windows 11", timeOfAction: new Date('2026-01-14T10:30:15') },
            { logId: 1002, administratorId: 2, administratorName: "Maria Santos", actionType: "User Update", actionTag: "Student Management", deviceInfo: "Safari / iOS 17", timeOfAction: new Date('2026-01-14T14:20:30') },
            { logId: 1003, administratorId: 3, administratorName: "Pedro Garcia", actionType: "Logout", actionTag: "Web", deviceInfo: "Firefox 121 / Ubuntu", timeOfAction: new Date('2026-01-13T09:15:45') },
            { logId: 1004, administratorId: 4, administratorName: "Ana Reyes", actionType: "Report Generated", actionTag: "Analytics", deviceInfo: "Edge 120 / Windows 10", timeOfAction: new Date('2026-01-14T11:45:20') },
            { logId: 1005, administratorId: 5, administratorName: "Carlos Lopez", actionType: "Login", actionTag: "Mobile", deviceInfo: "Chrome / Android 14", timeOfAction: new Date('2026-01-12T16:30:10') },
            { logId: 1006, administratorId: 6, administratorName: "Sofia Cruz", actionType: "Settings Changed", actionTag: "System Config", deviceInfo: "Safari / macOS", timeOfAction: new Date('2026-01-14T08:00:25') },
            { logId: 1007, administratorId: 7, administratorName: "Miguel Torres", actionType: "Login", actionTag: "Web", deviceInfo: "Chrome 120 / Windows 11", timeOfAction: new Date('2026-01-11T13:20:40') },
            { logId: 1008, administratorId: 8, administratorName: "Isabella Ramos", actionType: "User Created", actionTag: "User Management", deviceInfo: "Firefox 121 / Windows 11", timeOfAction: new Date('2026-01-14T15:10:55') },
            { logId: 1009, administratorId: 9, administratorName: "Diego Fernandez", actionType: "Logout", actionTag: "Web", deviceInfo: "Edge 120 / Windows 10", timeOfAction: new Date('2026-01-10T10:00:30') },
            { logId: 1010, administratorId: 10, administratorName: "Gabriela Mendoza", actionType: "Database Backup", actionTag: "System Maintenance", deviceInfo: "Chrome / Android 13", timeOfAction: new Date('2026-01-14T12:30:18') },
            { logId: 1011, administratorId: 1, administratorName: "Juan Dela Cruz", actionType: "Permission Update", actionTag: "Access Control", deviceInfo: "Chrome 120 / Windows 11", timeOfAction: new Date('2026-01-14T11:15:22') },
            { logId: 1012, administratorId: 2, administratorName: "Maria Santos", actionType: "Logout", actionTag: "Mobile", deviceInfo: "Safari / iOS 17", timeOfAction: new Date('2026-01-14T16:45:33') },
            { logId: 1013, administratorId: 1, administratorName: "Juan Dela Cruz", actionType: "User Update", actionTag: "User Management", deviceInfo: "Chrome 120 / Windows 11", timeOfAction: new Date('2026-01-13T14:25:10') },
            { logId: 1014, administratorId: 3, administratorName: "Pedro Garcia", actionType: "Login", actionTag: "Web", deviceInfo: "Firefox 121 / Ubuntu", timeOfAction: new Date('2026-01-13T08:45:30') },
            { logId: 1015, administratorId: 5, administratorName: "Carlos Lopez", actionType: "Settings Changed", actionTag: "System Config", deviceInfo: "Chrome / Android 14", timeOfAction: new Date('2026-01-12T15:20:45') }
        ]
    };

    // ========================================
    // API SERVICE LAYER
    // ========================================
    const ApiService = {
        /**
         * Fetch all administrators
         * Backend should return: { success: bool, data: Administrator[], message: string }
         */
        async fetchAdministrators() {
            if (API_CONFIG.useMockData) {
                return Promise.resolve({
                    success: true,
                    data: MOCK_DATA.administrators,
                    message: 'Success'
                });
            }

            try {
                const response = await fetch(API_CONFIG.endpoints.getAdministrators);
                const result = await response.json();
                // Convert date strings to Date objects
                if (result.success && result.data) {
                    result.data = result.data.map(admin => ({
                        ...admin,
                        lastActive: new Date(admin.lastActive)
                    }));
                }
                return result;
            } catch (error) {
                console.error('Error fetching administrators:', error);
                return { success: false, data: [], message: error.message };
            }
        },

        /**
         * Fetch specific administrator by ID
         * Backend should return: { success: bool, data: Administrator, message: string }
         */
        async fetchAdministratorById(administratorId) {
            if (API_CONFIG.useMockData) {
                const admin = MOCK_DATA.administrators.find(a => a.administratorId === administratorId);
                return Promise.resolve({
                    success: !!admin,
                    data: admin,
                    message: admin ? 'Success' : 'Administrator not found'
                });
            }

            try {
                const response = await fetch(`${API_CONFIG.endpoints.getAdministratorById}?id=${administratorId}`);
                const result = await response.json();
                if (result.success && result.data) {
                    result.data.lastActive = new Date(result.data.lastActive);
                }
                return result;
            } catch (error) {
                console.error('Error fetching administrator:', error);
                return { success: false, data: null, message: error.message };
            }
        },

        /**
         * Fetch all activity logs
         * Backend should return: { success: bool, data: ActivityLog[], message: string }
         */
        async fetchActivityLogs() {
            if (API_CONFIG.useMockData) {
                return Promise.resolve({
                    success: true,
                    data: MOCK_DATA.activityLogs,
                    message: 'Success'
                });
            }

            try {
                const response = await fetch(API_CONFIG.endpoints.getActivityLogs);
                const result = await response.json();
                if (result.success && result.data) {
                    result.data = result.data.map(log => ({
                        ...log,
                        timeOfAction: new Date(log.timeOfAction)
                    }));
                }
                return result;
            } catch (error) {
                console.error('Error fetching activity logs:', error);
                return { success: false, data: [], message: error.message };
            }
        },

        /**
         * Fetch activity logs for specific administrator
         * Backend should return: { success: bool, data: ActivityLog[], message: string }
         */
        async fetchAdminActivityLogs(administratorId) {
            if (API_CONFIG.useMockData) {
                const logs = MOCK_DATA.activityLogs.filter(log => log.administratorId === administratorId);
                return Promise.resolve({
                    success: true,
                    data: logs,
                    message: 'Success'
                });
            }

            try {
                const response = await fetch(`${API_CONFIG.endpoints.getAdminActivityLogs}?adminId=${administratorId}`);
                const result = await response.json();
                if (result.success && result.data) {
                    result.data = result.data.map(log => ({
                        ...log,
                        timeOfAction: new Date(log.timeOfAction)
                    }));
                }
                return result;
            } catch (error) {
                console.error('Error fetching admin activity logs:', error);
                return { success: false, data: [], message: error.message };
            }
        }
    };

    // ========================================
    // STATE MANAGEMENT
    // ========================================
    const AppState = {
        administrators: [],
        activityLogs: [],
        filteredAdministrators: [],
        filteredActivities: [],
        currentAdministratorPage: 1,
        currentActivityPage: 1,
        rowsPerPage: 10,
        administratorSortColumn: null,
        administratorSortAsc: true,
        activitySortColumn: null,
        activitySortAsc: true
    };

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    function formatDateForDropdown(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}. ${day}, ${year}`;
    }

    function formatDateTimeForDisplay(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}. ${day}, ${year} ${hours}:${minutes}`;
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    document.addEventListener('DOMContentLoaded', async function () {
        initializeTabs();
        await initializeAdministratorList();
        populateDateDropdowns();
        setupModalControls();
    });

    // ========================================
    // TAB FUNCTIONALITY
    // ========================================
    function initializeTabs() {
        const tabHeaders = document.querySelectorAll('.tab-header');

        tabHeaders.forEach(function (header) {
            header.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });
    }

    async function switchTab(targetTabId) {
        const tabHeaders = document.querySelectorAll('.tab-header');
        const tabContents = document.querySelectorAll('.tab-content');

        tabHeaders.forEach(header => header.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const activeHeader = document.querySelector(`.tab-header[data-tab="${targetTabId}"]`);
        const activeContent = document.getElementById(targetTabId);

        if (activeHeader && activeContent) {
            activeHeader.classList.add('active');
            activeContent.classList.add('active');

            // Load data for the tab
            if (targetTabId === 'activity-logs' && AppState.activityLogs.length === 0) {
                await initializeActivityLogs();
            }
        }

        try {
            sessionStorage.setItem('activeAdministrationTab', targetTabId);
        } catch (e) {
            console.warn('Session storage not available');
        }
    }

    // ========================================
    // DATE DROPDOWN POPULATION
    // ========================================
    function populateDateDropdowns() {
        const lastActiveFilter = document.getElementById('lastActiveFilter');
        const timeOfActionFilter = document.getElementById('timeOfActionFilter');

        // Generate past 7 days
        for (let i = 2; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const formatted = formatDateForDropdown(date);
            const value = date.toISOString().split('T')[0];

            const option1 = document.createElement('option');
            option1.value = value;
            option1.textContent = formatted;
            lastActiveFilter.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = value;
            option2.textContent = formatted;
            timeOfActionFilter.appendChild(option2);
        }
    }

    // ========================================
    // ADMINISTRATOR LIST FUNCTIONALITY
    // ========================================
    async function initializeAdministratorList() {
        const result = await ApiService.fetchAdministrators();

        if (result.success) {
            AppState.administrators = result.data;
            AppState.filteredAdministrators = [...result.data];
            renderAdministratorTable();
            setupAdministratorControls();
        } else {
            console.error('Failed to load administrators:', result.message);
            showError('Failed to load administrators. Please refresh the page.');
        }
    }

    function setupAdministratorControls() {
        document.getElementById('administratorSearch').addEventListener('input', filterAdministrators);
        document.getElementById('lastActiveFilter').addEventListener('change', filterAdministrators);

        document.querySelectorAll('#administratorTable th[data-sort]').forEach(th => {
            th.addEventListener('click', function () {
                sortAdministrators(this.getAttribute('data-sort'));
            });
        });
    }

    function filterAdministrators() {
        const searchTerm = document.getElementById('administratorSearch').value.toLowerCase();
        const dateFilter = document.getElementById('lastActiveFilter').value;

        AppState.filteredAdministrators = AppState.administrators.filter(administrator => {
            const matchesSearch =
                administrator.administratorName.toLowerCase().includes(searchTerm) ||
                administrator.email.toLowerCase().includes(searchTerm);

            let matchesDate = true;
            if (dateFilter === 'today') {
                const today = new Date().toDateString();
                matchesDate = administrator.lastActive.toDateString() === today;
            } else if (dateFilter === 'yesterday') {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                matchesDate = administrator.lastActive.toDateString() === yesterday.toDateString();
            } else if (dateFilter) {
                matchesDate = administrator.lastActive.toISOString().startsWith(dateFilter);
            }

            return matchesSearch && matchesDate;
        });

        AppState.currentAdministratorPage = 1;
        renderAdministratorTable();
    }

    function sortAdministrators(column) {
        if (AppState.administratorSortColumn === column) {
            AppState.administratorSortAsc = !AppState.administratorSortAsc;
        } else {
            AppState.administratorSortColumn = column;
            AppState.administratorSortAsc = true;
        }

        AppState.filteredAdministrators.sort((a, b) => {
            let valA, valB;

            if (column === 'administratorName') {
                valA = a.administratorName.toLowerCase();
                valB = b.administratorName.toLowerCase();
            } else if (column === 'email') {
                valA = a.email.toLowerCase();
                valB = b.email.toLowerCase();
            } else if (column === 'lastActive') {
                valA = a.lastActive.getTime();
                valB = b.lastActive.getTime();
            }

            if (valA < valB) return AppState.administratorSortAsc ? -1 : 1;
            if (valA > valB) return AppState.administratorSortAsc ? 1 : -1;
            return 0;
        });

        renderAdministratorTable();
    }

    function renderAdministratorTable() {
        const tbody = document.getElementById('administratorTableBody');
        const start = (AppState.currentAdministratorPage - 1) * AppState.rowsPerPage;
        const end = start + AppState.rowsPerPage;
        const pageData = AppState.filteredAdministrators.slice(start, end);

        tbody.innerHTML = pageData.map(administrator => `
            <tr>
                <td>${administrator.administratorName}</td>
                <td>${administrator.email}</td>
                <td>${formatDateTimeForDisplay(administrator.lastActive)}</td>
                <td class="actions-cell">
                    <div class="action-menu">
                        <button class="kebab-btn" data-administrator-id="${administrator.administratorId}">
                            <span class="kebab-icon">⋮</span>
                        </button>
                        <div class="action-dropdown">
                            <button class="action-item view-details-btn" data-administrator-id="${administrator.administratorId}">
                                <span class="action-icon">👁️</span> View Details
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');

        setupActionButtons();
        updateAdministratorPagination();
    }

    function setupActionButtons() {
        document.querySelectorAll('.kebab-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const dropdown = this.nextElementSibling;
                document.querySelectorAll('.action-dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('show');
                });
                dropdown.classList.toggle('show');
            });
        });

        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', async function () {
                const administratorId = parseInt(this.getAttribute('data-administrator-id'));
                await showAdministratorDetails(administratorId);
                document.querySelectorAll('.action-dropdown').forEach(d => d.classList.remove('show'));
            });
        });

        document.addEventListener('click', function () {
            document.querySelectorAll('.action-dropdown').forEach(d => d.classList.remove('show'));
        });
    }

    async function showAdministratorDetails(administratorId) {
        // Fetch administrator details
        const adminResult = await ApiService.fetchAdministratorById(administratorId);

        if (!adminResult.success) {
            showError('Failed to load administrator details.');
            return;
        }

        const administrator = adminResult.data;

        // Check if modal elements exist
        const nameEl = document.getElementById('administratorName');
        const emailEl = document.getElementById('administratorEmail');
        const passwordEl = document.getElementById('administratorPassword');
        const lastActiveEl = document.getElementById('administratorLastActive');

        if (!nameEl || !emailEl || !passwordEl || !lastActiveEl) {
            console.error('Modal elements not found. Make sure the modal HTML is loaded.');
            return;
        }

        // Populate basic information
        nameEl.textContent = administrator.administratorName;
        emailEl.textContent = administrator.email;
        passwordEl.textContent = '••••••••••';
        lastActiveEl.textContent = formatDateTimeForDisplay(administrator.lastActive);

        // Fetch activity logs for this administrator
        const logsResult = await ApiService.fetchAdminActivityLogs(administratorId);
        const activityTableBody = document.getElementById('adminActivityLogsBody');

        if (logsResult.success && logsResult.data.length > 0) {
            activityTableBody.innerHTML = logsResult.data.map(log => `
                <tr>
                    <td>${log.logId}</td>
                    <td><span class="action-badge action-${log.actionType.toLowerCase().replace(/\s+/g, '-')}">${log.actionType}</span></td>
                    <td><span class="tag-badge">${log.actionTag}</span></td>
                    <td>${log.deviceInfo}</td>
                    <td>${formatDateTimeForDisplay(log.timeOfAction)}</td>
                </tr>
            `).join('');
        } else {
            activityTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="no-logs-message">No activity logs found for this administrator.</td>
                </tr>
            `;
        }

        // Show modal
        document.getElementById('administratorModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function updateAdministratorPagination() {
        const total = AppState.filteredAdministrators.length;
        const totalPages = Math.ceil(total / AppState.rowsPerPage);
        const start = (AppState.currentAdministratorPage - 1) * AppState.rowsPerPage + 1;
        const end = Math.min(start + AppState.rowsPerPage - 1, total);

        document.getElementById('administratorShowingStart').textContent = total > 0 ? start : 0;
        document.getElementById('administratorShowingEnd').textContent = end;
        document.getElementById('administratorTotal').textContent = total;

        const pagination = document.getElementById('administratorPagination');
        pagination.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.className = 'pagination-btn';
        prevBtn.disabled = AppState.currentAdministratorPage === 1;
        prevBtn.addEventListener('click', () => {
            if (AppState.currentAdministratorPage > 1) {
                AppState.currentAdministratorPage--;
                renderAdministratorTable();
            }
        });
        pagination.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= AppState.currentAdministratorPage - 1 && i <= AppState.currentAdministratorPage + 1)) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.className = 'pagination-btn' + (i === AppState.currentAdministratorPage ? ' active' : '');
                pageBtn.addEventListener('click', () => {
                    AppState.currentAdministratorPage = i;
                    renderAdministratorTable();
                });
                pagination.appendChild(pageBtn);
            } else if (i === AppState.currentAdministratorPage - 2 || i === AppState.currentAdministratorPage + 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.className = 'pagination-dots';
                pagination.appendChild(dots);
            }
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next →';
        nextBtn.className = 'pagination-btn';
        nextBtn.disabled = AppState.currentAdministratorPage === totalPages || totalPages === 0;
        nextBtn.addEventListener('click', () => {
            if (AppState.currentAdministratorPage < totalPages) {
                AppState.currentAdministratorPage++;
                renderAdministratorTable();
            }
        });
        pagination.appendChild(nextBtn);
    }

    // ========================================
    // ACTIVITY LOGS FUNCTIONALITY
    // ========================================
    async function initializeActivityLogs() {
        const result = await ApiService.fetchActivityLogs();

        if (result.success) {
            AppState.activityLogs = result.data;
            AppState.filteredActivities = [...result.data];
            renderActivityTable();
            setupActivityControls();
        } else {
            console.error('Failed to load activity logs:', result.message);
            showError('Failed to load activity logs. Please refresh the page.');
        }
    }

    function setupActivityControls() {
        document.getElementById('activitySearch').addEventListener('input', filterActivities);
        document.getElementById('timeOfActionFilter').addEventListener('change', filterActivities);

        document.querySelectorAll('#activityTable th[data-sort]').forEach(th => {
            th.addEventListener('click', function () {
                sortActivities(this.getAttribute('data-sort'));
            });
        });
    }

    function filterActivities() {
        const searchTerm = document.getElementById('activitySearch').value.toLowerCase();
        const dateFilter = document.getElementById('timeOfActionFilter').value;

        AppState.filteredActivities = AppState.activityLogs.filter(log => {
            const matchesSearch =
                String(log.logId).includes(searchTerm) ||
                String(log.administratorId).includes(searchTerm) ||
                log.administratorName.toLowerCase().includes(searchTerm) ||
                log.actionType.toLowerCase().includes(searchTerm) ||
                log.actionTag.toLowerCase().includes(searchTerm) ||
                log.deviceInfo.toLowerCase().includes(searchTerm);

            let matchesDate = true;
            if (dateFilter === 'today') {
                const today = new Date().toDateString();
                matchesDate = log.timeOfAction.toDateString() === today;
            } else if (dateFilter === 'yesterday') {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                matchesDate = log.timeOfAction.toDateString() === yesterday.toDateString();
            } else if (dateFilter) {
                matchesDate = log.timeOfAction.toISOString().startsWith(dateFilter);
            }

            return matchesSearch && matchesDate;
        });

        AppState.currentActivityPage = 1;
        renderActivityTable();
    }

    function sortActivities(column) {
        if (AppState.activitySortColumn === column) {
            AppState.activitySortAsc = !AppState.activitySortAsc;
        } else {
            AppState.activitySortColumn = column;
            AppState.activitySortAsc = true;
        }

        AppState.filteredActivities.sort((a, b) => {
            let valA, valB;

            if (column === 'logId' || column === 'administratorId') {
                valA = a[column];
                valB = b[column];
            } else if (column === 'timeOfAction') {
                valA = a.timeOfAction.getTime();
                valB = b.timeOfAction.getTime();
            } else {
                valA = a[column].toLowerCase();
                valB = b[column].toLowerCase();
            }

            if (valA < valB) return AppState.activitySortAsc ? -1 : 1;
            if (valA > valB) return AppState.activitySortAsc ? 1 : -1;
            return 0;
        });

        renderActivityTable();
    }

    function renderActivityTable() {
        const tbody = document.getElementById('activityTableBody');
        const start = (AppState.currentActivityPage - 1) * AppState.rowsPerPage;
        const end = start + AppState.rowsPerPage;
        const pageData = AppState.filteredActivities.slice(start, end);

        tbody.innerHTML = pageData.map(log => `
            <tr>
                <td>${log.logId}</td>
                <td>${log.administratorId}</td>
                <td>${log.administratorName}</td>
                <td><span class="action-badge action-${log.actionType.toLowerCase().replace(/\s+/g, '-')}">${log.actionType}</span></td>
                <td><span class="tag-badge">${log.actionTag}</span></td>
                <td>${log.deviceInfo}</td>
                <td>${formatDateTimeForDisplay(log.timeOfAction)}</td>
            </tr>
        `).join('');

        updateActivityPagination();
    }

    function updateActivityPagination() {
        const total = AppState.filteredActivities.length;
        const totalPages = Math.ceil(total / AppState.rowsPerPage);
        const start = (AppState.currentActivityPage - 1) * AppState.rowsPerPage + 1;
        const end = Math.min(start + AppState.rowsPerPage - 1, total);

        document.getElementById('activityShowingStart').textContent = total > 0 ? start : 0;
        document.getElementById('activityShowingEnd').textContent = end;
        document.getElementById('activityTotal').textContent = total;

        const pagination = document.getElementById('activityPagination');
        pagination.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.className = 'pagination-btn';
        prevBtn.disabled = AppState.currentActivityPage === 1;
        prevBtn.addEventListener('click', () => {
            if (AppState.currentActivityPage > 1) {
                AppState.currentActivityPage--;
                renderActivityTable();
            }
        });
        pagination.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= AppState.currentActivityPage - 1 && i <= AppState.currentActivityPage + 1)) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.className = 'pagination-btn' + (i === AppState.currentActivityPage ? ' active' : '');
                pageBtn.addEventListener('click', () => {
                    AppState.currentActivityPage = i;
                    renderActivityTable();
                });
                pagination.appendChild(pageBtn);
            } else if (i === AppState.currentActivityPage - 2 || i === AppState.currentActivityPage + 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.className = 'pagination-dots';
                pagination.appendChild(dots);
            }
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next →';
        nextBtn.className = 'pagination-btn';
        nextBtn.disabled = AppState.currentActivityPage === totalPages || totalPages === 0;
        nextBtn.addEventListener('click', () => {
            if (AppState.currentActivityPage < totalPages) {
                AppState.currentActivityPage++;
                renderActivityTable();
            }
        });
        pagination.appendChild(nextBtn);
    }

    // ========================================
    // MODAL CONTROLS
    // ========================================
    function setupModalControls() {
        const closeBtn = document.getElementById('closeModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        const modal = document.getElementById('administratorModal');
        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === this) closeModal();
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    function closeModal() {
        const modal = document.getElementById('administratorModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // ========================================
    // ERROR HANDLING
    // ========================================
    function showError(message) {
        // You can customize this to use your preferred notification system
        alert(message);
        console.error(message);
    }

})();