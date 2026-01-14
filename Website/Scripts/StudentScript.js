// Student Module Script
(function () {
    'use strict';

    // Sample data - Replace with API calls to your database
    const STUDENT_DATA = {
        students: [
            { studentId: 1, studentName: "Juan Dela Cruz", gender: "Male", schoolName: "Riverside Elementary", barangay: "San Juan", lastActive: new Date('2026-01-14T10:30:00') },
            { studentId: 2, studentName: "Maria Santos", gender: "Female", schoolName: "Riverside Elementary", barangay: "San Juan", lastActive: new Date('2026-01-14T14:20:00') },
            { studentId: 3, studentName: "Pedro Garcia", gender: "Male", schoolName: "Mountainview High School", barangay: "Santa Cruz", lastActive: new Date('2026-01-13T09:15:00') },
            { studentId: 4, studentName: "Ana Reyes", gender: "Female", schoolName: "Mountainview High School", barangay: "Santa Cruz", lastActive: new Date('2026-01-14T11:45:00') },
            { studentId: 5, studentName: "Carlos Lopez", gender: "Male", schoolName: "Central Academy", barangay: "San Juan", lastActive: new Date('2026-01-12T16:30:00') },
            { studentId: 6, studentName: "Sofia Cruz", gender: "Female", schoolName: "Central Academy", barangay: "San Juan", lastActive: new Date('2026-01-14T08:00:00') },
            { studentId: 7, studentName: "Miguel Torres", gender: "Male", schoolName: "Bayside Learning Center", barangay: "Poblacion", lastActive: new Date('2026-01-11T13:20:00') },
            { studentId: 8, studentName: "Isabella Ramos", gender: "Female", schoolName: "Bayside Learning Center", barangay: "Poblacion", lastActive: new Date('2026-01-14T15:10:00') },
            { studentId: 9, studentName: "Diego Fernandez", gender: "Male", schoolName: "Riverside Elementary", barangay: "San Juan", lastActive: new Date('2026-01-10T10:00:00') },
            { studentId: 10, studentName: "Gabriela Mendoza", gender: "Female", schoolName: "Mountainview High School", barangay: "Santa Cruz", lastActive: new Date('2026-01-14T12:30:00') }
        ],
        activityLogs: [
            { logId: 1001, studentId: 1, studentName: "Juan Dela Cruz", sessionType: "Login", sessionTag: "Web", deviceInfo: "Chrome 120 / Windows 11", timeOfAction: new Date('2026-01-14T10:30:15') },
            { logId: 1002, studentId: 2, studentName: "Maria Santos", sessionType: "Quiz", sessionTag: "Math", deviceInfo: "Safari / iOS 17", timeOfAction: new Date('2026-01-14T14:20:30') },
            { logId: 1003, studentId: 3, studentName: "Pedro Garcia", sessionType: "Logout", sessionTag: "Web", deviceInfo: "Firefox 121 / Ubuntu", timeOfAction: new Date('2026-01-13T09:15:45') },
            { logId: 1004, studentId: 4, studentName: "Ana Reyes", sessionType: "Assignment", sessionTag: "Science", deviceInfo: "Edge 120 / Windows 10", timeOfAction: new Date('2026-01-14T11:45:20') },
            { logId: 1005, studentId: 5, studentName: "Carlos Lopez", sessionType: "Login", sessionTag: "Mobile", deviceInfo: "Chrome / Android 14", timeOfAction: new Date('2026-01-12T16:30:10') },
            { logId: 1006, studentId: 6, studentName: "Sofia Cruz", sessionType: "Quiz", sessionTag: "English", deviceInfo: "Safari / macOS", timeOfAction: new Date('2026-01-14T08:00:25') },
            { logId: 1007, studentId: 7, studentName: "Miguel Torres", sessionType: "Login", sessionTag: "Web", deviceInfo: "Chrome 120 / Windows 11", timeOfAction: new Date('2026-01-11T13:20:40') },
            { logId: 1008, studentId: 8, studentName: "Isabella Ramos", sessionType: "Assignment", sessionTag: "History", deviceInfo: "Firefox 121 / Windows 11", timeOfAction: new Date('2026-01-14T15:10:55') },
            { logId: 1009, studentId: 9, studentName: "Diego Fernandez", sessionType: "Logout", sessionTag: "Web", deviceInfo: "Edge 120 / Windows 10", timeOfAction: new Date('2026-01-10T10:00:30') },
            { logId: 1010, studentId: 10, studentName: "Gabriela Mendoza", sessionType: "Quiz", sessionTag: "Math", deviceInfo: "Chrome / Android 13", timeOfAction: new Date('2026-01-14T12:30:18') },
            { logId: 1011, studentId: 1, studentName: "Juan Dela Cruz", sessionType: "Quiz", sessionTag: "Science", deviceInfo: "Chrome 120 / Windows 11", timeOfAction: new Date('2026-01-14T11:15:22') },
            { logId: 1012, studentId: 2, studentName: "Maria Santos", sessionType: "Logout", sessionTag: "Mobile", deviceInfo: "Safari / iOS 17", timeOfAction: new Date('2026-01-14T16:45:33') }
        ]
    };

    // Pagination state
    let currentStudentPage = 1;
    let currentActivityPage = 1;
    const rowsPerPage = 10;

    // Filtered data
    let filteredStudents = [];
    let filteredActivities = [];

    // Sort state
    let studentSortColumn = null;
    let studentSortAsc = true;
    let activitySortColumn = null;
    let activitySortAsc = true;

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initializeTabs();
        initializeStudentList();
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
            sessionStorage.setItem('activeStudentTab', targetTabId);
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

    // Student List functionality
    function initializeStudentList() {
        filteredStudents = [...STUDENT_DATA.students];
        renderStudentTable();
        setupStudentControls();
    }

    function setupStudentControls() {
        // Search
        document.getElementById('studentSearch').addEventListener('input', function (e) {
            filterStudents();
        });

        // Date filter
        document.getElementById('lastActiveFilter').addEventListener('change', function (e) {
            filterStudents();
        });

        // Sort headers
        document.querySelectorAll('#studentTable th[data-sort]').forEach(th => {
            th.addEventListener('click', function () {
                sortStudents(this.getAttribute('data-sort'));
            });
        });
    }

    function filterStudents() {
        const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
        const dateFilter = document.getElementById('lastActiveFilter').value;

        filteredStudents = STUDENT_DATA.students.filter(student => {
            const matchesSearch =
                student.studentName.toLowerCase().includes(searchTerm) ||
                student.schoolName.toLowerCase().includes(searchTerm) ||
                student.barangay.toLowerCase().includes(searchTerm) ||
                student.gender.toLowerCase().includes(searchTerm);

            let matchesDate = true;
            if (dateFilter === 'today') {
                const today = new Date().toDateString();
                matchesDate = student.lastActive.toDateString() === today;
            } else if (dateFilter === 'yesterday') {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                matchesDate = student.lastActive.toDateString() === yesterday.toDateString();
            } else if (dateFilter) {
                matchesDate = student.lastActive.toISOString().startsWith(dateFilter);
            }

            return matchesSearch && matchesDate;
        });

        currentStudentPage = 1;
        renderStudentTable();
    }

    function sortStudents(column) {
        if (studentSortColumn === column) {
            studentSortAsc = !studentSortAsc;
        } else {
            studentSortColumn = column;
            studentSortAsc = true;
        }

        filteredStudents.sort((a, b) => {
            let valA, valB;

            if (column === 'studentName') {
                valA = a.studentName.toLowerCase();
                valB = b.studentName.toLowerCase();
            } else if (column === 'gender') {
                valA = a.gender.toLowerCase();
                valB = b.gender.toLowerCase();
            } else if (column === 'schoolName') {
                valA = a.schoolName.toLowerCase();
                valB = b.schoolName.toLowerCase();
            } else if (column === 'barangay') {
                valA = a.barangay.toLowerCase();
                valB = b.barangay.toLowerCase();
            } else if (column === 'lastActive') {
                valA = a.lastActive.getTime();
                valB = b.lastActive.getTime();
            }

            if (valA < valB) return studentSortAsc ? -1 : 1;
            if (valA > valB) return studentSortAsc ? 1 : -1;
            return 0;
        });

        renderStudentTable();
    }

    function renderStudentTable() {
        const tbody = document.getElementById('studentTableBody');
        const start = (currentStudentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = filteredStudents.slice(start, end);

        tbody.innerHTML = pageData.map(student => `
            <tr>
                <td>${student.studentName}</td>
                <td>${student.gender}</td>
                <td>${student.schoolName}</td>
                <td>${student.barangay}</td>
                <td>${formatDateTimeForDisplay(student.lastActive)}</td>
            </tr>
        `).join('');

        updateStudentPagination();
    }

    function updateStudentPagination() {
        const total = filteredStudents.length;
        const totalPages = Math.ceil(total / rowsPerPage);
        const start = (currentStudentPage - 1) * rowsPerPage + 1;
        const end = Math.min(start + rowsPerPage - 1, total);

        document.getElementById('studentShowingStart').textContent = total > 0 ? start : 0;
        document.getElementById('studentShowingEnd').textContent = end;
        document.getElementById('studentTotal').textContent = total;

        const pagination = document.getElementById('studentPagination');
        pagination.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.className = 'pagination-btn';
        prevBtn.disabled = currentStudentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentStudentPage > 1) {
                currentStudentPage--;
                renderStudentTable();
            }
        });
        pagination.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentStudentPage - 1 && i <= currentStudentPage + 1)) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.className = 'pagination-btn' + (i === currentStudentPage ? ' active' : '');
                pageBtn.addEventListener('click', () => {
                    currentStudentPage = i;
                    renderStudentTable();
                });
                pagination.appendChild(pageBtn);
            } else if (i === currentStudentPage - 2 || i === currentStudentPage + 2) {
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
        nextBtn.disabled = currentStudentPage === totalPages || totalPages === 0;
        nextBtn.addEventListener('click', () => {
            if (currentStudentPage < totalPages) {
                currentStudentPage++;
                renderStudentTable();
            }
        });
        pagination.appendChild(nextBtn);
    }

    // Activity Logs functionality
    function initializeActivityLogs() {
        filteredActivities = [...STUDENT_DATA.activityLogs];
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

        filteredActivities = STUDENT_DATA.activityLogs.filter(log => {
            const matchesSearch =
                String(log.logId).includes(searchTerm) ||
                String(log.studentId).includes(searchTerm) ||
                log.studentName.toLowerCase().includes(searchTerm) ||
                log.sessionType.toLowerCase().includes(searchTerm) ||
                log.sessionTag.toLowerCase().includes(searchTerm) ||
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

            if (column === 'logId' || column === 'studentId') {
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
                <td>${log.studentId}</td>
                <td>${log.studentName}</td>
                <td><span class="session-badge session-${log.sessionType.toLowerCase()}">${log.sessionType}</span></td>
                <td><span class="tag-badge">${log.sessionTag}</span></td>
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