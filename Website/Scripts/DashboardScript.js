// Dashboard Script
(function () {
    'use strict';

    // Sample data - Replace with API calls to your database
    const DASHBOARD_DATA = {
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

    // Initialize dashboard when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initializeDashboard();
    });

    function initializeDashboard() {
        updateMetricCards();
        renderDemographicsCharts();
        renderEngagementCharts();
        renderPerformanceCharts();
        renderRecentActivity();
    }

    // Update metric cards
    function updateMetricCards() {
        const allStudents = DASHBOARD_DATA.demographics.flatMap(d => d.students);
        const totalStudents = allStudents.length;
        const activeStudents = allStudents.filter(s => s.isActive).length;
        const totalSchools = DASHBOARD_DATA.demographics.length;
        const avgXP = Math.round(allStudents.reduce((sum, s) => sum + s.xp, 0) / totalStudents);

        document.getElementById('totalStudents').textContent = totalStudents;
        document.getElementById('studentChange').textContent = '+12.5%';

        document.getElementById('totalSchools').textContent = totalSchools;
        document.getElementById('schoolLabel').textContent = 'Active';

        document.getElementById('activeStudents').textContent = activeStudents;
        document.getElementById('activeRate').textContent = `${((activeStudents / totalStudents) * 100).toFixed(1)}%`;

        document.getElementById('avgXP').textContent = avgXP.toLocaleString();
        document.getElementById('xpGrowth').textContent = '+15.3%';
    }

    // Demographics Charts
    function renderDemographicsCharts() {
        renderGenderChart();
        renderAgeGroupsChart();
        renderSchoolChart();
    }

    function renderGenderChart() {
        const canvas = document.getElementById('dashGenderChart');
        const allStudents = DASHBOARD_DATA.demographics.flatMap(d => d.students);
        const male = allStudents.filter(s => s.gender === 'M').length;
        const female = allStudents.filter(s => s.gender === 'F').length;

        new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female'],
                datasets: [{
                    data: [male, female],
                    backgroundColor: ['rgba(13, 110, 253, 0.8)', 'rgba(220, 53, 69, 0.8)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    function renderAgeGroupsChart() {
        const canvas = document.getElementById('dashAgeChart');
        const allStudents = DASHBOARD_DATA.demographics.flatMap(d => d.students);
        const ages = allStudents.map(s => s.age);

        const ageGroups = {
            '10-12': ages.filter(a => a >= 10 && a <= 12).length,
            '13-15': ages.filter(a => a >= 13 && a <= 15).length,
            '16-18': ages.filter(a => a >= 16 && a <= 18).length
        };

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: Object.keys(ageGroups),
                datasets: [{
                    label: 'Students',
                    data: Object.values(ageGroups),
                    backgroundColor: 'rgba(111, 66, 193, 0.8)',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    function renderSchoolChart() {
        const canvas = document.getElementById('dashSchoolChart');
        const schoolData = DASHBOARD_DATA.demographics.map(d => ({
            name: d.schoolName.split(' ')[0], // Short name
            count: d.students.length
        }));

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: schoolData.map(s => s.name),
                datasets: [{
                    label: 'Students',
                    data: schoolData.map(s => s.count),
                    backgroundColor: 'rgba(13, 202, 240, 0.8)',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // Engagement Charts
    function renderEngagementCharts() {
        renderLoginChart();
        renderActiveChart();
        updateEngagementStats();
    }

    function renderLoginChart() {
        const canvas = document.getElementById('dashLoginChart');

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: DASHBOARD_DATA.loginFrequency.map(d => d.week),
                datasets: [{
                    label: 'Avg Logins',
                    data: DASHBOARD_DATA.loginFrequency.map(d => d.avgLogins),
                    backgroundColor: 'rgba(25, 135, 84, 0.2)',
                    borderColor: 'rgba(25, 135, 84, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2.5,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    function renderActiveChart() {
        const canvas = document.getElementById('dashActiveChart');
        const allStudents = DASHBOARD_DATA.demographics.flatMap(d => d.students);
        const active = allStudents.filter(s => s.isActive).length;
        const inactive = allStudents.length - active;

        new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['Active', 'Inactive'],
                datasets: [{
                    data: [active, inactive],
                    backgroundColor: ['rgba(25, 135, 84, 0.8)', 'rgba(108, 117, 125, 0.8)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    function updateEngagementStats() {
        const allStudents = DASHBOARD_DATA.demographics.flatMap(d => d.students);
        const avgStreak = (allStudents.reduce((sum, s) => sum + s.currentStreak, 0) / allStudents.length).toFixed(1);
        const maxStreak = Math.max(...allStudents.map(s => s.longestStreak));
        const dailyActive = allStudents.filter(s => s.isActive && s.currentStreak > 0).length;

        document.getElementById('avgStreak').textContent = `${avgStreak} days`;
        document.getElementById('maxStreak').textContent = `${maxStreak} days`;
        document.getElementById('dailyActive').textContent = dailyActive;
    }

    // Performance Charts
    function renderPerformanceCharts() {
        renderAbilityChart();
        renderXPChart();
        updatePerformanceStats();
    }

    function renderAbilityChart() {
        const canvas = document.getElementById('dashAbilityChart');
        const allStudents = DASHBOARD_DATA.demographics.flatMap(d => d.students);
        const initialAvg = (allStudents.reduce((sum, s) => sum + s.initialAbility, 0) / allStudents.length).toFixed(1);
        const currentAvg = (allStudents.reduce((sum, s) => sum + s.currentAbility, 0) / allStudents.length).toFixed(1);

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Initial', 'Current'],
                datasets: [{
                    label: 'Ability Score',
                    data: [initialAvg, currentAvg],
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    borderColor: 'rgba(255, 193, 7, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2.5,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }

    function renderXPChart() {
        const canvas = document.getElementById('dashXPChart');
        const allStudents = DASHBOARD_DATA.demographics.flatMap(d => d.students);
        const xpValues = allStudents.map(s => s.xp);

        const bins = {
            '0-1000': xpValues.filter(xp => xp <= 1000).length,
            '1001-2000': xpValues.filter(xp => xp > 1000 && xp <= 2000).length,
            '2001+': xpValues.filter(xp => xp > 2000).length
        };

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: Object.keys(bins),
                datasets: [{
                    label: 'Students',
                    data: Object.values(bins),
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: window.innerWidth < 768 ? 1.5 : 2,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    function updatePerformanceStats() {
        const allStudents = DASHBOARD_DATA.demographics.flatMap(d => d.students);
        const currentAvg = (allStudents.reduce((sum, s) => sum + s.currentAbility, 0) / allStudents.length).toFixed(1);
        const initialAvg = (allStudents.reduce((sum, s) => sum + s.initialAbility, 0) / allStudents.length).toFixed(1);
        const improvement = (currentAvg - initialAvg).toFixed(1);
        const growthRate = ((improvement / initialAvg) * 100).toFixed(1);

        document.getElementById('avgAbility').textContent = currentAvg;
        document.getElementById('avgImprovement').textContent = `+${improvement} pts`;
        document.getElementById('growthRate').textContent = `${growthRate}%`;
    }

    // Recent Activity
    function renderRecentActivity() {
        const activities = [
            { icon: '🎯', title: 'New Milestone Reached', desc: 'Isabella Ramos achieved 2780 XP', time: '2 hours ago' },
            { icon: '🔥', title: 'Longest Streak', desc: 'Ana Reyes maintained 12-day streak', time: '5 hours ago' },
            { icon: '📚', title: 'Course Completed', desc: '3 students completed Math Module', time: '1 day ago' },
            { icon: '⭐', title: 'Top Performer', desc: 'Carlos Lopez improved by 30 points', time: '1 day ago' },
            { icon: '👥', title: 'New Students', desc: '5 new students joined this week', time: '2 days ago' }
        ];

        const container = document.getElementById('activityList');
        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <h5>${activity.title}</h5>
                    <p>${activity.desc}</p>
                </div>
                <span class="activity-time">${activity.time}</span>
            </div>
        `).join('');
    }

})();