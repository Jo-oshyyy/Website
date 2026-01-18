// Administrator Module Script
(function () {
    'use strict';

    // Sample data - Replace with API calls to your database
    const ADMINISTRATOR_DATA = {
        administrators: [
            {
                administratorId: 1, administratorName: "Juan Dela Cruz", role: "Super Admin", department: "IT Department", email: "juan.delacruz@school.edu", lastActive: new Date('2026-01-14T10:30:00')
            },
            {
                administratorId: 2, administratorName: "Maria Santos", role: "Admin", department: "Academic Affairs", email: "maria.santos@school.edu", lastActive: new Date('2026-01-14T14:20:00')
            },
            {
                administratorId: 3, administratorName: "Pedro Garcia", role: "Moderator", department: "Student Services", email: "pedro.garcia@school.edu", lastActive: new Date('2026-01-13T09:15:00')
            },
            {
                administratorId: 4, administratorName: "Ana Reyes", role: "Admin", department: "HR Department", email: "ana.reyes@school.edu", lastActive: new Date('2026-01-14T11:45:00')
            },
            {
                administratorId: 5, administratorName: "Carlos Lopez", role: "Moderator", department: "IT Department", email: "carlos.lopez@school.edu", lastActive: new Date('2026-01-12T16:30:00')
            },
            {
                administratorId: 6, administratorName: "Sofia Cruz", role: "Super Admin", department: "Academic Affairs", email: "sofia.cruz@school.edu", lastActive: new Date('2026-01-14T08:00:00')
            },
            {
                administratorId: 7, administratorName: "Miguel Torres", role: "Admin", department: "Finance", email: "miguel.torres@school.edu", lastActive: new Date('2026-01-11T13:20:00')
            },
            {
                administratorId: 8, administratorName: "Isabella Ramos", role: "Moderator", department: "Student Services", email: "isabella.ramos@school.edu", lastActive: new Date('2026-01-14T15:10:00')
            },
            {
                administratorId: 9, administratorName: "Diego Fernandez", role: "Admin", department: "IT Department", email: "diego.fernandez@school.edu", lastActive: new Date('2026-01-10T10:00:00')
            },
            {
                administratorId: 10, administratorName: "Gabriela Mendoza", role: "Super Admin", department: "HR Department", email: "gabriela.mendoza@school.edu", lastActive: new Date('2026-01-14T12:30:00')
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
            { logId: 1012, administratorId: 2, administratorName: "Maria Santos", actionType: "Logout", actionTag: "Mobile", deviceInfo: "Safari / iOS 17", timeOfAction: new Date('2026-01-14T16:45:33') }
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

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initializeTabs();
        initializeAdministratorList();
        populateDateDropdowns();
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
                administrator.role.toLowerCase().includes(searchTerm) ||
                administrator.department.toLowerCase().includes(searchTerm) ||
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
            } else if (column === 'role') {
                valA = a.role.toLowerCase();
                valB = b.role.toLowerCase();
            } else if (column === 'department') {
                valA = a.department.toLowerCase();
                valB = b.department.toLowerCase();
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
                <td>${administrator.role}</td>
                <td>${administrator.department}</td>
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

                // Close dropdown
                document.querySelectorAll('.action-dropdown').forEach(d => d.classList.remove('show'));
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function () {
            document.querySelectorAll('.action-dropdown').forEach(d => d.classList.remove('show'));
        });
    }

    function showAdministratorDetails(administratorId) {
        const administrator = ADMINISTRATOR_DATA.administrators.find(a => a.administratorId === administratorId);
        if (!administrator) return;

        // Populate modal with administrator details
        document.getElementById('administratorName').textContent = administrator.administratorName;
        document.getElementById('administratorRole').textContent = administrator.role;
        document.getElementById('administratorDepartment').textContent = administrator.department;
        document.getElementById('administratorEmail').textContent = administrator.email;
        document.getElementById('administratorLastActive').textContent = formatDateTimeForDisplay(administrator.lastActive);

        // Show modal
        document.getElementById('administratorModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Modal controls
    document.addEventListener('DOMContentLoaded', function () {
        // Close modal button
        const closeBtn = document.getElementById('closeModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close when clicking outside
        const modal = document.getElementById('administratorModal');
        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === this) closeModal();
            });
        }

        // Close with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    });

    function closeModal() {
        const modal = document.getElementById('administratorModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
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

})();