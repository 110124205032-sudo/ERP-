document.addEventListener('DOMContentLoaded', () => {
    // Role selection functionality
    const roleButtons = document.querySelectorAll('.role-btn');
    
    roleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            roleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
        });
    });

    // Password visibility toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the icon
        if (type === 'password') {
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        } else {
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    });

    // Form submission simulation
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const activeRoleBtn = document.querySelector('.role-btn.active');
        const role = activeRoleBtn ? activeRoleBtn.getAttribute('data-role') : 'unknown';
        const username = document.getElementById('username').value;
        
        // Simulate a login effect
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Logging in...';
        loginBtn.style.opacity = '0.9';
        loginBtn.disabled = true;
        
        // Dummy timeout to simulate backend request
        setTimeout(() => {
            loginBtn.innerHTML = originalText;
            loginBtn.style.opacity = '1';
            loginBtn.disabled = false;
            
            // alert(`Logging in as ${role}...`);
            // Here you would typically redirect the user based on role
            if (role === 'student') {
                window.location.href = 'student-dashboard.html';
            } else if (role === 'admin') {
                window.location.href = 'hod-dashboard.html';
            } else if (role === 'teacher') {
                window.location.href = 'teacher-dashboard.html';
            } else {
                console.log(`Successfully authenticated ${username} as ${role}`);
            }
        }, 1500);
    });
});

    // --- Dashboard Specific Interactivity ---

    // 1. Mobile Sidebar Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    // 2. SPA Tab Switching Logic
    const navItems = document.querySelectorAll('.nav-links .nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    if (navItems.length > 0 && contentSections.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // If it's the logout button or has no data-target, ignore
                if (item.classList.contains('logout-btn') || !item.hasAttribute('data-target')) return;
                
                e.preventDefault();
                
                // Remove active class from all nav items and sections
                navItems.forEach(nav => nav.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked nav item
                item.classList.add('active');
                
                // Show corresponding section
                const targetId = item.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                
                // Close sidebar on mobile after clicking a link
                if (window.innerWidth <= 768 && sidebar) {
                    sidebar.classList.remove('open');
                }
            });
        });
    }

    // 3. Modal Logic
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-modal, .cancel-btn');
    const modals = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Close modal on click outside content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // 4. Form Submission Feedback (Simulated)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (form.id === 'loginForm') return; // Handled separately
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-primary');
            if (!submitBtn) return;
            
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                const modal = form.closest('.modal-overlay');
                if (modal) {
                    modal.classList.remove('active');
                }
                
                alert('Action completed successfully!');
                form.reset();
            }, 800);
        });
    });

    // 5. Standalone Button Actions
    const saveButtons = document.querySelectorAll('.btn-primary');
    saveButtons.forEach(btn => {
        // If button is inside a form, it's handled above. If it's inline like Save Attendance, handle it here.
        if (!btn.closest('form') && btn.innerText.includes('Save')) {
            btn.addEventListener('click', () => {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    alert('Saved Successfully!');
                }, 800);
            });
        }
    });

    // 6. Dynamic Attendance Loading for HOD Dashboard Modals
    const studentsPresentModal = document.getElementById('studentsPresentModal');
    if (studentsPresentModal) {
        const studentAttendanceData = [
            { name: 'Rahul Sharma', class: 'CSE 2nd Year', section: 'A', status: 'present' },
            { name: 'Priya Reddy', class: 'CSE 3rd Year', section: 'B', status: 'present' },
            { name: 'Arjun Kumar', class: 'IT 1st Year', section: 'A', status: 'present' },
            { name: 'Ayesha Khan', class: 'CSE 2nd Year', section: 'B', status: 'absent' },
            { name: 'Rohit Patel', class: 'IT 4th Year', section: 'A', status: 'absent' }
        ];
        
        const presentStudentsList = document.getElementById('presentStudentsList');
        const absentStudentsList = document.getElementById('absentStudentsList');
        
        if (presentStudentsList && absentStudentsList) {
            studentAttendanceData.forEach(student => {
                const li = document.createElement('li');
                const icon = student.status === 'present' ? '<span class="icon-present">✓</span>' : '<span class="icon-absent">✗</span>';
                li.innerHTML = `
                    <div class="student-info">
                        ${icon} <span>${student.name}</span>
                    </div>
                    <div class="meta-info">
                        <span>${student.class}</span>
                        <span>${student.section}</span>
                    </div>
                `;
                if (student.status === 'present') {
                    presentStudentsList.appendChild(li);
                } else {
                    absentStudentsList.appendChild(li);
                }
            });
        }
    }

    // --- Teacher Dashboard Specific Logic ---
    // Handle Proceed to Mark Attendance button click
    window.proceedToMarkAttendance = function() {
        const classSelect = document.getElementById('attendance-class-select');
        const dateSelect = document.getElementById('attendance-date-select');
        
        if (!classSelect || !classSelect.value) {
            alert('Please select a class first.');
            return;
        }
        
        document.getElementById('attendance-table-title').innerText = `Mark Attendance: ${classSelect.value}`;
        
        if(dateSelect && dateSelect.value) {
            // Format date string nicely if needed, or just display value
            const dateObj = new Date(dateSelect.value);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            document.getElementById('attendance-date-display').innerText = formattedDate;
        }
        
        // Hide Step 1, Show Step 2
        document.getElementById('attendance-select-step').style.display = 'none';
        document.getElementById('attendance-mark-step').style.display = 'block';
    };

    // Handle Change Class button click
    window.backToAttendanceSelect = function() {
        // Hide Step 2, Show Step 1
        document.getElementById('attendance-mark-step').style.display = 'none';
        document.getElementById('attendance-select-step').style.display = 'block';
    };
    const facultyPresentModal = document.getElementById('facultyPresentModal');
    if (facultyPresentModal) {
        const facultyAttendanceData = [
            { name: 'Dr. Rajesh Kumar', dept: 'CSE', status: 'present' },
            { name: 'Prof. Anita Sharma', dept: 'ECE', status: 'present' },
            { name: 'Mr. Vinay Rao', dept: 'IT', status: 'present' },
            { name: 'Dr. Meena Singh', dept: 'Civil', status: 'absent' },
            { name: 'Mr. Arvind Patel', dept: 'Mechanical', status: 'absent' }
        ];

        const presentFacultyList = document.getElementById('presentFacultyList');
        const absentFacultyList = document.getElementById('absentFacultyList');

        if (presentFacultyList && absentFacultyList) {
            facultyAttendanceData.forEach(faculty => {
                const li = document.createElement('li');
                const icon = faculty.status === 'present' ? '<span class="icon-present">✓</span>' : '<span class="icon-absent">✗</span>';
                li.innerHTML = `
                    <div class="faculty-info">
                        ${icon} <span>${faculty.name}</span>
                    </div>
                    <div class="meta-info">
                        <span>${faculty.dept}</span>
                    </div>
                `;
                if (faculty.status === 'present') {
                    presentFacultyList.appendChild(li);
                } else {
                    absentFacultyList.appendChild(li);
                }
            });
        }
    }
