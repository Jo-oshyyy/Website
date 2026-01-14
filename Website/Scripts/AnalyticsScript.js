// Analytics Tab Functionality
(function () {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initializeTabs();
    });

    function initializeTabs() {
        const tabHeaders = document.querySelectorAll('.tab-header');
        const tabContents = document.querySelectorAll('.tab-content');

        // Add click event to each tab header
        tabHeaders.forEach(function (header) {
            header.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });

        // Add keyboard navigation
        tabHeaders.forEach(function (header, index) {
            header.addEventListener('keydown', function (e) {
                let newIndex;

                if (e.key === 'ArrowRight') {
                    newIndex = (index + 1) % tabHeaders.length;
                    tabHeaders[newIndex].focus();
                    tabHeaders[newIndex].click();
                } else if (e.key === 'ArrowLeft') {
                    newIndex = (index - 1 + tabHeaders.length) % tabHeaders.length;
                    tabHeaders[newIndex].focus();
                    tabHeaders[newIndex].click();
                }
            });

            // Make tabs keyboard accessible
            header.setAttribute('role', 'tab');
            header.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });

        // Set ARIA attributes for accessibility
        tabContents.forEach(function (content) {
            content.setAttribute('role', 'tabpanel');
        });
    }

    function switchTab(targetTabId) {
        const tabHeaders = document.querySelectorAll('.tab-header');
        const tabContents = document.querySelectorAll('.tab-content');

        // Remove active class from all headers
        tabHeaders.forEach(function (header) {
            header.classList.remove('active');
            header.setAttribute('tabindex', '-1');
            header.setAttribute('aria-selected', 'false');
        });

        // Remove active class from all content panels
        tabContents.forEach(function (content) {
            content.classList.remove('active');
        });

        // Add active class to clicked header
        const activeHeader = document.querySelector('.tab-header[data-tab="' + targetTabId + '"]');
        if (activeHeader) {
            activeHeader.classList.add('active');
            activeHeader.setAttribute('tabindex', '0');
            activeHeader.setAttribute('aria-selected', 'true');
        }

        // Show corresponding content
        const activeContent = document.getElementById(targetTabId);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Optional: Store active tab in session storage
        try {
            sessionStorage.setItem('activeAnalyticsTab', targetTabId);
        } catch (e) {
            console.warn('Session storage not available');
        }
    }

    // Restore last active tab on page load
    function restoreActiveTab() {
        try {
            const savedTab = sessionStorage.getItem('activeAnalyticsTab');
            if (savedTab) {
                switchTab(savedTab);
            }
        } catch (e) {
            console.warn('Session storage not available');
        }
    }

    // Initialize restoration if needed
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', restoreActiveTab);
    } else {
        restoreActiveTab();
    }

    // ============================================================================
    // ANALYTICS DATA STRUCTURE - Easily replaceable with database data
    // ============================================================================

    // Sample data - Replace with API calls to your database
    const ANALYTICS_DATA = {
        demographics: [
            {
                schoolId: 1, schoolName: "Riverside Elementary", barangay: "San Juan", students: [
                    { id: 1, name: "Juan Dela Cruz", age: 12, gender: "M", isActive: true, currentStreak: 5, longestStreak: 12, initialAbility: 50, currentAbility: 75, xp: 1250 },
                    { id: 2, name: "Maria Santos", age: 11, gender: "F", isActive: true, currentStreak: 8, longestStreak: 15, initialAbility: 45, currentAbility: 80, xp: 1580 },
                    { id: 3, name: "Pedro Garcia", age: 13, gender: "M", isActive: false, currentStreak: 0, longestStreak: 8, initialAbility: 55, currentAbility: 65, xp: 890 }
                ]
            },
            {
                schoolId: 2, schoolName: "Mountainview High School", barangay: "Santa Cruz", students: [
                    { id: 4, name: "Ana Reyes", age: 15, gender: "F", isActive: true, currentStreak: 12, longestStreak: 20, initialAbility: 60, currentAbility: 90, xp: 2100 },
                    { id: 5, name: "Carlos Lopez", age: 14, gender: "M", isActive: true, currentStreak: 3, longestStreak: 10, initialAbility: 40, currentAbility: 70, xp: 1340 },
                    { id: 6, name: "Sofia Cruz", age: 16, gender: "F", isActive: true, currentStreak: 7, longestStreak: 18, initialAbility: 65, currentAbility: 95, xp: 2450 }
                ]
            },
            {
                schoolId: 3, schoolName: "Central Academy", barangay: "San Juan", students: [
                    { id: 7, name: "Miguel Torres", age: 12, gender: "M", isActive: false, currentStreak: 0, longestStreak: 5, initialAbility: 35, currentAbility: 50, xp: 650 },
                    { id: 8, name: "Isabella Ramos", age: 13, gender: "F", isActive: true, currentStreak: 15, longestStreak: 22, initialAbility: 70, currentAbility: 98, xp: 2780 },
                    { id: 9, name: "Diego Fernandez", age: 11, gender: "M", isActive: true, currentStreak: 4, longestStreak: 9, initialAbility: 48, currentAbility: 68, xp: 1120 }
                ]
            },
            {
                schoolId: 4, schoolName: "Bayside Learning Center", barangay: "Poblacion", students: [
                    { id: 10, name: "Gabriela Mendoza", age: 14, gender: "F", isActive: true, currentStreak: 10, longestStreak: 16, initialAbility: 55, currentAbility: 85, xp: 1890 },
                    { id: 11, name: "Rafael Santiago", age: 15, gender: "M", isActive: false, currentStreak: 0, longestStreak: 7, initialAbility: 42, currentAbility: 58, xp: 780 },
                    { id: 12, name: "Lucia Morales", age: 13, gender: "F", isActive: true, currentStreak: 6, longestStreak: 14, initialAbility: 52, currentAbility: 78, xp: 1450 }
                ]
            }
        ],
        loginFrequency: [
            { week: "Week 1", avgLogins: 4.2 },
            { week: "Week 2", avgLogins: 4.8 },
            { week: "Week 3", avgLogins: 5.1 },
            { week: "Week 4", avgLogins: 4.5 },
            { week: "Week 5", avgLogins: 5.3 },
            { week: "Week 6", avgLogins: 5.7 },
            { week: "Week 7", avgLogins: 5.2 },
            { week: "Week 8", avgLogins: 6.0 }
        ]
    };

    // ============================================================================
    // TAB FUNCTIONALITY
    // ============================================================================

    let currentTab = 'demographics';
    let sortDirection = {};
    let filteredData = [];

    document.addEventListener('DOMContentLoaded', function () {
        initializeTabs();
        initializeDemographics();
    });

    function initializeTabs() {
        const tabHeaders = document.querySelectorAll('.tab-header');

        tabHeaders.forEach(header => {
            header.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });
    }

    function switchTab(targetTabId) {
        const tabHeaders = document.querySelectorAll('.tab-header');
        const tabContents = document.querySelectorAll('.tab-content');

        tabHeaders.forEach(header => {
            header.classList.remove('active');
        });

        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        const activeHeader = document.querySelector(`.tab-header[data-tab="${targetTabId}"]`);
        const activeContent = document.getElementById(targetTabId);

        if (activeHeader && activeContent) {
            activeHeader.classList.add('active');
            activeContent.classList.add('active');
            currentTab = targetTabId;

            // Load tab-specific data
            if (targetTabId === 'demographics' && !document.querySelector('#demographicsTable tbody tr')) {
                initializeDemographics();
            } else if (targetTabId === 'engagement') {
                initializeEngagement();
            } else if (targetTabId === 'performance') {
                initializePerformance();
            }
        }
    }

    // ============================================================================
    // DEMOGRAPHICS TAB
    // ============================================================================

    function initializeDemographics() {
        populateFilters();
        renderTable();
        setupTableEvents();
        renderAgeBoxPlot();
        renderGenderDonut();
    }

    function populateFilters() {
        const schoolFilter = document.getElementById('schoolFilter');
        const barangayFilter = document.getElementById('barangayFilter');

        const schools = [...new Set(ANALYTICS_DATA.demographics.map(d => d.schoolName))];
        const barangays = [...new Set(ANALYTICS_DATA.demographics.map(d => d.barangay))];

        schools.forEach(school => {
            const option = document.createElement('option');
            option.value = school;
            option.textContent = school;
            schoolFilter.appendChild(option);
        });

        barangays.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            barangayFilter.appendChild(option);
        });

        schoolFilter.addEventListener('change', filterTable);
        barangayFilter.addEventListener('change', filterTable);
        document.getElementById('resetFilters').addEventListener('click', resetFilters);
    }

    function renderTable(data = ANALYTICS_DATA.demographics) {
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = '';

        const allStudents = data.flatMap(d => d.students);
        const totalStudents = allStudents.length;

        data.forEach(school => {
            const studentCount = school.students.length;
            const percentage = ((studentCount / totalStudents) * 100).toFixed(1);

            const row = document.createElement('tr');
            row.className = 'school-row';
            row.innerHTML = `
            <td><span class="expand-icon">▶</span> ${school.schoolName}</td>
            <td>${school.barangay}</td>
            <td>${studentCount}</td>
            <td>${percentage}%</td>
        `;
            tbody.appendChild(row);

            const detailsRow = document.createElement('tr');
            detailsRow.className = 'students-row hidden';
            detailsRow.innerHTML = `
            <td colspan="4">
                <div class="students-list">
                    ${school.students.map(s => `
                        <div class="student-item">
                            <span class="student-name">${s.name}</span>
                            <span class="student-details">Age: ${s.age} | Gender: ${s.gender} | Status: ${s.isActive ? 'Active' : 'Inactive'}</span>
                        </div>
                    `).join('')}
                </div>
            </td>
        `;
            tbody.appendChild(detailsRow);

            row.addEventListener('click', () => toggleStudentsList(row, detailsRow));
        });

        filteredData = data;
    }

    function toggleStudentsList(row, detailsRow) {
        const icon = row.querySelector('.expand-icon');
        detailsRow.classList.toggle('hidden');
        icon.textContent = detailsRow.classList.contains('hidden') ? '▶' : '▼';
    }

    function setupTableEvents() {
        document.querySelectorAll('th[data-sort]').forEach(th => {
            th.addEventListener('click', () => sortTable(th.getAttribute('data-sort')));
        });

        document.getElementById('tableSearch').addEventListener('input', searchTable);
        document.getElementById('exportTable').addEventListener('click', exportToCSV);
    }

    function sortTable(column) {
        sortDirection[column] = !sortDirection[column];
        let sorted = [...filteredData];

        sorted.sort((a, b) => {
            let valA, valB;
            if (column === 'schoolName') {
                valA = a.schoolName.toLowerCase();
                valB = b.schoolName.toLowerCase();
            } else if (column === 'barangay') {
                valA = a.barangay.toLowerCase();
                valB = b.barangay.toLowerCase();
            } else if (column === 'studentCount') {
                valA = a.students.length;
                valB = b.students.length;
            } else if (column === 'percentage') {
                const total = filteredData.flatMap(d => d.students).length;
                valA = (a.students.length / total) * 100;
                valB = (b.students.length / total) * 100;
            }

            if (valA < valB) return sortDirection[column] ? -1 : 1;
            if (valA > valB) return sortDirection[column] ? 1 : -1;
            return 0;
        });

        renderTable(sorted);
        setupTableEvents();
    }

    function filterTable() {
        const schoolValue = document.getElementById('schoolFilter').value;
        const barangayValue = document.getElementById('barangayFilter').value;

        let filtered = ANALYTICS_DATA.demographics;

        if (schoolValue) {
            filtered = filtered.filter(d => d.schoolName === schoolValue);
        }
        if (barangayValue) {
            filtered = filtered.filter(d => d.barangay === barangayValue);
        }

        renderTable(filtered);
        setupTableEvents();
        renderAgeBoxPlot();
        renderGenderDonut();
    }

    function searchTable(e) {
        const search = e.target.value.toLowerCase();
        const filtered = ANALYTICS_DATA.demographics.filter(d =>
            d.schoolName.toLowerCase().includes(search) ||
            d.barangay.toLowerCase().includes(search)
        );
        renderTable(filtered);
        setupTableEvents();
    }

    function resetFilters() {
        document.getElementById('schoolFilter').value = '';
        document.getElementById('barangayFilter').value = '';
        document.getElementById('tableSearch').value = '';
        renderTable();
        setupTableEvents();
        renderAgeBoxPlot();
        renderGenderDonut();
    }

    function exportToCSV() {
        const rows = [['School Name', 'Barangay', 'Student Count', '% of Total']];
        const allStudents = filteredData.flatMap(d => d.students);
        const total = allStudents.length;

        filteredData.forEach(school => {
            const percentage = ((school.students.length / total) * 100).toFixed(1);
            rows.push([school.schoolName, school.barangay, school.students.length, percentage + '%']);
        });

        const csvContent = rows.map(row => row.join(',')).join('\\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'demographics_data.csv';
        a.click();
    }

    function renderAgeBoxPlot() {
        const canvas = document.getElementById('ageBoxPlot');
        if (!canvas) return;

        const allStudents = filteredData.flatMap(d => d.students);
        const ages = allStudents.map(s => s.age).sort((a, b) => a - b);

        const stats = {
            min: Math.min(...ages),
            max: Math.max(...ages),
            avg: (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1),
            median: ages[Math.floor(ages.length / 2)]
        };

        // Age group distribution
        const ageGroups = {
            '10-12': ages.filter(a => a >= 10 && a <= 12).length,
            '13-15': ages.filter(a => a >= 13 && a <= 15).length,
            '16-18': ages.filter(a => a >= 16 && a <= 18).length
        };

        if (window.ageChart) window.ageChart.destroy();

        window.ageChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: Object.keys(ageGroups),
                datasets: [{
                    label: 'Number of Students',
                    data: Object.values(ageGroups),
                    backgroundColor: 'rgba(13, 110, 253, 0.7)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        document.getElementById('ageStats').innerHTML = `
        <div class="stat-item">Average: ${stats.avg} years</div>
        <div class="stat-item">Min: ${stats.min} | Max: ${stats.max}</div>
        <div class="stat-item">Median: ${stats.median} years</div>
    `;
    }

    function renderGenderDonut() {
        const canvas = document.getElementById('genderDonut');
        if (!canvas) return;

        const allStudents = filteredData.flatMap(d => d.students);
        const male = allStudents.filter(s => s.gender === 'M').length;
        const female = allStudents.filter(s => s.gender === 'F').length;
        const total = allStudents.length;
        const ratio = (male / female).toFixed(2);

        if (window.genderChart) window.genderChart.destroy();

        window.genderChart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female'],
                datasets: [{
                    data: [male, female],
                    backgroundColor: ['rgba(13, 110, 253, 0.7)', 'rgba(220, 53, 69, 0.7)'],
                    borderColor: ['rgba(13, 110, 253, 1)', 'rgba(220, 53, 69, 1)'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });

        document.getElementById('genderStats').innerHTML = `
        <div class="stat-item">Male: ${male} (${((male / total) * 100).toFixed(1)}%)</div>
        <div class="stat-item">Female: ${female} (${((female / total) * 100).toFixed(1)}%)</div>
        <div class="stat-item">Total: ${total}</div>
        <div class="stat-item">Ratio: ${ratio}:1 (M:F)</div>
    `;
    }

    // ============================================================================
    // ENGAGEMENT TAB
    // ============================================================================

    function initializeEngagement() {
        if (document.querySelector('#currentStreakHistogram').chart) return;
        renderCurrentStreakHistogram();
        renderLongestStreakChart();
        renderActiveDonut();
        renderLoginFrequencyLine();
    }

    function renderCurrentStreakHistogram() {
        const canvas = document.getElementById('currentStreakHistogram');
        if (!canvas || canvas.chart) return;

        const allStudents = ANALYTICS_DATA.demographics.flatMap(d => d.students);
        const streaks = allStudents.map(s => s.currentStreak);

        const bins = { '0': 0, '1-5': 0, '6-10': 0, '11-15': 0, '16+': 0 };
        streaks.forEach(s => {
            if (s === 0) bins['0']++;
            else if (s <= 5) bins['1-5']++;
            else if (s <= 10) bins['6-10']++;
            else if (s <= 15) bins['11-15']++;
            else bins['16+']++;
        });

        canvas.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: Object.keys(bins),
                datasets: [{
                    label: 'Number of Students',
                    data: Object.values(bins),
                    backgroundColor: 'rgba(25, 135, 84, 0.7)',
                    borderColor: 'rgba(25, 135, 84, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });

        const avg = (streaks.reduce((a, b) => a + b, 0) / streaks.length).toFixed(1);
        document.getElementById('streakStats').innerHTML = `
        <div class="stat-item">Average Current Streak: ${avg} days</div>
        <div class="stat-item">Highest: ${Math.max(...streaks)} days</div>
    `;
    }

    function renderLongestStreakChart() {
        const canvas = document.getElementById('longestStreakChart');
        if (!canvas || canvas.chart) return;

        const allStudents = ANALYTICS_DATA.demographics.flatMap(d => d.students);
        const longestStreaks = allStudents.map(s => s.longestStreak);

        const bins = { '0-5': 0, '6-10': 0, '11-15': 0, '16-20': 0, '21+': 0 };
        longestStreaks.forEach(s => {
            if (s <= 5) bins['0-5']++;
            else if (s <= 10) bins['6-10']++;
            else if (s <= 15) bins['11-15']++;
            else if (s <= 20) bins['16-20']++;
            else bins['21+']++;
        });

        canvas.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: Object.keys(bins),
                datasets: [{
                    label: 'Number of Students',
                    data: Object.values(bins),
                    backgroundColor: 'rgba(255, 193, 7, 0.7)',
                    borderColor: 'rgba(255, 193, 7, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });

        const avg = (longestStreaks.reduce((a, b) => a + b, 0) / longestStreaks.length).toFixed(1);
        const max = Math.max(...longestStreaks);
        document.getElementById('longestStreakStats').innerHTML = `
        <div class="stat-item">Average Longest Streak: ${avg} days</div>
        <div class="stat-item">Maximum: ${max} days</div>
    `;
    }

    function renderActiveDonut() {
        const canvas = document.getElementById('activeDonut');
        if (!canvas || canvas.chart) return;

        const allStudents = ANALYTICS_DATA.demographics.flatMap(d => d.students);
        const active = allStudents.filter(s => s.isActive).length;
        const inactive = allStudents.length - active;

        canvas.chart = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Inactive'],
                datasets: [{
                    data: [active, inactive],
                    backgroundColor: ['rgba(25, 135, 84, 0.7)', 'rgba(108, 117, 125, 0.7)'],
                    borderColor: ['rgba(25, 135, 84, 1)', 'rgba(108, 117, 125, 1)'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });

        document.getElementById('activeStats').innerHTML = `
        <div class="stat-item">Active: ${active} (${((active / allStudents.length) * 100).toFixed(1)}%)</div>
        <div class="stat-item">Inactive: ${inactive} (${((inactive / allStudents.length) * 100).toFixed(1)}%)</div>
    `;
    }

    function renderLoginFrequencyLine() {
        const canvas = document.getElementById('loginFrequencyLine');
        if (!canvas || canvas.chart) return;

        canvas.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ANALYTICS_DATA.loginFrequency.map(d => d.week),
                datasets: [{
                    label: 'Avg Logins per Student',
                    data: ANALYTICS_DATA.loginFrequency.map(d => d.avgLogins),
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    borderColor: 'rgba(13, 110, 253, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });

        const avgAll = (ANALYTICS_DATA.loginFrequency.reduce((a, b) => a + b.avgLogins, 0) / ANALYTICS_DATA.loginFrequency.length).toFixed(1);
        document.getElementById('loginStats').innerHTML = `
        <div class="stat-item">Overall Average: ${avgAll} logins/week</div>
        <div class="stat-item">Trend: ${ANALYTICS_DATA.loginFrequency[ANALYTICS_DATA.loginFrequency.length - 1].avgLogins > ANALYTICS_DATA.loginFrequency[0].avgLogins ? '📈 Increasing' : '📉 Decreasing'}</div>
    `;
    }

    // ============================================================================
    // PERFORMANCE TAB
    // ============================================================================

    function initializePerformance() {
        if (document.querySelector('#abilityGrowthArea').chart) return;
        renderAbilityGrowthArea();
        renderXPHistogram();
    }

    function renderAbilityGrowthArea() {
        const canvas = document.getElementById('abilityGrowthArea');
        if (!canvas || canvas.chart) return;

        const allStudents = ANALYTICS_DATA.demographics.flatMap(d => d.students);
        const initialAvg = (allStudents.reduce((a, b) => a + b.initialAbility, 0) / allStudents.length).toFixed(1);
        const currentAvg = (allStudents.reduce((a, b) => a + b.currentAbility, 0) / allStudents.length).toFixed(1);
        const improvement = (currentAvg - initialAvg).toFixed(1);

        canvas.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Initial', 'Current'],
                datasets: [{
                    label: 'Average Ability Score',
                    data: [initialAvg, currentAvg],
                    backgroundColor: 'rgba(111, 66, 193, 0.2)',
                    borderColor: 'rgba(111, 66, 193, 1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });

        document.getElementById('abilityStats').innerHTML = `
        <div class="stat-item">Initial Average: ${initialAvg}</div>
        <div class="stat-item">Current Average: ${currentAvg}</div>
        <div class="stat-item">Average Improvement: +${improvement} points</div>
        <div class="stat-item">Growth Rate: ${((improvement / initialAvg) * 100).toFixed(1)}%</div>
    `;
    }

    function renderXPHistogram() {
        const canvas = document.getElementById('xpHistogram');
        if (!canvas || canvas.chart) return;

        const allStudents = ANALYTICS_DATA.demographics.flatMap(d => d.students);
        const xpValues = allStudents.map(s => s.xp);

        const bins = { '0-500': 0, '501-1000': 0, '1001-1500': 0, '1501-2000': 0, '2001+': 0 };
        xpValues.forEach(xp => {
            if (xp <= 500) bins['0-500']++;
            else if (xp <= 1000) bins['501-1000']++;
            else if (xp <= 1500) bins['1001-1500']++;
            else if (xp <= 2000) bins['1501-2000']++;
            else bins['2001+']++;
        });

        canvas.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: Object.keys(bins),
                datasets: [{
                    label: 'Number of Students',
                    data: Object.values(bins),
                    backgroundColor: 'rgba(13, 202, 240, 0.7)',
                    borderColor: 'rgba(13, 202, 240, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });

        const avgXP = (xpValues.reduce((a, b) => a + b, 0) / xpValues.length).toFixed(0);
        const maxXP = Math.max(...xpValues);
        const minXP = Math.min(...xpValues);

        document.getElementById('xpStats').innerHTML = `
        <div class="stat-item">Average XP: ${avgXP}</div>
        <div class="stat-item">Highest XP: ${maxXP}</div>
        <div class="stat-item">Lowest XP: ${minXP}</div>
    `;
    }

})();