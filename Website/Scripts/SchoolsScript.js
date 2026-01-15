// School Management System - Refactored Version
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
    // DOM ELEMENT CACHE
    // ============================================================================

    const elements = {
        tableBody: null,
        barangayFilter: null,
        tableSearch: null,
        modalOverlay: null,
        // Initialize on DOMContentLoaded
    };

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

    window.resetSchoolsData = resetToDefaultData;

    // ============================================================================
    // LOADING STATE MANAGEMENT
    // ============================================================================

    function showLoading() {
        if (elements.tableBody) {
            elements.tableBody.innerHTML = '';
            const loadingRow = createLoadingRow();
            elements.tableBody.appendChild(loadingRow);
        }
    }

    function createLoadingRow() {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 5;
        td.className = 'loading-cell';

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';

        const text = document.createElement('p');
        text.className = 'loading-text';
        text.textContent = 'Loading schools data...';

        td.appendChild(spinner);
        td.appendChild(text);
        tr.appendChild(td);

        return tr;
    }

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    document.addEventListener('DOMContentLoaded', function () {
        cacheElements();
        showLoading();
        loadFromLocalStorage();
        initializeSchoolList();
        setupEventListeners();
    });

    function cacheElements() {
        elements.tableBody = document.getElementById('tableBody');
        elements.barangayFilter = document.getElementById('barangayFilter');
        elements.tableSearch = document.getElementById('tableSearch');
        elements.modalOverlay = document.getElementById('modalOverlay');
    }

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
        if (elements.modalOverlay) {
            elements.modalOverlay.addEventListener('click', function (e) {
                if (e.target === this) {
                    closeAllModals();
                }
            });
        }

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
        if (!elements.barangayFilter) return;

        elements.barangayFilter.innerHTML = '<option value="">All Barangays</option>';

        SCHOOLS_DATA.barangays.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            elements.barangayFilter.appendChild(option);
        });

        elements.barangayFilter.addEventListener('change', filterTable);

        const resetFiltersBtn = document.getElementById('resetFilters');
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', resetFilters);
        }
    }

    function renderTable(data = SCHOOLS_DATA.schools) {
        if (!elements.tableBody) return;

        elements.tableBody.innerHTML = '';

        if (data.length === 0) {
            const emptyRow = createEmptyStateRow();
            elements.tableBody.appendChild(emptyRow);
            return;
        }

        const totalStudents = data.reduce((sum, school) => sum + school.students.length, 0);

        data.forEach(school => {
            const studentCount = school.students.length;
            const percentage = totalStudents > 0 ? ((studentCount / totalStudents) * 100).toFixed(1) : 0;

            const schoolRow = createSchoolRow(school, percentage);
            const detailsRow = createDetailsRow(school);

            elements.tableBody.appendChild(schoolRow);
            elements.tableBody.appendChild(detailsRow);

            setupSchoolRowEvents(schoolRow, detailsRow, school);
        });

        filteredData = data;
    }

    function createEmptyStateRow() {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 5;
        td.className = 'empty-state-cell';

        const icon = document.createElement('p');
        icon.className = 'empty-state-icon';
        icon.textContent = '📚 No schools found';

        const text = document.createElement('p');
        text.textContent = 'Click "Add New School" to get started';

        td.appendChild(icon);
        td.appendChild(text);
        tr.appendChild(td);

        return tr;
    }

    function createSchoolRow(school, percentage) {
        const tr = document.createElement('tr');
        tr.className = 'school-row';

        // School Name Cell
        const nameCell = document.createElement('td');
        const expandIcon = document.createElement('span');
        expandIcon.className = 'expand-icon';
        expandIcon.textContent = '▶';
        nameCell.appendChild(expandIcon);
        nameCell.appendChild(document.createTextNode(' ' + school.schoolName));

        // School ID Cell
        const idCell = document.createElement('td');
        idCell.textContent = school.schoolId;

        // Barangay Cell
        const barangayCell = document.createElement('td');
        barangayCell.textContent = school.barangay;

        // Percentage Cell
        const percentageCell = document.createElement('td');
        percentageCell.textContent = percentage + '%';

        // Actions Cell
        const actionsCell = createActionsCell(school.schoolId);

        tr.appendChild(nameCell);
        tr.appendChild(idCell);
        tr.appendChild(barangayCell);
        tr.appendChild(percentageCell);
        tr.appendChild(actionsCell);

        return tr;
    }

    function createActionsCell(schoolId) {
        const td = document.createElement('td');
        const actionMenu = document.createElement('div');
        actionMenu.className = 'action-menu';

        const kebabBtn = document.createElement('button');
        kebabBtn.className = 'kebab-btn';
        kebabBtn.setAttribute('aria-label', 'Actions');
        kebabBtn.textContent = '⋮';

        const dropdown = document.createElement('div');
        dropdown.className = 'action-dropdown';

        const viewBtn = createActionButton('view', schoolId, '👁️ View School Details');
        const editBtn = createActionButton('edit', schoolId, '✏️ Edit School Information');
        const deleteBtn = createActionButton('delete', schoolId, '🗑️ Remove School', true);

        dropdown.appendChild(viewBtn);
        dropdown.appendChild(editBtn);
        dropdown.appendChild(deleteBtn);

        actionMenu.appendChild(kebabBtn);
        actionMenu.appendChild(dropdown);
        td.appendChild(actionMenu);

        return td;
    }

    function createActionButton(action, schoolId, text, isDanger = false) {
        const btn = document.createElement('button');
        btn.className = 'action-dropdown-item' + (isDanger ? ' danger' : '');
        btn.setAttribute('data-action', action);
        btn.setAttribute('data-school-id', schoolId);
        btn.textContent = text;
        return btn;
    }

    function createDetailsRow(school) {
        const tr = document.createElement('tr');
        tr.className = 'students-row hidden';

        const td = document.createElement('td');
        td.colSpan = 5;

        const studentsList = document.createElement('div');
        studentsList.className = 'students-list';

        if (school.students.length > 0) {
            school.students.forEach(student => {
                const studentItem = createStudentItem(student);
                studentsList.appendChild(studentItem);
            });
        } else {
            const noStudents = document.createElement('p');
            noStudents.className = 'no-students-text';
            noStudents.textContent = 'No students enrolled';
            studentsList.appendChild(noStudents);
        }

        td.appendChild(studentsList);
        tr.appendChild(td);

        return tr;
    }

    function createStudentItem(student) {
        const div = document.createElement('div');
        div.className = 'student-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'student-name';
        nameSpan.textContent = student.name;

        const detailsSpan = document.createElement('span');
        detailsSpan.className = 'student-details';
        detailsSpan.textContent = `Age: ${student.age} | Gender: ${student.gender} | Status: ${student.isActive ? 'Active' : 'Inactive'}`;

        div.appendChild(nameSpan);
        div.appendChild(detailsSpan);

        return div;
    }

    function setupSchoolRowEvents(row, detailsRow, school) {
        // Click on school name to expand
        const firstCell = row.querySelector('td:first-child');
        if (firstCell) {
            firstCell.addEventListener('click', () => toggleStudentsList(row, detailsRow));
        }

        // Setup kebab menu
        const kebabBtn = row.querySelector('.kebab-btn');
        const dropdown = row.querySelector('.action-dropdown');

        if (kebabBtn && dropdown) {
            kebabBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAllDropdowns();
                dropdown.classList.toggle('show');
            });

            dropdown.querySelectorAll('.action-dropdown-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = item.getAttribute('data-action');
                    const schoolId = item.getAttribute('data-school-id');

                    closeAllDropdowns();
                    handleAction(action, schoolId);
                });
            });
        }
    }

    function handleAction(action, schoolId) {
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

        if (elements.tableSearch) {
            elements.tableSearch.addEventListener('input', searchTable);
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
        const barangayValue = elements.barangayFilter?.value || '';

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
        if (elements.barangayFilter) elements.barangayFilter.value = '';
        if (elements.tableSearch) elements.tableSearch.value = '';

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
        if (!modal || !elements.modalOverlay) return;

        populateBarangayDropdown('addSchoolBarangay');

        const form = document.getElementById('addSchoolForm');
        if (form) form.reset();
        clearFormErrors();

        modal.classList.add('show');
        elements.modalOverlay.classList.add('show');
    }

    function closeAddSchoolModal() {
        const modal = document.getElementById('addSchoolModal');

        if (modal) modal.classList.remove('show');
        if (elements.modalOverlay) elements.modalOverlay.classList.remove('show');
        clearFormErrors();
    }

    function handleAddSchool(e) {
        e.preventDefault();
        clearFormErrors();

        const schoolName = document.getElementById('addSchoolName')?.value.trim() || '';
        const schoolId = document.getElementById('addSchoolId')?.value.trim() || '';
        const barangay = document.getElementById('addSchoolBarangay')?.value || '';

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
        if (!modal || !elements.modalOverlay) return;

        const editSchoolName = document.getElementById('editSchoolName');
        const editSchoolId = document.getElementById('editSchoolId');

        if (editSchoolName) editSchoolName.value = school.schoolName;
        if (editSchoolId) editSchoolId.value = school.schoolId;

        populateBarangayDropdown('editSchoolBarangay', school.barangay);

        clearFormErrors();
        modal.classList.add('show');
        elements.modalOverlay.classList.add('show');
    }

    function closeEditSchoolModal() {
        const modal = document.getElementById('editSchoolModal');

        if (modal) modal.classList.remove('show');
        if (elements.modalOverlay) elements.modalOverlay.classList.remove('show');
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

        if (modal) modal.classList.add('show');
        if (elements.modalOverlay) elements.modalOverlay.classList.add('show');
    }

    function closeDeleteSchoolModal() {
        const modal = document.getElementById('deleteSchoolModal');

        if (modal) modal.classList.remove('show');
        if (elements.modalOverlay) elements.modalOverlay.classList.remove('show');
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
        if (!modal || !elements.modalOverlay) return;

        const viewSchoolName = document.getElementById('viewSchoolName');
        const viewSchoolIdValue = document.getElementById('viewSchoolIdValue');
        const viewSchoolBarangayValue = document.getElementById('viewSchoolBarangayValue');
        const viewSchoolStudentCount = document.getElementById('viewSchoolStudentCount');

        if (viewSchoolName) viewSchoolName.textContent = school.schoolName;
        if (viewSchoolIdValue) viewSchoolIdValue.textContent = school.schoolId;
        if (viewSchoolBarangayValue) viewSchoolBarangayValue.textContent = school.barangay;
        if (viewSchoolStudentCount) viewSchoolStudentCount.textContent = school.students.length;

        const studentsList = document.getElementById('viewSchoolStudentsList');
        if (studentsList) {
            studentsList.innerHTML = '';

            if (school.students.length > 0) {
                school.students.forEach(student => {
                    const studentPreview = createStudentPreviewItem(student);
                    studentsList.appendChild(studentPreview);
                });
            } else {
                const noStudents = document.createElement('p');
                noStudents.className = 'no-students-text';
                noStudents.textContent = 'No students enrolled';
                studentsList.appendChild(noStudents);
            }
        }

        modal.classList.add('show');
        elements.modalOverlay.classList.add('show');
    }

    function createStudentPreviewItem(student) {
        const div = document.createElement('div');
        div.className = 'student-preview-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'student-name';
        nameSpan.textContent = student.name;

        const detailsSpan = document.createElement('span');
        detailsSpan.className = 'student-details';
        detailsSpan.textContent = `Age: ${student.age} | ${student.gender === 'M' ? 'Male' : 'Female'} | ${student.isActive ? 'Active' : 'Inactive'}`;

        div.appendChild(nameSpan);
        div.appendChild(detailsSpan);

        return div;
    }

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    function populateBarangayDropdown(selectId, selectedValue = null) {
        const select = document.getElementById(selectId);
        if (!select) return;

        select.innerHTML = '<option value="">Select Barangay</option>';
        SCHOOLS_DATA.barangays.forEach(barangay => {
            const option = document.createElement('option');
            option.value = barangay;
            option.textContent = barangay;
            if (barangay === selectedValue) option.selected = true;
            select.appendChild(option);
        });
    }

    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('show'));
        if (elements.modalOverlay) elements.modalOverlay.classList.remove('show');
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
        alert(message);
    }

})();