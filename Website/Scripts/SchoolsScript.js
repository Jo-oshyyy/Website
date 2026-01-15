// School Management System - Enhanced Version
(function () {
    'use strict';

    // ============================================================================
    // SCHOOLS DATA STRUCTURE
    // ============================================================================

    const DEFAULT_SCHOOLS_DATA = {
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

    let SCHOOLS_DATA = { schools: [], barangays: [] };
    let sortDirection = {};
    let filteredData = [];
    let currentEditingSchool = null;
    let currentDeletingSchool = null;

    // ============================================================================
    // LOCAL STORAGE MANAGEMENT
    // ============================================================================

    function loadFromLocalStorage() {
        try {
            const savedSchools = localStorage.getItem('schoolsData');
            const savedBarangays = localStorage.getItem('barangaysData');

            if (savedSchools) {
                SCHOOLS_DATA.schools = JSON.parse(savedSchools);
            } else {
                SCHOOLS_DATA.schools = [...DEFAULT_SCHOOLS_DATA.schools];
                saveToLocalStorage();
            }

            if (savedBarangays) {
                SCHOOLS_DATA.barangays = JSON.parse(savedBarangays);
            } else {
                SCHOOLS_DATA.barangays = [...DEFAULT_SCHOOLS_DATA.barangays];
            }

            console.log('Data loaded from localStorage');
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            SCHOOLS_DATA = JSON.parse(JSON.stringify(DEFAULT_SCHOOLS_DATA));
        }
    }

    function saveToLocalStorage() {
        try {
            localStorage.setItem('schoolsData', JSON.stringify(SCHOOLS_DATA.schools));
            localStorage.setItem('barangaysData', JSON.stringify(SCHOOLS_DATA.barangays));
            console.log('Data saved to localStorage');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    function resetToDefaultData() {
        if (confirm('This will reset all data to default. Are you sure?')) {
            SCHOOLS_DATA = JSON.parse(JSON.stringify(DEFAULT_SCHOOLS_DATA));
            saveToLocalStorage();
            renderTable();
            setupTableEvents();
            alert('Data has been reset to default values');
        }
    }

    // Expose reset function globally for debugging
    window.resetSchoolsData = resetToDefaultData;

    // ============================================================================
    // LOADING STATE MANAGEMENT
    // ============================================================================

    function showLoading() {
        const tableBody = document.getElementById('tableBody');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px;">
                        <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #0d6efd; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <p style="margin-top: 15px; color: #6c757d;">Loading schools data...</p>
                    </td>
                </tr>
            `;
        }
    }

    function hideLoading() {
        // Loading will be replaced by renderTable()
    }

    // Add CSS for spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    document.addEventListener('DOMContentLoaded', function () {
        showLoading();
        loadFromLocalStorage();
        initializeSchoolList();
        setupEventListeners();
        hideLoading();
    });

    function initializeSchoolList() {
        populateFilters();
        renderTable();
        setupTableEvents();
    }

    function setupEventListeners() {
        // Add School Modal
        const addSchoolBtn = document.getElementById('addSchoolBtn');
        if (addSchoolBtn) {
            addSchoolBtn.addEventListener('click', openAddSchoolModal);
        }

        const addSchoolForm = document.getElementById('addSchoolForm');
        if (addSchoolForm) {
            addSchoolForm.addEventListener('submit', handleAddSchool);
        }

        const cancelAddSchool = document.getElementById('cancelAddSchool');
        if (cancelAddSchool) {
            cancelAddSchool.addEventListener('click', closeAddSchoolModal);
        }

        // Edit School Modal
        const editSchoolForm = document.getElementById('editSchoolForm');
        if (editSchoolForm) {
            editSchoolForm.addEventListener('submit', handleEditSchool);
        }

        const cancelEditSchool = document.getElementById('cancelEditSchool');
        if (cancelEditSchool) {
            cancelEditSchool.addEventListener('click', closeEditSchoolModal);
        }

        // Delete School Modal
        const confirmDeleteSchool = document.getElementById('confirmDeleteSchool');
        if (confirmDeleteSchool) {
            confirmDeleteSchool.addEventListener('click', handleDeleteSchool);
        }

        const cancelDeleteSchool = document.getElementById('cancelDeleteSchool');
        if (cancelDeleteSchool) {
            cancelDeleteSchool.addEventListener('click', closeDeleteSchoolModal);
        }

        // Close modals on overlay click
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function (e) {
                if (e.target === this) {
                    closeAllModals();
                }
            });
        }

        // Close buttons - unified approach
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
        if (!barangayFilter) return;

        // Clear existing options except "All Barangays"
        barangayFilter.innerHTML = '<option value="">All Barangays</option>';

        SCHOOLS_DATA.barangays.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            barangayFilter.appendChild(option);
        });

        barangayFilter.addEventListener('change', filterTable);

        const resetFiltersBtn = document.getElementById('resetFilters');
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', resetFilters);
        }
    }

    function renderTable(data = SCHOOLS_DATA.schools) {
        const tbody = document.getElementById('tableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: #6c757d;">
                        <p style="font-size: 18px; margin-bottom: 10px;">📚 No schools found</p>
                        <p>Click "Add New School" to get started</p>
                    </td>
                </tr>
            `;
            return;
        }

        const totalStudents = data.reduce((sum, school) => sum + school.students.length, 0);

        data.forEach(school => {
            const studentCount = school.students.length;
            const percentage = totalStudents > 0 ? ((studentCount / totalStudents) * 100).toFixed(1) : 0;

            const row = document.createElement('tr');
            row.className = 'school-row';
            row.innerHTML = `
                <td><span class="expand-icon">▶</span> ${escapeHtml(school.schoolName)}</td>
                <td>${escapeHtml(school.schoolId)}</td>
                <td>${escapeHtml(school.barangay)}</td>
                <td>${percentage}%</td>
                <td>
                    <div class="action-menu">
                        <button class="kebab-btn" aria-label="Actions">⋮</button>
                        <div class="action-dropdown">
                            <button class="action-dropdown-item" data-action="view" data-school-id="${escapeHtml(school.schoolId)}">
                                👁️ View School Details
                            </button>
                            <button class="action-dropdown-item" data-action="edit" data-school-id="${escapeHtml(school.schoolId)}">
                                ✏️ Edit School Information
                            </button>
                            <button class="action-dropdown-item danger" data-action="delete" data-school-id="${escapeHtml(school.schoolId)}">
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
                                <span class="student-name">${escapeHtml(s.name)}</span>
                                <span class="student-details">Age: ${s.age} | Gender: ${s.gender} | Status: ${s.isActive ? 'Active' : 'Inactive'}</span>
                            </div>
                        `).join('') : '<p style="color: #6c757d; text-align: center;">No students enrolled</p>'}
                    </div>
                </td>
            `;
            tbody.appendChild(detailsRow);

            // Click on school name to expand
            const firstCell = row.querySelector('td:first-child');
            if (firstCell) {
                firstCell.addEventListener('click', () => toggleStudentsList(row, detailsRow));
            }

            // Setup kebab menu with event delegation
            const kebabBtn = row.querySelector('.kebab-btn');
            const dropdown = row.querySelector('.action-dropdown');
            if (kebabBtn && dropdown) {
                kebabBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeAllDropdowns();
                    dropdown.classList.toggle('show');
                });

                // Handle action clicks
                dropdown.querySelectorAll('.action-dropdown-item').forEach(item => {
                    item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const action = item.getAttribute('data-action');
                        const schoolId = item.getAttribute('data-school-id');

                        closeAllDropdowns();

                        switch (action) {
                            case 'view':
                                viewSchoolDetails(schoolId);
                                break;
                            case 'edit':
                                openEditSchoolModal(schoolId);
                                break;
                            case 'delete':
                                openDeleteSchoolModal(schoolId);
                                break;
                        }
                    });
                });
            }
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

        const tableSearch = document.getElementById('tableSearch');
        if (tableSearch) {
            tableSearch.addEventListener('input', searchTable);
        }

        const exportTable = document.getElementById('exportTable');
        if (exportTable) {
            exportTable.addEventListener('click', exportToCSV);
        }
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
        const barangayValue = document.getElementById('barangayFilter')?.value || '';

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
        const barangayFilter = document.getElementById('barangayFilter');
        const tableSearch = document.getElementById('tableSearch');

        if (barangayFilter) barangayFilter.value = '';
        if (tableSearch) tableSearch.value = '';

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
        a.download = 'schools_data_' + new Date().toISOString().split('T')[0] + '.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    // ============================================================================
    // ADD SCHOOL MODAL
    // ============================================================================

    function openAddSchoolModal() {
        const modal = document.getElementById('addSchoolModal');
        const overlay = document.getElementById('modalOverlay');
        if (!modal || !overlay) return;

        // Populate barangay dropdown
        const barangaySelect = document.getElementById('addSchoolBarangay');
        if (barangaySelect) {
            barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
            SCHOOLS_DATA.barangays.forEach(barangay => {
                const option = document.createElement('option');
                option.value = barangay;
                option.textContent = barangay;
                barangaySelect.appendChild(option);
            });
        }

        // Reset form
        const form = document.getElementById('addSchoolForm');
        if (form) form.reset();
        clearFormErrors();

        modal.classList.add('show');
        overlay.classList.add('show');
    }

    function closeAddSchoolModal() {
        const modal = document.getElementById('addSchoolModal');
        const overlay = document.getElementById('modalOverlay');

        if (modal) modal.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        clearFormErrors();
    }

    function handleAddSchool(e) {
        e.preventDefault();
        clearFormErrors();

        const schoolName = document.getElementById('addSchoolName')?.value.trim() || '';
        const schoolId = document.getElementById('addSchoolId')?.value.trim() || '';
        const barangay = document.getElementById('addSchoolBarangay')?.value || '';

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
        saveToLocalStorage();
        renderTable();
        setupTableEvents();
        closeAddSchoolModal();

        // Show success message
        showSuccessMessage('School added successfully!');
    }

    // ============================================================================
    // EDIT SCHOOL MODAL
    // ============================================================================

    function openEditSchoolModal(schoolId) {
        closeAllDropdowns();
        const school = SCHOOLS_DATA.schools.find(s => s.schoolId === schoolId);
        if (!school) return;

        currentEditingSchool = school;

        const modal = document.getElementById('editSchoolModal');
        const overlay = document.getElementById('modalOverlay');
        if (!modal || !overlay) return;

        // Populate form
        const editSchoolName = document.getElementById('editSchoolName');
        const editSchoolId = document.getElementById('editSchoolId');

        if (editSchoolName) editSchoolName.value = school.schoolName;
        if (editSchoolId) editSchoolId.value = school.schoolId;

        const barangaySelect = document.getElementById('editSchoolBarangay');
        if (barangaySelect) {
            barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
            SCHOOLS_DATA.barangays.forEach(barangay => {
                const option = document.createElement('option');
                option.value = barangay;
                option.textContent = barangay;
                if (barangay === school.barangay) option.selected = true;
                barangaySelect.appendChild(option);
            });
        }

        clearFormErrors();
        modal.classList.add('show');
        overlay.classList.add('show');
    }

    function closeEditSchoolModal() {
        const modal = document.getElementById('editSchoolModal');
        const overlay = document.getElementById('modalOverlay');

        if (modal) modal.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        currentEditingSchool = null;
        clearFormErrors();
    }

    function handleEditSchool(e) {
        e.preventDefault();
        clearFormErrors();

        if (!currentEditingSchool) return;

        const schoolName = document.getElementById('editSchoolName')?.value.trim() || '';
        const schoolId = document.getElementById('editSchoolId')?.value.trim() || '';
        const barangay = document.getElementById('editSchoolBarangay')?.value || '';

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

        saveToLocalStorage();
        renderTable();
        setupTableEvents();
        closeEditSchoolModal();

        showSuccessMessage('School updated successfully!');
    }

    // ============================================================================
    // DELETE SCHOOL MODAL
    // ============================================================================

    function openDeleteSchoolModal(schoolId) {
        closeAllDropdowns();
        const school = SCHOOLS_DATA.schools.find(s => s.schoolId === schoolId);
        if (!school) return;

        currentDeletingSchool = school;

        const deleteSchoolName = document.getElementById('deleteSchoolName');
        if (deleteSchoolName) {
            deleteSchoolName.textContent = school.schoolName;
        }

        const modal = document.getElementById('deleteSchoolModal');
        const overlay = document.getElementById('modalOverlay');

        if (modal) modal.classList.add('show');
        if (overlay) overlay.classList.add('show');
    }

    function closeDeleteSchoolModal() {
        const modal = document.getElementById('deleteSchoolModal');
        const overlay = document.getElementById('modalOverlay');

        if (modal) modal.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        currentDeletingSchool = null;
    }

    function handleDeleteSchool() {
        if (!currentDeletingSchool) return;

        const index = SCHOOLS_DATA.schools.findIndex(s => s.schoolId === currentDeletingSchool.schoolId);
        if (index > -1) {
            SCHOOLS_DATA.schools.splice(index, 1);
            saveToLocalStorage();
            renderTable();
            setupTableEvents();
            closeDeleteSchoolModal();
            showSuccessMessage('School removed successfully!');
        }
    }

    // ============================================================================
    // VIEW SCHOOL DETAILS MODAL
    // ============================================================================

    function viewSchoolDetails(schoolId) {
        closeAllDropdowns();
        const school = SCHOOLS_DATA.schools.find(s => s.schoolId === schoolId);
        if (!school) return;

        const modal = document.getElementById('viewSchoolModal');
        const overlay = document.getElementById('modalOverlay');
        if (!modal || !overlay) return;

        // Populate details
        const viewSchoolName = document.getElementById('viewSchoolName');
        const viewSchoolIdValue = document.getElementById('viewSchoolIdValue');
        const viewSchoolBarangayValue = document.getElementById('viewSchoolBarangayValue');
        const viewSchoolStudentCount = document.getElementById('viewSchoolStudentCount');

        if (viewSchoolName) viewSchoolName.textContent = school.schoolName;
        if (viewSchoolIdValue) viewSchoolIdValue.textContent = school.schoolId;
        if (viewSchoolBarangayValue) viewSchoolBarangayValue.textContent = school.barangay;
        if (viewSchoolStudentCount) viewSchoolStudentCount.textContent = school.students.length;

        // Populate students list
        const studentsList = document.getElementById('viewSchoolStudentsList');
        if (studentsList) {
            if (school.students.length > 0) {
                studentsList.innerHTML = school.students.map(s => `
                    <div class="student-preview-item">
                        <span class="student-name">${escapeHtml(s.name)}</span>
                        <span class="student-details">Age: ${s.age} | ${s.gender === 'M' ? 'Male' : 'Female'} | ${s.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                `).join('');
            } else {
                studentsList.innerHTML = '<p style="color: #6c757d; text-align: center;">No students enrolled</p>';
            }
        }

        modal.classList.add('show');
        overlay.classList.add('show');
    }

    function closeViewSchoolModal() {
        const modal = document.getElementById('viewSchoolModal');
        const overlay = document.getElementById('modalOverlay');

        if (modal) modal.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
    }

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
        if (!field) return;

        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

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

    function showSuccessMessage(message) {
        // Simple alert for now - can be replaced with a toast notification
        alert(message);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Expose necessary functions to global scope for HTML onclick handlers
    window.viewSchoolDetails = viewSchoolDetails;
    window.closeViewSchoolModal = closeViewSchoolModal;

})();