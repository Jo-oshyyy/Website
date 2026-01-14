// School Management System
(function () {
    'use strict';

    // ============================================================================
    // SCHOOLS DATA STRUCTURE
    // ============================================================================

    const SCHOOLS_DATA = {
        schools: [
            {
                schoolId: "SCH001",
                schoolName: "Riverside Elementary",
                barangay: "San Juan",
                students: [
                    { id: 1, name: "Juan Dela Cruz", age: 12, gender: "M", isActive: true },
                    { id: 2, name: "Maria Santos", age: 11, gender: "F", isActive: true },
                    { id: 3, name: "Pedro Garcia", age: 13, gender: "M", isActive: false }
                ]
            },
            {
                schoolId: "SCH002",
                schoolName: "Mountainview High School",
                barangay: "Santa Cruz",
                students: [
                    { id: 4, name: "Ana Reyes", age: 15, gender: "F", isActive: true },
                    { id: 5, name: "Carlos Lopez", age: 14, gender: "M", isActive: true },
                    { id: 6, name: "Sofia Cruz", age: 16, gender: "F", isActive: true }
                ]
            },
            {
                schoolId: "SCH003",
                schoolName: "Central Academy",
                barangay: "San Juan",
                students: [
                    { id: 7, name: "Miguel Torres", age: 12, gender: "M", isActive: false },
                    { id: 8, name: "Isabella Ramos", age: 13, gender: "F", isActive: true },
                    { id: 9, name: "Diego Fernandez", age: 11, gender: "M", isActive: true }
                ]
            },
            {
                schoolId: "SCH004",
                schoolName: "Bayside Learning Center",
                barangay: "Poblacion",
                students: [
                    { id: 10, name: "Gabriela Mendoza", age: 14, gender: "F", isActive: true },
                    { id: 11, name: "Rafael Santiago", age: 15, gender: "M", isActive: false },
                    { id: 12, name: "Lucia Morales", age: 13, gender: "F", isActive: true }
                ]
            }
        ],
        barangays: ["San Juan", "Santa Cruz", "Poblacion", "San Pedro", "Bagong Silang"]
    };

    let sortDirection = {};
    let filteredData = [];
    let currentEditingSchool = null;
    let currentDeletingSchool = null;

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    document.addEventListener('DOMContentLoaded', function () {
        initializeSchoolList();
        setupEventListeners();
    });

    function initializeSchoolList() {
        populateFilters();
        renderTable();
        setupTableEvents();
    }

    function setupEventListeners() {
        // Add School Modal
        document.getElementById('addSchoolBtn')?.addEventListener('click', openAddSchoolModal);
        document.getElementById('addSchoolForm')?.addEventListener('submit', handleAddSchool);
        document.getElementById('cancelAddSchool')?.addEventListener('click', closeAddSchoolModal);

        // Edit School Modal
        document.getElementById('editSchoolForm')?.addEventListener('submit', handleEditSchool);
        document.getElementById('cancelEditSchool')?.addEventListener('click', closeEditSchoolModal);

        // Delete School Modal
        document.getElementById('confirmDeleteSchool')?.addEventListener('click', handleDeleteSchool);
        document.getElementById('cancelDeleteSchool')?.addEventListener('click', closeDeleteSchoolModal);

        // Close modals on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function (e) {
                if (e.target === this) {
                    closeAllModals();
                }
            });
        });

        // Close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.action-menu')) {
                closeAllDropdowns();
            }
        });
    }

    // ============================================================================
    // FILTERS AND TABLE
    // ============================================================================

    function populateFilters() {
        const barangayFilter = document.getElementById('barangayFilter');

        SCHOOLS_DATA.barangays.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            barangayFilter.appendChild(option);
        });

        barangayFilter.addEventListener('change', filterTable);
        document.getElementById('resetFilters')?.addEventListener('click', resetFilters);
    }

    function renderTable(data = SCHOOLS_DATA.schools) {
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = '';

        const totalStudents = data.reduce((sum, school) => sum + school.students.length, 0);

        data.forEach(school => {
            const studentCount = school.students.length;
            const percentage = totalStudents > 0 ? ((studentCount / totalStudents) * 100).toFixed(1) : 0;

            const row = document.createElement('tr');
            row.className = 'school-row';
            row.innerHTML = `
                <td><span class="expand-icon">▶</span> ${school.schoolName}</td>
                <td>${school.schoolId}</td>
                <td>${school.barangay}</td>
                <td>${percentage}%</td>
                <td>
                    <div class="action-menu">
                        <button class="kebab-btn" aria-label="Actions">⋮</button>
                        <div class="action-dropdown">
                            <button class="action-dropdown-item" onclick="viewSchoolDetails('${school.schoolId}')">
                                👁️ View School Details
                            </button>
                            <button class="action-dropdown-item" onclick="openEditSchoolModal('${school.schoolId}')">
                                ✏️ Edit School Information
                            </button>
                            <button class="action-dropdown-item danger" onclick="openDeleteSchoolModal('${school.schoolId}')">
                                🗑️ Remove School
                            </button>
                        </div>
                    </div>
                </td>
            `;
            tbody.appendChild(row);

            // Details row for students
            const detailsRow = document.createElement('tr');
            detailsRow.className = 'students-row hidden';
            detailsRow.innerHTML = `
                <td colspan="5">
                    <div class="students-list">
                        ${school.students.length > 0 ? school.students.map(s => `
                            <div class="student-item">
                                <span class="student-name">${s.name}</span>
                                <span class="student-details">Age: ${s.age} | Gender: ${s.gender} | Status: ${s.isActive ? 'Active' : 'Inactive'}</span>
                            </div>
                        `).join('') : '<p style="color: #6c757d; text-align: center;">No students enrolled</p>'}
                    </div>
                </td>
            `;
            tbody.appendChild(detailsRow);

            // Click on school name to expand
            row.querySelector('td:first-child').addEventListener('click', () => toggleStudentsList(row, detailsRow));

            // Setup kebab menu
            const kebabBtn = row.querySelector('.kebab-btn');
            const dropdown = row.querySelector('.action-dropdown');
            kebabBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAllDropdowns();
                dropdown.classList.toggle('show');
            });
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

        document.getElementById('tableSearch')?.addEventListener('input', searchTable);
        document.getElementById('exportTable')?.addEventListener('click', exportToCSV);
    }

    function sortTable(column) {
        sortDirection[column] = !sortDirection[column];
        let sorted = [...filteredData];

        sorted.sort((a, b) => {
            let valA, valB;
            if (column === 'schoolName') {
                valA = a.schoolName.toLowerCase();
                valB = b.schoolName.toLowerCase();
            } else if (column === 'schoolId') {
                valA = a.schoolId.toLowerCase();
                valB = b.schoolId.toLowerCase();
            } else if (column === 'barangay') {
                valA = a.barangay.toLowerCase();
                valB = b.barangay.toLowerCase();
            } else if (column === 'percentage') {
                const total = filteredData.reduce((sum, d) => sum + d.students.length, 0);
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
        const barangayValue = document.getElementById('barangayFilter').value;

        let filtered = SCHOOLS_DATA.schools;

        if (barangayValue) {
            filtered = filtered.filter(d => d.barangay === barangayValue);
        }

        renderTable(filtered);
        setupTableEvents();
    }

    function searchTable(e) {
        const search = e.target.value.toLowerCase();
        const filtered = SCHOOLS_DATA.schools.filter(d =>
            d.schoolName.toLowerCase().includes(search) ||
            d.schoolId.toLowerCase().includes(search) ||
            d.barangay.toLowerCase().includes(search)
        );
        renderTable(filtered);
        setupTableEvents();
    }

    function resetFilters() {
        document.getElementById('barangayFilter').value = '';
        document.getElementById('tableSearch').value = '';
        renderTable();
        setupTableEvents();
    }

    function exportToCSV() {
        const rows = [['School Name', 'School ID', 'Barangay', 'Student Count', '% of Total']];
        const totalStudents = filteredData.reduce((sum, d) => sum + d.students.length, 0);

        filteredData.forEach(school => {
            const percentage = ((school.students.length / totalStudents) * 100).toFixed(1);
            rows.push([school.schoolName, school.schoolId, school.barangay, school.students.length, percentage + '%']);
        });

        const csvContent = rows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schools_data.csv';
        a.click();
    }

    // ============================================================================
    // ADD SCHOOL MODAL
    // ============================================================================

    function openAddSchoolModal() {
        const modal = document.getElementById('addSchoolModal');
        const overlay = document.getElementById('modalOverlay');

        // Populate barangay dropdown
        const barangaySelect = document.getElementById('addSchoolBarangay');
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
        SCHOOLS_DATA.barangays.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            barangaySelect.appendChild(option);
        });

        // Reset form
        document.getElementById('addSchoolForm').reset();
        clearFormErrors();

        modal.classList.add('show');
        overlay.classList.add('show');
    }

    function closeAddSchoolModal() {
        document.getElementById('addSchoolModal').classList.remove('show');
        document.getElementById('modalOverlay').classList.remove('show');
        clearFormErrors();
    }

    function handleAddSchool(e) {
        e.preventDefault();
        clearFormErrors();

        const schoolName = document.getElementById('addSchoolName').value.trim();
        const schoolId = document.getElementById('addSchoolId').value.trim();
        const barangay = document.getElementById('addSchoolBarangay').value;

        // Validation
        let hasError = false;

        if (!schoolName) {
            showFieldError('addSchoolName', 'School name is required');
            hasError = true;
        }

        if (!schoolId) {
            showFieldError('addSchoolId', 'School ID is required');
            hasError = true;
        } else if (SCHOOLS_DATA.schools.some(s => s.schoolId === schoolId)) {
            showFieldError('addSchoolId', 'School ID already exists');
            hasError = true;
        }

        if (!barangay) {
            showFieldError('addSchoolBarangay', 'Barangay is required');
            hasError = true;
        }

        if (hasError) return;

        // Add school
        const newSchool = {
            schoolId: schoolId,
            schoolName: schoolName,
            barangay: barangay,
            students: []
        };

        SCHOOLS_DATA.schools.push(newSchool);
        renderTable();
        setupTableEvents();
        closeAddSchoolModal();

        // Show success message
        alert('School added successfully!');
    }

    // ============================================================================
    // EDIT SCHOOL MODAL
    // ============================================================================

    window.openEditSchoolModal = function (schoolId) {
        closeAllDropdowns();
        const school = SCHOOLS_DATA.schools.find(s => s.schoolId === schoolId);
        if (!school) return;

        currentEditingSchool = school;

        const modal = document.getElementById('editSchoolModal');
        const overlay = document.getElementById('modalOverlay');

        // Populate form
        document.getElementById('editSchoolName').value = school.schoolName;
        document.getElementById('editSchoolId').value = school.schoolId;

        const barangaySelect = document.getElementById('editSchoolBarangay');
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
        SCHOOLS_DATA.barangays.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            if (barangay === school.barangay) option.selected = true;
            barangaySelect.appendChild(option);
        });

        clearFormErrors();
        modal.classList.add('show');
        overlay.classList.add('show');
    };

    function closeEditSchoolModal() {
        document.getElementById('editSchoolModal').classList.remove('show');
        document.getElementById('modalOverlay').classList.remove('show');
        currentEditingSchool = null;
        clearFormErrors();
    }

    function handleEditSchool(e) {
        e.preventDefault();
        clearFormErrors();

        if (!currentEditingSchool) return;

        const schoolName = document.getElementById('editSchoolName').value.trim();
        const schoolId = document.getElementById('editSchoolId').value.trim();
        const barangay = document.getElementById('editSchoolBarangay').value;

        // Validation
        let hasError = false;

        if (!schoolName) {
            showFieldError('editSchoolName', 'School name is required');
            hasError = true;
        }

        if (!schoolId) {
            showFieldError('editSchoolId', 'School ID is required');
            hasError = true;
        } else if (schoolId !== currentEditingSchool.schoolId &&
            SCHOOLS_DATA.schools.some(s => s.schoolId === schoolId)) {
            showFieldError('editSchoolId', 'School ID already exists');
            hasError = true;
        }

        if (!barangay) {
            showFieldError('editSchoolBarangay', 'Barangay is required');
            hasError = true;
        }

        if (hasError) return;

        // Update school
        currentEditingSchool.schoolName = schoolName;
        currentEditingSchool.schoolId = schoolId;
        currentEditingSchool.barangay = barangay;

        renderTable();
        setupTableEvents();
        closeEditSchoolModal();

        alert('School updated successfully!');
    }

    // ============================================================================
    // DELETE SCHOOL MODAL
    // ============================================================================

    window.openDeleteSchoolModal = function (schoolId) {
        closeAllDropdowns();
        const school = SCHOOLS_DATA.schools.find(s => s.schoolId === schoolId);
        if (!school) return;

        currentDeletingSchool = school;

        document.getElementById('deleteSchoolName').textContent = school.schoolName;

        const modal = document.getElementById('deleteSchoolModal');
        const overlay = document.getElementById('modalOverlay');

        modal.classList.add('show');
        overlay.classList.add('show');
    };

    function closeDeleteSchoolModal() {
        document.getElementById('deleteSchoolModal').classList.remove('show');
        document.getElementById('modalOverlay').classList.remove('show');
        currentDeletingSchool = null;
    }

    function handleDeleteSchool() {
        if (!currentDeletingSchool) return;

        const index = SCHOOLS_DATA.schools.findIndex(s => s.schoolId === currentDeletingSchool.schoolId);
        if (index > -1) {
            SCHOOLS_DATA.schools.splice(index, 1);
            renderTable();
            setupTableEvents();
            closeDeleteSchoolModal();
            alert('School removed successfully!');
        }
    }

    // ============================================================================
    // VIEW SCHOOL DETAILS MODAL
    // ============================================================================

    window.viewSchoolDetails = function (schoolId) {
        closeAllDropdowns();
        const school = SCHOOLS_DATA.schools.find(s => s.schoolId === schoolId);
        if (!school) return;

        const modal = document.getElementById('viewSchoolModal');
        const overlay = document.getElementById('modalOverlay');

        // Populate details
        document.getElementById('viewSchoolName').textContent = school.schoolName;
        document.getElementById('viewSchoolIdValue').textContent = school.schoolId;
        document.getElementById('viewSchoolBarangayValue').textContent = school.barangay;
        document.getElementById('viewSchoolStudentCount').textContent = school.students.length;

        // Populate students list
        const studentsList = document.getElementById('viewSchoolStudentsList');
        if (school.students.length > 0) {
            studentsList.innerHTML = school.students.map(s => `
                <div class="student-preview-item">
                    <span class="student-name">${s.name}</span>
                    <span class="student-details">Age: ${s.age} | ${s.gender === 'M' ? 'Male' : 'Female'} | ${s.isActive ? 'Active' : 'Inactive'}</span>
                </div>
            `).join('');
        } else {
            studentsList.innerHTML = '<p style="color: #6c757d; text-align: center;">No students enrolled</p>';
        }

        modal.classList.add('show');
        overlay.classList.add('show');
    };

    function closeViewSchoolModal() {
        document.getElementById('viewSchoolModal').classList.remove('show');
        document.getElementById('modalOverlay').classList.remove('show');
    }

    window.closeViewSchoolModal = closeViewSchoolModal;

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('show'));
        document.querySelectorAll('.modal-overlay').forEach(overlay => overlay.classList.remove('show'));
        currentEditingSchool = null;
        currentDeletingSchool = null;
        clearFormErrors();
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.action-dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');

        field.classList.add('error');

        let errorDiv = formGroup.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            formGroup.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function clearFormErrors() {
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }

})();