// Student Module Script
(function () {
    'use strict';

    // Sample data - Replace with API calls to your database
    const STUDENT_DATA = {
        students: [
            {
                studentId: 1, studentName: "Juan Dela Cruz", gender: "Male", age: 12, birthday: "2014-03-15", schoolName: "Riverside Elementary", barangay: "San Juan", lastActive: new Date('2026-01-14T10:30:00'),
                preAssessment: 65, postAssessment: 85,
                moduleProgress: { phonics: 80, grammar: 75, vocabulary: 90, comprehending: 70, creating: 65 },
                moduleScores: { phonics: 82, grammar: 78, vocabulary: 88, comprehending: 75, creating: 70 },
                interventions: { count: 3, latestScore: 78, history: [{ date: '2026-01-10', score: 65 }, { date: '2026-01-12', score: 72 }, { date: '2026-01-14', score: 78 }] }
            },
            {
                studentId: 2, studentName: "Maria Santos", gender: "Female", age: 11, birthday: "2015-07-22", schoolName: "Riverside Elementary", barangay: "San Juan", lastActive: new Date('2026-01-14T14:20:00'),
                preAssessment: 70, postAssessment: 90,
                moduleProgress: { phonics: 85, grammar: 88, vocabulary: 92, comprehending: 80, creating: 75 },
                moduleScores: { phonics: 87, grammar: 85, vocabulary: 90, comprehending: 82, creating: 78 },
                interventions: { count: 2, latestScore: 85, history: [{ date: '2026-01-08', score: 70 }, { date: '2026-01-13', score: 85 }] }
            },
            {
                studentId: 3, studentName: "Pedro Garcia", gender: "Male", age: 13, birthday: "2013-11-08", schoolName: "Mountainview High School", barangay: "Santa Cruz", lastActive: new Date('2026-01-13T09:15:00'),
                preAssessment: 55, postAssessment: 72,
                moduleProgress: { phonics: 65, grammar: 60, vocabulary: 70, comprehending: 58, creating: 55 },
                moduleScores: { phonics: 68, grammar: 65, vocabulary: 72, comprehending: 62, creating: 60 },
                interventions: { count: 5, latestScore: 68, history: [{ date: '2026-01-05', score: 55 }, { date: '2026-01-07', score: 60 }, { date: '2026-01-09', score: 63 }, { date: '2026-01-11', score: 65 }, { date: '2026-01-13', score: 68 }] }
            },
            {
                studentId: 4, studentName: "Ana Reyes", gender: "Female", age: 15, birthday: "2011-02-14", schoolName: "Mountainview High School", barangay: "Santa Cruz", lastActive: new Date('2026-01-14T11:45:00'),
                preAssessment: 80, postAssessment: 95,
                moduleProgress: { phonics: 95, grammar: 92, vocabulary: 98, comprehending: 90, creating: 88 },
                moduleScores: { phonics: 94, grammar: 90, vocabulary: 96, comprehending: 88, creating: 85 },
                interventions: { count: 1, latestScore: 92, history: [{ date: '2026-01-12', score: 92 }] }
            },
            {
                studentId: 5, studentName: "Carlos Lopez", gender: "Male", age: 14, birthday: "2012-09-30", schoolName: "Central Academy", barangay: "San Juan", lastActive: new Date('2026-01-12T16:30:00'),
                preAssessment: 60, postAssessment: 78,
                moduleProgress: { phonics: 72, grammar: 70, vocabulary: 80, comprehending: 68, creating: 65 },
                moduleScores: { phonics: 75, grammar: 72, vocabulary: 78, comprehending: 70, creating: 68 },
                interventions: { count: 4, latestScore: 75, history: [{ date: '2026-01-06', score: 60 }, { date: '2026-01-08', score: 68 }, { date: '2026-01-10', score: 72 }, { date: '2026-01-12', score: 75 }] }
            },
            {
                studentId: 6, studentName: "Sofia Cruz", gender: "Female", age: 16, birthday: "2010-05-18", schoolName: "Central Academy", barangay: "San Juan", lastActive: new Date('2026-01-14T08:00:00'),
                preAssessment: 75, postAssessment: 92,
                moduleProgress: { phonics: 90, grammar: 88, vocabulary: 95, comprehending: 85, creating: 82 },
                moduleScores: { phonics: 89, grammar: 86, vocabulary: 93, comprehending: 83, creating: 80 },
                interventions: { count: 2, latestScore: 88, history: [{ date: '2026-01-09', score: 82 }, { date: '2026-01-13', score: 88 }] }
            },
            {
                studentId: 7, studentName: "Miguel Torres", gender: "Male", age: 12, birthday: "2014-12-25", schoolName: "Bayside Learning Center", barangay: "Poblacion", lastActive: new Date('2026-01-11T13:20:00'),
                preAssessment: 50, postAssessment: 68,
                moduleProgress: { phonics: 60, grammar: 58, vocabulary: 65, comprehending: 55, creating: 52 },
                moduleScores: { phonics: 62, grammar: 60, vocabulary: 68, comprehending: 58, creating: 55 },
                interventions: { count: 6, latestScore: 65, history: [{ date: '2026-01-02', score: 50 }, { date: '2026-01-04', score: 55 }, { date: '2026-01-06', score: 58 }, { date: '2026-01-08', score: 60 }, { date: '2026-01-10', score: 63 }, { date: '2026-01-11', score: 65 }] }
            },
            {
                studentId: 8, studentName: "Isabella Ramos", gender: "Female", age: 13, birthday: "2013-08-07", schoolName: "Bayside Learning Center", barangay: "Poblacion", lastActive: new Date('2026-01-14T15:10:00'),
                preAssessment: 85, postAssessment: 98,
                moduleProgress: { phonics: 98, grammar: 95, vocabulary: 100, comprehending: 92, creating: 90 },
                moduleScores: { phonics: 96, grammar: 93, vocabulary: 98, comprehending: 90, creating: 88 },
                interventions: { count: 1, latestScore: 95, history: [{ date: '2026-01-13', score: 95 }] }
            },
            {
                studentId: 9, studentName: "Diego Fernandez", gender: "Male", age: 11, birthday: "2015-04-12", schoolName: "Riverside Elementary", barangay: "San Juan", lastActive: new Date('2026-01-10T10:00:00'),
                preAssessment: 58, postAssessment: 75,
                moduleProgress: { phonics: 70, grammar: 68, vocabulary: 78, comprehending: 65, creating: 62 },
                moduleScores: { phonics: 72, grammar: 70, vocabulary: 76, comprehending: 68, creating: 65 },
                interventions: { count: 3, latestScore: 72, history: [{ date: '2026-01-05', score: 62 }, { date: '2026-01-08', score: 68 }, { date: '2026-01-10', score: 72 }] }
            },
            {
                studentId: 10, studentName: "Gabriela Mendoza", gender: "Female", age: 14, birthday: "2012-10-20", schoolName: "Mountainview High School", barangay: "Santa Cruz", lastActive: new Date('2026-01-14T12:30:00'),
                preAssessment: 72, postAssessment: 88,
                moduleProgress: { phonics: 85, grammar: 82, vocabulary: 90, comprehending: 78, creating: 75 },
                moduleScores: { phonics: 84, grammar: 80, vocabulary: 88, comprehending: 76, creating: 73 },
                interventions: { count: 2, latestScore: 82, history: [{ date: '2026-01-11', score: 75 }, { date: '2026-01-14', score: 82 }] }
            }
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
                <td class="actions-cell">
                    <div class="action-menu">
                        <button class="kebab-btn" data-student-id="${student.studentId}">
                            <span class="kebab-icon">⋮</span>
                        </button>
                        <div class="action-dropdown">
                            <button class="action-item view-details-btn" data-student-id="${student.studentId}">
                                <span class="action-icon">👁️</span> View Details
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');

        // Setup action buttons
        setupActionButtons();
        updateStudentPagination();
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
                const studentId = parseInt(this.getAttribute('data-student-id'));
                showStudentDetails(studentId);

                // Close dropdown
                document.querySelectorAll('.action-dropdown').forEach(d => d.classList.remove('show'));
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function () {
            document.querySelectorAll('.action-dropdown').forEach(d => d.classList.remove('show'));
        });
    }

    function showStudentDetails(studentId) {
        const student = STUDENT_DATA.students.find(s => s.studentId === studentId);
        if (!student) return;

        const modules = [
            { key: 'phonics', name: 'Phonics & Word Study' },
            { key: 'grammar', name: 'Grammar Awareness and Grammatical Structure' },
            { key: 'vocabulary', name: 'Vocabulary and Word Knowledge' },
            { key: 'comprehending', name: 'Comprehending and Analyzing Texts' },
            { key: 'creating', name: 'Creating and Composing Texts' }
        ];

        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <!-- Basic Information -->
            <div class="modal-section">
                <h3 class="section-title">📋 Basic Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Name</span>
                        <span class="info-value">${student.studentName}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Gender</span>
                        <span class="info-value">${student.gender}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Age</span>
                        <span class="info-value">${student.age} years old</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Birthday</span>
                        <span class="info-value">${new Date(student.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">School</span>
                        <span class="info-value">${student.schoolName}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Barangay</span>
                        <span class="info-value">${student.barangay}</span>
                    </div>
                </div>
            </div>
            
            <!-- Assessment Scores -->
            <div class="modal-section">
                <h3 class="section-title">📊 Assessment Scores</h3>
                <div class="assessment-cards">
                    <div class="assessment-card">
                        <div class="assessment-label">Pre-Assessment</div>
                        <div class="assessment-score">${student.preAssessment}%</div>
                        <div class="assessment-bar">
                            <div class="assessment-fill" style="width: ${student.preAssessment}%; background: #6c757d;"></div>
                        </div>
                    </div>
                    <div class="assessment-card">
                        <div class="assessment-label">Post-Assessment</div>
                        <div class="assessment-score">${student.postAssessment}%</div>
                        <div class="assessment-bar">
                            <div class="assessment-fill" style="width: ${student.postAssessment}%; background: #198754;"></div>
                        </div>
                    </div>
                    <div class="assessment-card improvement">
                        <div class="assessment-label">Improvement</div>
                        <div class="assessment-score improvement-value">+${student.postAssessment - student.preAssessment}%</div>
                        <div class="improvement-icon">📈</div>
                    </div>
                </div>
            </div>
            
            <!-- Current Progress per Module -->
            <div class="modal-section">
                <h3 class="section-title">📚 Current Progress per Module</h3>
                <div class="progress-list">
                    ${modules.map(module => `
                        <div class="progress-item">
                            <div class="progress-header">
                                <span class="module-name">${module.name}</span>
                                <span class="progress-percentage">${student.moduleProgress[module.key]}%</span>
                            </div>
                            <div class="progress-bar-container">
                                <div class="progress-bar-fill" style="width: ${student.moduleProgress[module.key]}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Score per Module -->
            <div class="modal-section">
                <h3 class="section-title">🎯 Score per Module</h3>
                <div class="score-grid">
                    ${modules.map(module => `
                        <div class="score-card">
                            <div class="score-module">${module.name}</div>
                            <div class="score-value">${student.moduleScores[module.key]}%</div>
                            <div class="score-status ${student.moduleScores[module.key] >= 75 ? 'passing' : 'needs-improvement'}">
                                ${student.moduleScores[module.key] >= 75 ? '✓ Passing' : '⚠ Needs Improvement'}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Interventions -->
            <div class="modal-section">
                <h3 class="section-title">🔧 Intervention History</h3>
                <div class="intervention-summary">
                    <div class="intervention-stat">
                        <span class="stat-label">Total Interventions</span>
                        <span class="stat-value">${student.interventions.count}</span>
                    </div>
                    <div class="intervention-stat">
                        <span class="stat-label">Latest Score</span>
                        <span class="stat-value">${student.interventions.latestScore}%</span>
                    </div>
                </div>
                <div class="intervention-table-wrapper">
                    <table class="intervention-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Score</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${student.interventions.history.map((intervention, index) => {
            const prevScore = index > 0 ? student.interventions.history[index - 1].score : student.preAssessment;
            const change = intervention.score - prevScore;
            return `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${new Date(intervention.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                        <td><strong>${intervention.score}%</strong></td>
                                        <td class="${change >= 0 ? 'positive-change' : 'negative-change'}">
                                            ${change >= 0 ? '+' : ''}${change}%
                                        </td>
                                    </tr>
                                `;
        }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Show modal
        document.getElementById('studentModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Modal controls
    document.addEventListener('DOMContentLoaded', function () {
        // Close modal button
        document.getElementById('closeModal').addEventListener('click', closeModal);

        // Close when clicking outside
        document.getElementById('studentModal').addEventListener('click', function (e) {
            if (e.target === this) closeModal();
        });

        // Close with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    });

    function closeModal() {
        document.getElementById('studentModal').classList.remove('show');
        document.body.style.overflow = '';
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