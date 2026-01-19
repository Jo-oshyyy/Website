// Administrator Module Script
(function () {
    'use strict';

    // Sample data - Replace with API calls to your database
    const ADMINISTRATOR_DATA = {
        administrators: [
            {
                administratorId: 1, administratorName: "Juan Dela Cruz", email: "juan.delacruz@school.edu",
                password: "SecurePass123!", lastActive: new Date('2026-01-14T10:30:00')
            },
            {
                administratorId: 2, administratorName: "Maria Santos", email: "maria.santos@school.edu",
                password: "Maria2026#Pwd", lastActive: new Date('2026-01-14T14:20:00')
            },
            {
                administratorId: 3, administratorName: "Pedro Garcia", email: "pedro.garcia@school.edu",
                password: "Pedro@2026", lastActive: new Date('2026-01-13T09:15:00')
            },
            {
                administratorId: 4, administratorName: "Ana Reyes", email: "ana.reyes@school.edu",
                password: "Ana$ecure99", lastActive: new Date('2026-01-14T11:45:00')
            },
            {
                administratorId: 5, administratorName: "Carlos Lopez", email: "carlos.lopez@school.edu",
                password: "Carlos2026!", lastActive: new Date('2026-01-12T16:30:00')
            },
            {
                administratorId: 6, administratorName: "Sofia Cruz", email: "sofia.cruz@school.edu",
                password: "Sofia#Admin1", lastActive: new Date('2026-01-14T08:00:00')
            },
            {
                administratorId: 7, administratorName: "Miguel Torres", email: "miguel.torres@school.edu",
                password: "Miguel@Pass26", lastActive: new Date('2026-01-11T13:20:00')
            },
            {
                administratorId: 8, administratorName: "Isabella Ramos", email: "isabella.ramos@school.edu",
                password: "Bella2026$", lastActive: new Date('2026-01-14T15:10:00')
            },
            {
                administratorId: 9, administratorName: "Diego Fernandez", email: "diego.fernandez@school.edu",
                password: "Diego#2026Sec", lastActive: new Date('2026-01-10T10:00:00')
            },
            {
                administratorId: 10, administratorName: "Gabriela Mendoza", email: "gabriela.mendoza@school.edu",
                password: "Gaby@SecPwd26", lastActive: new Date('2026-01-14T12:30:00')
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

    // Pagination state
    let currentAdministratorPage = 1;
    let currentActivityPage = 1;
    const rowsPerPage = 10;

    // Filtered data
    let filteredAdministrators = [];
    let filteredActivities = [];

    // Sort state
    let administratorSortColumn = null;
    let administratorSortAsc = true;
    let activitySortColumn = null;
    let activitySortAsc = true;

    // Current administrator for editing/removing
    let currentEditAdministratorId = null;
    let currentRemoveAdministratorId = null;

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initializeTabs();
        initializeAdministratorList();
        populateDateDropdowns();
        initializeModals();
    });

    // Tab functionality
    function initializeTabs() {
        const tabHeaders = document.querySelectorAll('.tab-header');

        tabHeaders.forEach(function (header) {
            header.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });
    }

    function switchTab(targetTabId) {
        const tabHeaders = document.querySelectorAll('.tab-header');
        const tabContents = document.querySelectorAll('.tab-content');

        tabHeaders.forEach(function (header) {
            header.classList.remove('active');
        });

        tabContents.forEach(function (content) {
            content.classList.remove('active');
        });

        const activeHeader = document.querySelector('.tab-header[data-tab="' + targetTabId + '"]');
        const activeContent = document.getElementById(targetTabId);

        if (activeHeader && activeContent) {
            activeHeader.classList.add('active');
            activeContent.classList.add('active');

            // Load data for the tab
            if (targetTabId === 'activity-logs' && filteredActivities.length === 0) {
                initializeActivityLogs();
            }
        }

        try {
            sessionStorage.setItem('activeAdministrationTab', targetTabId);
        } catch (e) {
            console.warn('Session storage not available');
        }
    }

    // Populate date dropdowns
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

    // Administrator List functionality
    function initializeAdministratorList() {
        filteredAdministrators = [...ADMINISTRATOR_DATA.administrators];
        renderAdministratorTable();
        setupAdministratorControls();
    }

    function setupAdministratorControls() {
        // Search
        document.getElementById('administratorSearch').addEventListener('input', function (e) {
            filterAdministrators();
        });

        // Date filter
        document.getElementById('lastActiveFilter').addEventListener('change', function (e) {
            filterAdministrators();
        });

        // Add Administrator button
        document.getElementById('addAdministratorBtn').addEventListener('click', function () {
            openAddAdministratorModal();
        });

        // Sort headers
        document.querySelectorAll('#administratorTable th[data-sort]').forEach(th => {
            th.addEventListener('click', function () {
                sortAdministrators(this.getAttribute('data-sort'));
            });
        });
    }

    function filterAdministrators() {
        const searchTerm = document.getElementById('administratorSearch').value.toLowerCase();
        const dateFilter = document.getElementById('lastActiveFilter').value;

        filteredAdministrators = ADMINISTRATOR_DATA.administrators.filter(administrator => {
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

        currentAdministratorPage = 1;
        renderAdministratorTable();
    }

    function sortAdministrators(column) {
        if (administratorSortColumn === column) {
            administratorSortAsc = !administratorSortAsc;
        } else {
            administratorSortColumn = column;
            administratorSortAsc = true;
        }

        filteredAdministrators.sort((a, b) => {
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

            if (valA < valB) return administratorSortAsc ? -1 : 1;
            if (valA > valB) return administratorSortAsc ? 1 : -1;
            return 0;
        });

        renderAdministratorTable();
    }

    function renderAdministratorTable() {
        const tbody = document.getElementById('administratorTableBody');
        const start = (currentAdministratorPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = filteredAdministrators.slice(start, end);

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
                                <span class="action-icon">👁️</span> View Administrator
                            </button>
                            <button class="action-item edit-btn edit-administrator-btn" data-administrator-id="${administrator.administratorId}">
                                <span class="action-icon">✏️</span> Edit Administrator
                            </button>
                            <button class="action-item remove-btn remove-administrator-btn" data-administrator-id="${administrator.administratorId}">
                                <span class="action-icon">🗑️</span> Remove Administrator
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');

        // Setup action buttons
        setupActionButtons();
        updateAdministratorPagination();
    }

    function setupActionButtons() {
        // Toggle dropdowns
        document.querySelectorAll('.kebab-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const dropdown = this.nextElementSibling;

                // Close all other dropdowns
                document.querySelectorAll('.action-dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('show');
                });

                dropdown.classList.toggle('show');
            });
        });

        // View details
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const administratorId = parseInt(this.getAttribute('data-administrator-id'));
                showAdministratorDetails(administratorId);
                closeAllDropdowns();
            });
        });

        // Edit administrator
        document.querySelectorAll('.edit-administrator-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const administratorId = parseInt(this.getAttribute('data-administrator-id'));
                openEditAdministratorModal(administratorId);
                closeAllDropdowns();
            });
        });

        // Remove administrator
        document.querySelectorAll('.remove-administrator-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const administratorId = parseInt(this.getAttribute('data-administrator-id'));
                openRemoveAdministratorModal(administratorId);
                closeAllDropdowns();
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function () {
            closeAllDropdowns();
        });
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.action-dropdown').forEach(d => d.classList.remove('show'));
    }

    function showAdministratorDetails(administratorId) {
        const administrator = ADMINISTRATOR_DATA.administrators.find(a => a.administratorId === administratorId);
        if (!administrator) return;

        // Populate basic information
        document.getElementById('administratorName').textContent = administrator.administratorName;
        document.getElementById('administratorEmail').textContent = administrator.email;
        document.getElementById('administratorPassword').textContent = '••••••••••';
        document.getElementById('administratorLastActive').textContent = formatDateTimeForDisplay(administrator.lastActive);

        // Get activity logs for this administrator
        const adminLogs = ADMINISTRATOR_DATA.activityLogs.filter(log => log.administratorId === administratorId);

        // Populate activity logs table
        const activityTableBody = document.getElementById('adminActivityLogsBody');
        if (adminLogs.length > 0) {
            activityTableBody.innerHTML = adminLogs.map(log => `
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
        openModal('administratorModal');
    }

    // Modal controls
    function initializeModals() {
        // Administrator Details Modal
        setupModalControls('administratorModal', 'closeModal');

        // Add Administrator Modal
        setupModalControls('addAdministratorModal', 'closeAddModal');
        document.getElementById('cancelAddBtn').addEventListener('click', () => closeModal('addAdministratorModal'));
        document.getElementById('confirmAddBtn').addEventListener('click', handleAddAdministrator);

        // Edit Administrator Modal
        setupModalControls('editAdministratorModal', 'closeEditModal');
        document.getElementById('cancelEditBtn').addEventListener('click', () => closeModal('editAdministratorModal'));
        document.getElementById('saveChangesBtn').addEventListener('click', handleEditAdministrator);

        // Remove Administrator Modal
        setupModalControls('removeAdministratorModal', 'closeRemoveModal');
        document.getElementById('cancelRemoveBtn').addEventListener('click', () => closeModal('removeAdministratorModal'));
        document.getElementById('confirmRemoveBtn').addEventListener('click', handleRemoveAdministrator);

        // Close with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });
    }

    function setupModalControls(modalId, closeButtonId) {
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeButtonId);

        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modalId));
        }

        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === this) closeModal(modalId);
            });
        }
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
    }

    // Add Administrator Modal
    function openAddAdministratorModal() {
        // Clear form
        document.getElementById('addAdminName').value = '';
        document.getElementById('addAdminEmail').value = '';
        document.getElementById('addAdminPassword').value = '';

        openModal('addAdministratorModal');
    }

    function handleAddAdministrator() {
        const name = document.getElementById('addAdminName').value.trim();
        const email = document.getElementById('addAdminEmail').value.trim();
        const password = document.getElementById('addAdminPassword').value;

        if (!name || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Generate new ID
        const newId = Math.max(...ADMINISTRATOR_DATA.administrators.map(a => a.administratorId)) + 1;

        // Create new administrator
        const newAdmin = {
            administratorId: newId,
            administratorName: name,
            email: email,
            password: password,
            lastActive: new Date()
        };

        // Add to data
        ADMINISTRATOR_DATA.administrators.push(newAdmin);

        // Refresh table
        filterAdministrators();

        // Close modal
        closeModal('addAdministratorModal');

        alert('Administrator added successfully!');
    }

    // Edit Administrator Modal
    function openEditAdministratorModal(administratorId) {
        const administrator = ADMINISTRATOR_DATA.administrators.find(a => a.administratorId === administratorId);
        if (!administrator) return;

        currentEditAdministratorId = administratorId;

        // Populate form
        document.getElementById('editAdminId').value = administrator.administratorId;
        document.getElementById('editAdminName').value = administrator.administratorName;
        document.getElementById('editAdminEmail').value = administrator.email;
        document.getElementById('editAdminPassword').value = ''; // Don't show password

        openModal('editAdministratorModal');
    }

    function handleEditAdministrator() {
        const name = document.getElementById('editAdminName').value.trim();
        const email = document.getElementById('editAdminEmail').value.trim();
        const password = document.getElementById('editAdminPassword').value;

        if (!name || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Find and update administrator
        const administrator = ADMINISTRATOR_DATA.administrators.find(a => a.administratorId === currentEditAdministratorId);
        if (administrator) {
            administrator.administratorName = name;
            administrator.email = email;
            if (password) {
                administrator.password = password;
            }
        }

        // Refresh table
        filterAdministrators();

        // Close modal
        closeModal('editAdministratorModal');

        alert('Administrator updated successfully!');
    }

    // Remove Administrator Modal
    function openRemoveAdministratorModal(administratorId) {
        const administrator = ADMINISTRATOR_DATA.administrators.find(a => a.administratorId === administratorId);
        if (!administrator) return;

        currentRemoveAdministratorId = administratorId;

        // Set administrator name in confirmation message
        document.getElementById('removeAdminId').value = administrator.administratorId;
        document.getElementById('removeAdminName').textContent = administrator.administratorName;

        openModal('removeAdministratorModal');
    }

    function handleRemoveAdministrator() {
        // Remove from data
        const index = ADMINISTRATOR_DATA.administrators.findIndex(a => a.administratorId === currentRemoveAdministratorId);
        if (index !== -1) {
            ADMINISTRATOR_DATA.administrators.splice(index, 1);
        }

        // Refresh table
        filterAdministrators();

        // Close modal
        closeModal('removeAdministratorModal');

        alert('Administrator removed successfully!');
    }

    function updateAdministratorPagination() {
        const total = filteredAdministrators.length;
        const totalPages = Math.ceil(total / rowsPerPage);
        const start = (currentAdministratorPage - 1) * rowsPerPage + 1;
        const end = Math.min(start + rowsPerPage - 1, total);

        document.getElementById('administratorShowingStart').textContent = total > 0 ? start : 0;
        document.getElementById('administratorShowingEnd').textContent = end;
        document.getElementById('administratorTotal').textContent = total;

        const pagination = document.getElementById('administratorPagination');
        pagination.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.className = 'pagination-btn';
        prevBtn.disabled = currentAdministratorPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentAdministratorPage > 1) {
                currentAdministratorPage--;
                renderAdministratorTable();
            }
        });
        pagination.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentAdministratorPage - 1 && i <= currentAdministratorPage + 1)) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.className = 'pagination-btn' + (i === currentAdministratorPage ? ' active' : '');
                pageBtn.addEventListener('click', () => {
                    currentAdministratorPage = i;
                    renderAdministratorTable();
                });
                pagination.appendChild(pageBtn);
            } else if (i === currentAdministratorPage - 2 || i === currentAdministratorPage + 2) {
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
        nextBtn.disabled = currentAdministratorPage === totalPages || totalPages === 0;
        nextBtn.addEventListener('click', () => {
            if (currentAdministratorPage < totalPages) {
                currentAdministratorPage++;
                renderAdministratorTable();
            }
        });
        pagination.appendChild(nextBtn);
    }

    // Activity Logs functionality
    function initializeActivityLogs() {
        filteredActivities = [...ADMINISTRATOR_DATA.activityLogs];
        renderActivityTable();
        setupActivityControls();
    }

    function setupActivityControls() {
        // Search
        document.getElementById('activitySearch').addEventListener('input', function (e) {
            filterActivities();
        });

        // Date filter
        document.getElementById('timeOfActionFilter').addEventListener('change', function (e) {
            filterActivities();
        });

        // Sort headers
        document.querySelectorAll('#activityTable th[data-sort]').forEach(th => {
            th.addEventListener('click', function () {
                sortActivities(this.getAttribute('data-sort'));
            });
        });
    }

    function filterActivities() {
        const searchTerm = document.getElementById('activitySearch').value.toLowerCase();
        const dateFilter = document.getElementById('timeOfActionFilter').value;

        filteredActivities = ADMINISTRATOR_DATA.activityLogs.filter(log => {
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

        currentActivityPage = 1;
        renderActivityTable();
    }

    function sortActivities(column) {
        if (activitySortColumn === column) {
            activitySortAsc = !activitySortAsc;
        } else {
            activitySortColumn = column;
            activitySortAsc = true;
        }

        filteredActivities.sort((a, b) => {
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

            if (valA < valB) return activitySortAsc ? -1 : 1;
            if (valA > valB) return activitySortAsc ? 1 : -1;
            return 0;
        });

        renderActivityTable();
    }

    function renderActivityTable() {
        const tbody = document.getElementById('activityTableBody');
        const start = (currentActivityPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = filteredActivities.slice(start, end);

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
        const total = filteredActivities.length;
        const totalPages = Math.ceil(total / rowsPerPage);
        const start = (currentActivityPage - 1) * rowsPerPage + 1;
        const end = Math.min(start + rowsPerPage - 1, total);

        document.getElementById('activityShowingStart').textContent = total > 0 ? start : 0;
        document.getElementById('activityShowingEnd').textContent = end;
        document.getElementById('activityTotal').textContent = total;

        const pagination = document.getElementById('activityPagination');
        pagination.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.className = 'pagination-btn';
        prevBtn.disabled = currentActivityPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentActivityPage > 1) {
                currentActivityPage--;
                renderActivityTable();
            }
        });
        pagination.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentActivityPage - 1 && i <= currentActivityPage + 1)) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.className = 'pagination-btn' + (i === currentActivityPage ? ' active' : '');
                pageBtn.addEventListener('click', () => {
                    currentActivityPage = i;
                    renderActivityTable();
                });
                pagination.appendChild(pageBtn);
            } else if (i === currentActivityPage - 2 || i === currentActivityPage + 2) {
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
        nextBtn.disabled = currentActivityPage === totalPages || totalPages === 0;
        nextBtn.addEventListener('click', () => {
            if (currentActivityPage < totalPages) {
                currentActivityPage++;
                renderActivityTable();
            }
        });
        pagination.appendChild(nextBtn);
    }

})()