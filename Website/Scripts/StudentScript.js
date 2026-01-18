// Enhanced Student Module Script with Chart.js Integration
(function () {
    'use strict';

    // Sample enhanced data structure - Ready for backend integration
    const STUDENT_DATA = {
        students: [
            {
                studentId: 1,
                studentName: "Juan Dela Cruz",
                gender: "Male",
                age: 12,
                birthday: "2014-03-15",
                schoolName: "Riverside Elementary",
                barangay: "San Juan",
                dateJoined: "2025-09-01",
                lastActive: new Date('2026-01-14T10:30:00'),
                preAssessment: 65,
                postAssessment: 85,
                initialPlacement: "Below Grade Level",
                currentPlacement: "At Expected Grade Level",
                initialAbility: { phonics: 60, vocabulary: 65, grammar: 62, comprehending: 68, creating: 63 },
                currentAbility: { phonics: 82, vocabulary: 88, grammar: 78, comprehending: 85, creating: 80 },
                masteryGrades: { phonics: 82, vocabulary: 88, grammar: 78, comprehending: 85, creating: 80 },
                moduleProgress: { phonics: 85, vocabulary: 92, grammar: 80, comprehending: 88, creating: 82 },
                quizScores: {
                    phonics: [6.5, 6.8, 7.2, 7.5, 7.8, 8.0, 8.2, 8.3, 8.5, 8.4, 8.6, 8.7],
                    vocabulary: [7.0, 7.2, 7.5, 7.8, 8.0, 8.3, 8.5, 8.7, 8.8, 8.9, 9.0, 9.1],
                    grammar: [6.0, 6.3, 6.5, 6.8, 7.0, 7.2, 7.5, 7.6, 7.8, 7.9, 8.0, 8.1],
                    comprehending: [7.2, 7.4, 7.6, 7.8, 8.0, 8.2, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9],
                    creating: [6.8, 7.0, 7.2, 7.4, 7.6, 7.8, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5]
                },
                interventions: [
                    { date: '2025-10-15', moduleName: 'Phonics & Word Study', activity: 'Stage 1', score: 65, pass: false },
                    { date: '2025-10-22', moduleName: 'Grammar Awareness & Grammatical Structures', activity: '1st Intervention', score: 72, pass: false },
                    { date: '2025-11-05', moduleName: 'Phonics & Word Study', activity: 'Stage 2', score: 78, pass: true },
                    { date: '2025-11-18', moduleName: 'Creating & Composing Text', activity: '1st Intervention', score: 80, pass: true },
                    { date: '2025-12-02', moduleName: 'Vocabulary & Word Knowledge', activity: 'Stage 1', score: 85, pass: true },
                    { date: '2025-12-15', moduleName: 'Comprehending & Analyzing Text', activity: '2nd Intervention', score: 88, pass: true }
                ]
            },
            {
                studentId: 2,
                studentName: "Maria Santos",
                gender: "Female",
                age: 11,
                birthday: "2015-07-22",
                schoolName: "Riverside Elementary",
                barangay: "San Juan",
                dateJoined: "2025-09-01",
                lastActive: new Date('2026-01-14T14:20:00'),
                preAssessment: 70,
                postAssessment: 90,
                initialPlacement: "Below Grade Level",
                currentPlacement: "At Expected Grade Level",
                initialAbility: { phonics: 68, vocabulary: 70, grammar: 72, comprehending: 70, creating: 68 },
                currentAbility: { phonics: 87, vocabulary: 90, grammar: 85, comprehending: 90, creating: 88 },
                masteryGrades: { phonics: 87, vocabulary: 90, grammar: 85, comprehending: 90, creating: 88 },
                moduleProgress: { phonics: 90, vocabulary: 95, grammar: 88, comprehending: 92, creating: 90 },
                quizScores: {
                    phonics: [7.0, 7.2, 7.5, 7.8, 8.0, 8.2, 8.4, 8.6, 8.7, 8.8, 8.9, 9.0],
                    vocabulary: [7.2, 7.5, 7.7, 8.0, 8.2, 8.5, 8.7, 8.8, 9.0, 9.1, 9.2, 9.3],
                    grammar: [6.8, 7.0, 7.3, 7.5, 7.8, 8.0, 8.2, 8.4, 8.5, 8.6, 8.7, 8.8],
                    comprehending: [7.5, 7.7, 8.0, 8.2, 8.4, 8.6, 8.8, 8.9, 9.0, 9.1, 9.2, 9.3],
                    creating: [7.0, 7.3, 7.5, 7.8, 8.0, 8.2, 8.5, 8.6, 8.8, 8.9, 9.0, 9.1]
                },
                interventions: [
                    { date: '2025-10-20', moduleName: 'Grammar Awareness & Grammatical Structures', activity: 'Stage 1', score: 75, pass: true },
                    { date: '2025-11-10', moduleName: 'Phonics & Word Study', activity: '1st Intervention', score: 82, pass: true },
                    { date: '2025-12-05', moduleName: 'Creating & Composing Text', activity: 'Stage 1', score: 88, pass: true }
                ]
            },
            {
                studentId: 3,
                studentName: "Pedro Garcia",
                gender: "Male",
                age: 13,
                birthday: "2013-11-08",
                schoolName: "Mountainview High School",
                barangay: "Santa Cruz",
                dateJoined: "2025-09-05",
                lastActive: new Date('2026-01-13T09:15:00'),
                preAssessment: 55,
                postAssessment: 72,
                initialPlacement: "Beginner",
                currentPlacement: "Below Grade Level",
                initialAbility: { phonics: 50, vocabulary: 55, grammar: 52, comprehending: 58, creating: 52 },
                currentAbility: { phonics: 68, vocabulary: 72, grammar: 65, comprehending: 75, creating: 70 },
                masteryGrades: { phonics: 68, vocabulary: 72, grammar: 65, comprehending: 75, creating: 70 },
                moduleProgress: { phonics: 70, vocabulary: 75, grammar: 68, comprehending: 78, creating: 72 },
                quizScores: {
                    phonics: [5.0, 5.2, 5.5, 5.8, 6.0, 6.2, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9],
                    vocabulary: [5.5, 5.7, 6.0, 6.2, 6.4, 6.6, 6.8, 6.9, 7.0, 7.1, 7.2, 7.3],
                    grammar: [4.8, 5.0, 5.2, 5.5, 5.7, 5.9, 6.1, 6.2, 6.4, 6.5, 6.6, 6.7],
                    comprehending: [5.8, 6.0, 6.3, 6.5, 6.8, 7.0, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7],
                    creating: [5.2, 5.4, 5.7, 6.0, 6.2, 6.5, 6.7, 6.8, 6.9, 7.0, 7.1, 7.2]
                },
                interventions: [
                    { date: '2025-10-10', moduleName: 'Phonics & Word Study', activity: 'Stage 1', score: 55, pass: false },
                    { date: '2025-10-25', moduleName: 'Grammar Awareness & Grammatical Structures', activity: '1st Intervention', score: 60, pass: false },
                    { date: '2025-11-08', moduleName: 'Phonics & Word Study', activity: '2nd Intervention', score: 63, pass: false },
                    { date: '2025-11-22', moduleName: 'Creating & Composing Text', activity: 'Stage 1', score: 65, pass: false },
                    { date: '2025-12-06', moduleName: 'Vocabulary & Word Knowledge', activity: '1st Intervention', score: 68, pass: false }
                ]
            }
        ],
        activityLogs: [
            { logId: 1001, studentId: 1, studentName: "Juan Dela Cruz", sessionType: "Login", sessionTag: "Web", deviceInfo: "Chrome 120 / Windows 11", timeOfAction: new Date('2026-01-14T10:30:15') },
            { logId: 1002, studentId: 2, studentName: "Maria Santos", sessionType: "Quiz", sessionTag: "Math", deviceInfo: "Safari / iOS 17", timeOfAction: new Date('2026-01-14T14:20:30') },
            { logId: 1003, studentId: 3, studentName: "Pedro Garcia", sessionType: "Logout", sessionTag: "Web", deviceInfo: "Firefox 121 / Ubuntu", timeOfAction: new Date('2026-01-13T09:15:45') }
        ]
    };

    // Chart instances for cleanup
    let abilityChart = null;
    let radarChart = null;
    let quizChart = null;

    // Pagination and filtering state
    let currentStudentPage = 1;
    let currentActivityPage = 1;
    const rowsPerPage = 10;
    let filteredStudents = [];
    let filteredActivities = [];
    let studentSortColumn = null;
    let studentSortAsc = true;
    let activitySortColumn = null;
    let activitySortAsc = true;

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initializeTabs();
        initializeStudentList();
        populateDateDropdowns();
        setupModalControls();
    });

    // Helper Functions
    function getPlacementClass(placement) {
        if (placement === "Beginner") return "beginner";
        if (placement === "Below Grade Level") return "below-grade";
        if (placement === "At Expected Grade Level") return "expected-grade";
        return "beginner";
    }

    function percentageToGrade(percentage) {
        if (percentage >= 97) return 'A+';
        if (percentage >= 93) return 'A';
        if (percentage >= 90) return 'A-';
        if (percentage >= 87) return 'B+';
        if (percentage >= 83) return 'B';
        if (percentage >= 80) return 'B-';
        if (percentage >= 77) return 'C+';
        if (percentage >= 73) return 'C';
        if (percentage >= 70) return 'C-';
        if (percentage >= 67) return 'D+';
        if (percentage >= 63) return 'D';
        if (percentage >= 60) return 'D-';
        return 'F';
    }

    function getChartColors() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        return {
            textColor: isDarkMode ? '#E2E8F0' : '#495057',
            gridColor: isDarkMode ? '#4A5568' : '#dee2e6',
            backgroundColor: isDarkMode ? '#2D3748' : '#ffffff'
        };
    }

    // Show Student Details Modal
    function showStudentDetails(studentId) {
        const student = STUDENT_DATA.students.find(s => s.studentId === studentId);
        if (!student) return;

        // 1. Populate Basic Information
        document.getElementById('studentName').textContent = student.studentName;
        document.getElementById('studentAge').textContent = student.age + ' years old';
        document.getElementById('studentBirthday').textContent = new Date(student.birthday).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        document.getElementById('studentGender').textContent = student.gender;
        document.getElementById('studentSchool').textContent = student.schoolName;
        document.getElementById('studentBarangay').textContent = student.barangay;
        document.getElementById('studentDateJoined').textContent = new Date(student.dateJoined).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        document.getElementById('studentLastActive').textContent = student.lastActive.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        // 2. Growth Tracking - Assessment Scores
        document.getElementById('preAssessmentScore').textContent = student.preAssessment + '%';
        document.getElementById('postAssessmentScore').textContent = student.postAssessment + '%';
        document.getElementById('improvementScore').textContent = '+' + (student.postAssessment - student.preAssessment) + '%';

        // Placement Badges
        const initialBadge = document.getElementById('initialPlacementBadge');
        initialBadge.textContent = student.initialPlacement;
        initialBadge.className = 'placement-badge ' + getPlacementClass(student.initialPlacement);

        const currentBadge = document.getElementById('currentPlacementBadge');
        currentBadge.textContent = student.currentPlacement;
        currentBadge.className = 'placement-badge ' + getPlacementClass(student.currentPlacement);

        // 3. Module Progress Bars
        document.querySelectorAll('.module-progress-list .progress-item').forEach(item => {
            const moduleKey = item.getAttribute('data-module');
            const progress = student.moduleProgress[moduleKey];
            item.querySelector('.progress-percentage').textContent = progress + '%';

            // Reset then animate
            const fillBar = item.querySelector('.progress-bar-fill');
            fillBar.style.width = '0%';
            setTimeout(() => {
                fillBar.style.width = progress + '%';
            }, 100);
        });

        // 4. Intervention Summary
        const passCount = student.interventions.filter(i => i.pass).length;
        const totalCount = student.interventions.length;
        const successRate = totalCount > 0 ? Math.round((passCount / totalCount) * 100) : 0;

        document.getElementById('totalInterventions').textContent = totalCount;
        document.getElementById('recoverySuccessRate').textContent = successRate + '%';

        // Intervention Table
        const tbody = document.getElementById('interventionTableBody');
        tbody.innerHTML = '';

        student.interventions.forEach(intervention => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${new Date(intervention.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td>${intervention.moduleName}</td>
                <td>${intervention.activity}</td>
                <td><strong>${intervention.score}%</strong></td>
                <td><span class="${intervention.pass ? 'pass-badge' : 'fail-badge'}">${intervention.pass ? 'Pass' : 'Fail'}</span></td>
            `;

            tbody.appendChild(row);
        });

        // Render Charts
        renderAbilityComparisonChart(student);
        renderMasteryRadarChart(student);
        renderQuizTrendsChart(student);

        // Show Modal
        document.getElementById('studentModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Chart 1: Stacked Bar Chart - Initial vs Current Ability
    function renderAbilityComparisonChart(student) {
        if (abilityChart) abilityChart.destroy();

        const ctx = document.getElementById('abilityComparisonChart').getContext('2d');
        const colors = getChartColors();
        const subdomains = ['Phonics & Word Study', 'Vocabulary & Word Knowledge',
            'Grammar Awareness', 'Comprehending Text', 'Creating Text'];
        const keys = ['phonics', 'vocabulary', 'grammar', 'comprehending', 'creating'];

        const initialData = keys.map(key => student.initialAbility[key]);
        const currentData = keys.map(key => student.currentAbility[key]);

        abilityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: subdomains,
                datasets: [
                    {
                        label: 'Initial Ability',
                        data: initialData,
                        backgroundColor: 'rgba(108, 117, 125, 0.7)',
                        borderColor: 'rgba(108, 117, 125, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Current Ability',
                        data: currentData,
                        backgroundColor: 'rgba(25, 135, 84, 0.7)',
                        borderColor: 'rgba(25, 135, 84, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: colors.textColor, font: { size: 12 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: colors.textColor, font: { size: 10 } },
                        grid: { color: colors.gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: colors.textColor,
                            callback: function (value) { return value + '%'; }
                        },
                        grid: { color: colors.gridColor }
                    }
                }
            }
        });
    }

    // Chart 2: Radar Chart - Current Mastery with Letter Grades
    function renderMasteryRadarChart(student) {
        if (radarChart) radarChart.destroy();

        const ctx = document.getElementById('masteryRadarChart').getContext('2d');
        const colors = getChartColors();
        const subdomains = ['Phonics & Word Study', 'Vocabulary & Word Knowledge',
            'Grammar Awareness', 'Comprehending Text', 'Creating Text'];
        const keys = ['phonics', 'vocabulary', 'grammar', 'comprehending', 'creating'];

        const masteryData = keys.map(key => student.masteryGrades[key]);
        const gradeLabels = keys.map(key => percentageToGrade(student.masteryGrades[key]));

        radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: subdomains,
                datasets: [{
                    label: 'Current Mastery',
                    data: masteryData,
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(13, 110, 253, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(13, 110, 253, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: colors.textColor, font: { size: 12 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const index = context.dataIndex;
                                return 'Score: ' + context.parsed.r + '% (Grade: ' + gradeLabels[index] + ')';
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: colors.textColor,
                            backdropColor: 'transparent',
                            stepSize: 20
                        },
                        grid: { color: colors.gridColor },
                        pointLabels: {
                            color: colors.textColor,
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    // Chart 3: Line Chart - Quiz Trends (1-10 scale, 12 quizzes)
    function renderQuizTrendsChart(student) {
        if (quizChart) quizChart.destroy();

        const ctx = document.getElementById('quizTrendsChart').getContext('2d');
        const colors = getChartColors();
        const quizLabels = Array.from({ length: 12 }, (_, i) => 'Quiz ' + (i + 1));

        const datasets = [
            {
                label: 'Phonics & Word Study',
                data: student.quizScores.phonics,
                backgroundColor: 'rgba(220, 38, 38, 0.5)',
                borderColor: 'rgba(220, 38, 38, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Vocabulary & Word Knowledge',
                data: student.quizScores.vocabulary,
                backgroundColor: 'rgba(37, 99, 235, 0.5)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Grammar Awareness',
                data: student.quizScores.grammar,
                backgroundColor: 'rgba(234, 179, 8, 0.5)',
                borderColor: 'rgba(234, 179, 8, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Comprehending Text',
                data: student.quizScores.comprehending,
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Creating Text',
                data: student.quizScores.creating,
                backgroundColor: 'rgba(168, 85, 247, 0.5)',
                borderColor: 'rgba(168, 85, 247, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }
        ];

        quizChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: quizLabels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: colors.textColor, font: { size: 10 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '/10';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: colors.textColor, font: { size: 9 } },
                        grid: { color: colors.gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            color: colors.textColor,
                            stepSize: 1,
                            callback: function (value) { return value + '/10'; }
                        },
                        grid: { color: colors.gridColor }
                    }
                }
            }
        });
    }

    // Modal Controls
    function setupModalControls() {
        document.getElementById('closeModal').addEventListener('click', closeModal);
        document.getElementById('studentModal').addEventListener('click', function (e) {
            if (e.target === this) closeModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    function closeModal() {
        document.getElementById('studentModal').classList.remove('show');
        document.body.style.overflow = '';

        // Destroy charts
        if (abilityChart) { abilityChart.destroy(); abilityChart = null; }
        if (radarChart) { radarChart.destroy(); radarChart = null; }
        if (quizChart) { quizChart.destroy(); quizChart = null; }
    }

    // Tab Functionality
    function initializeTabs() {
        document.querySelectorAll('.tab-header').forEach(header => {
            header.addEventListener('click', function () {
                switchTab(this.getAttribute('data-tab'));
            });
        });
    }

    function switchTab(targetTabId) {
        document.querySelectorAll('.tab-header').forEach(h => h.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        const activeHeader = document.querySelector('.tab-header[data-tab="' + targetTabId + '"]');
        const activeContent = document.getElementById(targetTabId);

        if (activeHeader && activeContent) {
            activeHeader.classList.add('active');
            activeContent.classList.add('active');

            if (targetTabId === 'activity-logs' && filteredActivities.length === 0) {
                initializeActivityLogs();
            }
        }
    }

    // Student List Functionality
    function initializeStudentList() {
        filteredStudents = [...STUDENT_DATA.students];
        renderStudentTable();
        setupStudentControls();
    }

    function setupStudentControls() {
        document.getElementById('studentSearch').addEventListener('input', filterStudents);
        document.getElementById('lastActiveFilter').addEventListener('change', filterStudents);
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
            const matchesSearch = student.studentName.toLowerCase().includes(searchTerm) ||
                student.schoolName.toLowerCase().includes(searchTerm) ||
                student.barangay.toLowerCase().includes(searchTerm) ||
                student.gender.toLowerCase().includes(searchTerm);

            let matchesDate = true;
            if (dateFilter === 'today') {
                matchesDate = student.lastActive.toDateString() === new Date().toDateString();
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
            if (column === 'lastActive') {
                valA = a.lastActive.getTime();
                valB = b.lastActive.getTime();
            } else {
                valA = String(a[column]).toLowerCase();
                valB = String(b[column]).toLowerCase();
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
                <td>${student.lastActive.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
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

        setupActionButtons();
        updateStudentPagination();
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
            btn.addEventListener('click', function () {
                const studentId = parseInt(this.getAttribute('data-student-id'));
                showStudentDetails(studentId);
                document.querySelectorAll('.action-dropdown').forEach(d => d.classList.remove('show'));
            });
        });

        document.addEventListener('click', function () {
            document.querySelectorAll('.action-dropdown').forEach(d => d.classList.remove('show'));
        });
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

    // Date Dropdowns
    function populateDateDropdowns() {
        const lastActiveFilter = document.getElementById('lastActiveFilter');
        const timeOfActionFilter = document.getElementById('timeOfActionFilter');

        for (let i = 2; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const formatted = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
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

    // Activity Logs Functionality
    function initializeActivityLogs() {
        filteredActivities = [...STUDENT_DATA.activityLogs];
        renderActivityTable();
        setupActivityControls();
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

        filteredActivities = STUDENT_DATA.activityLogs.filter(log => {
            const matchesSearch = String(log.logId).includes(searchTerm) ||
                String(log.studentId).includes(searchTerm) ||
                log.studentName.toLowerCase().includes(searchTerm) ||
                log.sessionType.toLowerCase().includes(searchTerm) ||
                log.sessionTag.toLowerCase().includes(searchTerm) ||
                log.deviceInfo.toLowerCase().includes(searchTerm);

            let matchesDate = true;
            if (dateFilter === 'today') {
                matchesDate = log.timeOfAction.toDateString() === new Date().toDateString();
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
                <td>${log.timeOfAction.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
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