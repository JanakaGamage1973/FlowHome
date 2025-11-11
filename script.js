// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');

    // Function to switch screens
    function switchScreen(targetScreenId) {
        // Remove active class from all screens
        screens.forEach(screen => {
            screen.classList.remove('active');
        });

        // Remove active class from all nav items
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to target screen
        const targetScreen = document.getElementById(targetScreenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // Add active class to clicked nav item
        const activeNavItem = document.querySelector(`[data-screen="${targetScreenId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Reset capture screen when navigating to it
        if (targetScreenId === 'capture-screen') {
            resetCaptureScreen();
        }

        // Scroll to top of content area
        const contentArea = document.getElementById('content');
        contentArea.scrollTop = 0;
    }

    // Add click event listeners to all navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const screenId = this.getAttribute('data-screen');
            switchScreen(screenId);
        });
    });

    // Prevent pull-to-refresh on mobile
    document.body.addEventListener('touchmove', function(e) {
        if (e.target.closest('.content-area')) {
            const scrollTop = document.querySelector('.content-area').scrollTop;
            if (scrollTop <= 0) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    // ==================== SETTINGS FUNCTIONALITY ====================

    // Settings navigation
    const settingsItems = document.querySelectorAll('.settings-item:not(.disabled)');
    settingsItems.forEach(item => {
        item.addEventListener('click', function() {
            const subscreenId = this.getAttribute('data-subscreen');
            if (subscreenId) {
                switchScreen(subscreenId);
            }
        });
    });

    // Back button functionality
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const backScreenId = this.getAttribute('data-back');
            if (backScreenId) {
                switchScreen(backScreenId);
            }
        });
    });

    // Number formatting function
    function formatCurrency(amount) {
        // Round to whole number and add comma separators
        return Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Toast notification function
    function showToast(message = 'Saved') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // ==================== PROFILE SCREEN ====================

    // Auto-save on profile changes
    const profileInputs = document.querySelectorAll('#profile-screen input, #profile-screen select');
    profileInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Simulate saving
            showToast('Saved');
        });
    });

    // ==================== FAMILY MEMBERS SCREEN ====================

    // Add member button
    const addMemberBtn = document.getElementById('add-member-btn');
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', function() {
            document.getElementById('member-edit-title').textContent = 'Add Member';
            document.getElementById('member-name').value = '';
            switchScreen('member-edit-screen');
        });
    }

    // Edit member (click on member item)
    const memberItems = document.querySelectorAll('.member-item');
    memberItems.forEach(item => {
        item.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member-id');
            const memberName = this.querySelector('.member-name').textContent;

            document.getElementById('member-edit-title').textContent = 'Edit Member';
            document.getElementById('member-name').value = memberName;

            switchScreen('member-edit-screen');
        });
    });

    // Color picker for member
    const memberColorOptions = document.querySelectorAll('#member-edit-screen .color-option');
    memberColorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active from all
            memberColorOptions.forEach(opt => opt.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');

            // Update avatar preview color
            const color = this.getAttribute('data-color');
            document.getElementById('member-avatar-preview').style.backgroundColor = color;
        });
    });

    // Save member button
    const saveMemberBtn = document.getElementById('save-member-btn');
    if (saveMemberBtn) {
        saveMemberBtn.addEventListener('click', function() {
            showToast('Saved');
            setTimeout(() => {
                switchScreen('family-screen');
            }, 500);
        });
    }

    // ==================== CARDS & WALLETS SCREEN ====================

    // Add card button
    const addCardBtn = document.getElementById('add-card-btn');
    if (addCardBtn) {
        addCardBtn.addEventListener('click', function() {
            document.getElementById('card-edit-title').textContent = 'Add Card / Wallet';
            document.getElementById('card-name').value = '';
            document.getElementById('card-limit').value = '';
            switchScreen('card-edit-screen');
        });
    }

    // Edit card (click on card item)
    const cardItems = document.querySelectorAll('.card-item');
    cardItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't navigate if clicking on toggle
            if (e.target.closest('.toggle-switch')) {
                return;
            }

            const cardId = this.getAttribute('data-card-id');
            const cardName = this.querySelector('.card-name').textContent;

            document.getElementById('card-edit-title').textContent = 'Edit Card / Wallet';
            document.getElementById('card-name').value = cardName;

            switchScreen('card-edit-screen');
        });
    });

    // Color picker for card
    const cardColorOptions = document.querySelectorAll('#card-edit-screen .color-option');
    cardColorOptions.forEach(option => {
        option.addEventListener('click', function() {
            cardColorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Save card button
    const saveCardBtn = document.getElementById('save-card-btn');
    if (saveCardBtn) {
        saveCardBtn.addEventListener('click', function() {
            showToast('Saved');
            setTimeout(() => {
                switchScreen('cards-screen');
            }, 500);
        });
    }

    // ==================== CATEGORIES SCREEN ====================

    // Add category button
    const addCategoryBtn = document.getElementById('add-category-btn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', function() {
            document.getElementById('category-edit-title').textContent = 'Add Category';
            document.getElementById('category-name').value = '';
            switchScreen('category-edit-screen');
        });
    }

    // Edit category (click on category item)
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category-id');
            const categoryName = this.querySelector('.category-name').textContent;

            document.getElementById('category-edit-title').textContent = 'Edit Category';
            document.getElementById('category-name').value = categoryName;

            switchScreen('category-edit-screen');
        });
    });

    // Icon picker for category
    const iconOptions = document.querySelectorAll('.icon-option');
    iconOptions.forEach(option => {
        option.addEventListener('click', function() {
            iconOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Color picker for category
    const categoryColorOptions = document.querySelectorAll('#category-edit-screen .color-option');
    categoryColorOptions.forEach(option => {
        option.addEventListener('click', function() {
            categoryColorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Save category button
    const saveCategoryBtn = document.getElementById('save-category-btn');
    if (saveCategoryBtn) {
        saveCategoryBtn.addEventListener('click', function() {
            showToast('Saved');
            setTimeout(() => {
                switchScreen('categories-screen');
            }, 500);
        });
    }

    // ==================== CAPTURE SCREEN ====================

    let lastSavedExpense = null;
    let allExpenses = []; // Store all expenses
    let currentEditingExpenseId = null; // Track which expense is being edited
    let cameraStream = null;
    let capturedImageData = null;

    // Set today's date by default
    const expenseDateInput = document.getElementById('expense-date');
    if (expenseDateInput) {
        const today = new Date().toISOString().split('T')[0];
        expenseDateInput.value = today;
    }

    // Camera elements
    const snapButton = document.getElementById('snap-button');
    const cameraView = document.getElementById('camera-view');
    const previewView = document.getElementById('preview-view');
    const cameraPlaceholder = document.getElementById('camera-placeholder');
    const photoInput = document.getElementById('photo-input');

    // Click on camera placeholder or snap button to open file picker/camera
    if (cameraPlaceholder) {
        cameraPlaceholder.addEventListener('click', function() {
            photoInput.click();
        });
    }

    if (snapButton) {
        snapButton.addEventListener('click', function() {
            photoInput.click();
        });
    }

    // Handle photo selection/capture
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = function(event) {
                    capturedImageData = event.target.result;

                    // Update camera placeholder to show selected image
                    cameraPlaceholder.innerHTML = `<img src="${capturedImageData}" style="width: 100%; height: 100%; object-fit: cover;">`;

                    // Update preview thumbnail
                    const previewThumbnail = document.getElementById('preview-thumbnail');
                    previewThumbnail.innerHTML = `<img src="${capturedImageData}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">`;

                    // Hide camera, show preview directly
                    cameraView.style.display = 'none';
                    previewView.style.display = 'flex';

                    // Scroll to top of preview
                    previewView.scrollTop = 0;
                };

                reader.readAsDataURL(file);
            }
        });
    }

    // Reset camera placeholder
    function resetCameraPlaceholder() {
        if (cameraPlaceholder) {
            cameraPlaceholder.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <p>Tap to take photo or choose from gallery</p>
            `;
        }
        // Reset file input so same file can be selected again
        if (photoInput) {
            photoInput.value = '';
        }
    }

    // Reset entire capture screen (camera and preview)
    function resetCaptureScreen() {
        // Clear captured image data
        capturedImageData = null;

        // Reset camera placeholder to empty state
        resetCameraPlaceholder();

        // Reset preview thumbnail to empty state
        const previewThumbnail = document.getElementById('preview-thumbnail');
        if (previewThumbnail) {
            previewThumbnail.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            `;
        }

        // Clear form fields
        const amountInput = document.getElementById('expense-amount');
        if (amountInput) {
            amountInput.value = '';
        }

        // Show camera view, hide preview
        if (cameraView) {
            cameraView.style.display = 'flex';
        }
        if (previewView) {
            previewView.style.display = 'none';
        }
    }


    // Discard button - return to camera
    const discardButton = document.getElementById('discard-button');
    if (discardButton) {
        discardButton.addEventListener('click', function() {
            // Reset the entire capture screen
            resetCaptureScreen();
        });
    }

    // Sanitize amount inputs - remove any non-numeric characters except decimal point
    function sanitizeAmountInput(input) {
        input.addEventListener('input', function(e) {
            // Remove any non-numeric characters except decimal point
            let value = e.target.value;
            // Remove currency symbols, letters, and special characters except digits and decimal point
            value = value.replace(/[^\d.]/g, '');
            // Ensure only one decimal point
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            e.target.value = value;
        });
    }

    // Apply sanitization to all amount inputs
    const expenseAmountInput = document.getElementById('expense-amount');
    const editAmountInput = document.getElementById('edit-amount');
    const transferAmountInput = document.getElementById('transfer-amount');

    if (expenseAmountInput) sanitizeAmountInput(expenseAmountInput);
    if (editAmountInput) sanitizeAmountInput(editAmountInput);
    if (transferAmountInput) sanitizeAmountInput(transferAmountInput);

    // Chip selectors
    const chipSelectors = document.querySelectorAll('.chip-selector');
    chipSelectors.forEach(selector => {
        const chips = selector.querySelectorAll('.chip');
        chips.forEach(chip => {
            chip.addEventListener('click', function() {
                // Remove active from all chips in this selector
                chips.forEach(c => c.classList.remove('active'));
                // Add active to clicked chip
                this.classList.add('active');
            });
        });
    });

    // Save expense button
    const saveExpenseButton = document.getElementById('save-expense-button');
    if (saveExpenseButton) {
        saveExpenseButton.addEventListener('click', function() {
            const amount = document.getElementById('expense-amount').value;

            if (!amount || parseFloat(amount) <= 0) {
                showToast('Please enter an amount');
                return;
            }

            // Get selected values
            const selectedCategory = document.querySelector('#category-chips .chip.active');
            const selectedSource = document.querySelector('#source-chips .chip.active');
            const selectedMember = document.querySelector('#member-chips .chip.active');
            const date = document.getElementById('expense-date').value;

            // Create expense object
            const expense = {
                id: Date.now(),
                amount: parseFloat(amount),
                category: {
                    id: selectedCategory.getAttribute('data-category'),
                    name: selectedCategory.querySelector('.chip-label').textContent,
                    icon: selectedCategory.getAttribute('data-icon'),
                    color: selectedCategory.getAttribute('data-color')
                },
                source: {
                    id: selectedSource.getAttribute('data-source'),
                    name: selectedSource.querySelector('.chip-label').textContent,
                    color: selectedSource.getAttribute('data-color')
                },
                member: {
                    id: selectedMember.getAttribute('data-member'),
                    name: selectedMember.querySelector('.chip-label').textContent
                },
                date: date,
                note: ''
            };

            // Store for undo
            lastSavedExpense = expense;

            // Add to all expenses array
            allExpenses.unshift(expense);

            // Add to expenses list
            addExpenseToList(expense);

            // Update totals
            updateTotals();

            // Refresh wallets list
            refreshWalletsList();

            // Show undo toast
            showUndoToast();

            // Reset the entire capture screen (clear photo, form, etc.)
            resetCaptureScreen();

            // Switch to home screen after a short delay
            setTimeout(() => {
                switchScreen('home-screen');
            }, 300);
        });
    }

    // Add expense to list
    function addExpenseToList(expense) {
        const expensesList = document.getElementById('expenses-list');
        const emptyState = document.getElementById('empty-expenses');

        // Hide empty state, show list
        emptyState.style.display = 'none';
        expensesList.style.display = 'flex';

        // Create expense item
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.setAttribute('data-expense-id', expense.id);

        const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });

        expenseItem.innerHTML = `
            <div class="expense-thumbnail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            </div>
            <div class="expense-details">
                <div class="expense-amount">Rs ${formatCurrency(expense.amount)}</div>
                <div class="expense-meta">
                    <div class="expense-category">
                        <span>${expense.category.icon}</span>
                        <span>${expense.category.name}</span>
                    </div>
                    <span>•</span>
                    <div class="expense-source-icon" style="background-color: ${expense.source.color};"></div>
                    <span>${formattedDate}</span>
                </div>
            </div>
        `;

        // Add click event to edit expense
        expenseItem.addEventListener('click', function() {
            openEditScreen(expense.id);
        });

        // Add to top of list
        expensesList.insertBefore(expenseItem, expensesList.firstChild);

        // Limit to 5 items (remove oldest if more than 5)
        while (expensesList.children.length > 5) {
            expensesList.removeChild(expensesList.lastChild);
        }
    }

    // Show undo toast
    function showUndoToast() {
        const toast = document.getElementById('toast');
        toast.className = 'toast undo-toast';
        toast.innerHTML = `
            <span>Saved</span>
            <button class="undo-button" id="undo-expense">Undo</button>
        `;
        toast.classList.add('show');

        // Handle undo click
        const undoButton = document.getElementById('undo-expense');
        if (undoButton) {
            undoButton.addEventListener('click', function() {
                undoExpense();
                toast.classList.remove('show');
            });
        }

        // Hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.className = 'toast';
                toast.innerHTML = 'Saved';
            }, 300);
        }, 5000);
    }

    // Undo expense
    function undoExpense() {
        if (!lastSavedExpense) return;

        const expensesList = document.getElementById('expenses-list');
        const emptyState = document.getElementById('empty-expenses');
        const expenseItem = document.querySelector(`[data-expense-id="${lastSavedExpense.id}"]`);

        if (expenseItem) {
            expenseItem.remove();
        }

        // Remove from allExpenses array
        allExpenses = allExpenses.filter(exp => exp.id !== lastSavedExpense.id);

        // Update totals
        updateTotals();

        // Refresh wallets list
        refreshWalletsList();

        // Check if list is empty
        if (expensesList.children.length === 0) {
            emptyState.style.display = 'flex';
            expensesList.style.display = 'none';
        }

        lastSavedExpense = null;
        showToast('Undone');
    }

    // ==================== EDIT ENTRY SCREEN ====================

    // Open edit screen with expense data
    function openEditScreen(expenseId) {
        const expense = allExpenses.find(exp => exp.id === expenseId);
        if (!expense) return;

        currentEditingExpenseId = expenseId;

        // Fill in the form fields - ensure amount is a clean number
        const cleanAmount = String(expense.amount).replace(/[^\d.]/g, '');
        document.getElementById('edit-amount').value = cleanAmount;
        document.getElementById('edit-date').value = expense.date;
        document.getElementById('edit-note').value = expense.note || '';

        // Select category
        const editCategoryChips = document.querySelectorAll('#edit-category-chips .chip');
        editCategoryChips.forEach(chip => {
            chip.classList.remove('active');
            if (chip.getAttribute('data-category') === expense.category.id) {
                chip.classList.add('active');
            }
        });

        // Select source
        const editSourceChips = document.querySelectorAll('#edit-source-chips .chip');
        editSourceChips.forEach(chip => {
            chip.classList.remove('active');
            if (chip.getAttribute('data-source') === expense.source.id) {
                chip.classList.add('active');
            }
        });

        // Select member
        const editMemberChips = document.querySelectorAll('#edit-member-chips .chip');
        editMemberChips.forEach(chip => {
            chip.classList.remove('active');
            if (chip.getAttribute('data-member') === expense.member.id) {
                chip.classList.add('active');
            }
        });

        // Switch to edit screen
        switchScreen('edit-entry-screen');
    }

    // Save edited entry
    const saveEditBtn = document.getElementById('save-edit-btn');
    if (saveEditBtn) {
        saveEditBtn.addEventListener('click', function() {
            if (!currentEditingExpenseId) return;

            const amount = document.getElementById('edit-amount').value;
            if (!amount || parseFloat(amount) <= 0) {
                showToast('Please enter an amount');
                return;
            }

            // Get selected values
            const selectedCategory = document.querySelector('#edit-category-chips .chip.active');
            const selectedSource = document.querySelector('#edit-source-chips .chip.active');
            const selectedMember = document.querySelector('#edit-member-chips .chip.active');
            const date = document.getElementById('edit-date').value;
            const note = document.getElementById('edit-note').value;

            // Find and update the expense in allExpenses array
            const expenseIndex = allExpenses.findIndex(exp => exp.id === currentEditingExpenseId);
            if (expenseIndex !== -1) {
                allExpenses[expenseIndex] = {
                    id: currentEditingExpenseId,
                    amount: parseFloat(amount),
                    category: {
                        id: selectedCategory.getAttribute('data-category'),
                        name: selectedCategory.querySelector('.chip-label').textContent,
                        icon: selectedCategory.getAttribute('data-icon'),
                        color: selectedCategory.getAttribute('data-color')
                    },
                    source: {
                        id: selectedSource.getAttribute('data-source'),
                        name: selectedSource.querySelector('.chip-label').textContent,
                        color: selectedSource.getAttribute('data-color')
                    },
                    member: {
                        id: selectedMember.getAttribute('data-member'),
                        name: selectedMember.querySelector('.chip-label').textContent
                    },
                    date: date,
                    note: note
                };

                // Refresh the expense list display
                refreshExpensesList();

                // Update totals
                updateTotals();

                // Refresh wallets list
                refreshWalletsList();

                // Show success message
                showToast('Updated');

                // Return to home screen
                setTimeout(() => {
                    switchScreen('home-screen');
                    currentEditingExpenseId = null;
                }, 500);
            }
        });
    }

    // Delete entry
    const deleteEntryBtn = document.getElementById('delete-entry-btn');
    if (deleteEntryBtn) {
        deleteEntryBtn.addEventListener('click', function() {
            if (!currentEditingExpenseId) return;

            // Remove from allExpenses array
            allExpenses = allExpenses.filter(exp => exp.id !== currentEditingExpenseId);

            // Refresh the expense list display
            refreshExpensesList();

            // Update totals
            updateTotals();

            // Refresh wallets list
            refreshWalletsList();

            // Show success message
            showToast('Deleted');

            // Return to home screen
            setTimeout(() => {
                switchScreen('home-screen');
                currentEditingExpenseId = null;
            }, 500);
        });
    }

    // Refresh expenses list display (show last 5)
    function refreshExpensesList() {
        const expensesList = document.getElementById('expenses-list');
        const emptyState = document.getElementById('empty-expenses');

        // Clear current list
        expensesList.innerHTML = '';

        if (allExpenses.length === 0) {
            emptyState.style.display = 'flex';
            expensesList.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        expensesList.style.display = 'flex';

        // Show last 5 expenses
        const last5 = allExpenses.slice(0, 5);
        last5.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'expense-item';
            expenseItem.setAttribute('data-expense-id', expense.id);

            const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });

            expenseItem.innerHTML = `
                <div class="expense-thumbnail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                </div>
                <div class="expense-details">
                    <div class="expense-amount">Rs ${formatCurrency(expense.amount)}</div>
                    <div class="expense-meta">
                        <div class="expense-category">
                            <span>${expense.category.icon}</span>
                            <span>${expense.category.name}</span>
                        </div>
                        <span>•</span>
                        <div class="expense-source-icon" style="background-color: ${expense.source.color};"></div>
                        <span>${formattedDate}</span>
                    </div>
                </div>
            `;

            // Add click event to edit expense
            expenseItem.addEventListener('click', function() {
                openEditScreen(expense.id);
            });

            expensesList.appendChild(expenseItem);
        });
    }

    // ==================== TOTALS CALCULATION ====================

    // Update today's and this month's totals
    function updateTotals() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

        let todayTotal = 0;
        let monthTotal = 0;

        allExpenses.forEach(expense => {
            // Skip transfers - they don't count as expenses
            if (expense.isTransfer) return;

            const expenseDate = new Date(expense.date);
            expenseDate.setHours(0, 0, 0, 0);

            // Check if expense is today
            if (expenseDate.getTime() === today.getTime()) {
                todayTotal += expense.amount;
            }

            // Check if expense is this month
            if (expenseDate >= thisMonthStart) {
                monthTotal += expense.amount;
            }
        });

        // Update display
        document.getElementById('today-total').textContent = `Rs ${formatCurrency(todayTotal)}`;
        document.getElementById('month-total').textContent = `Rs ${formatCurrency(monthTotal)}`;
    }

    // ==================== WALLETS FUNCTIONALITY ====================

    let allWallets = [
        {
            id: '1',
            name: 'Salary Savings',
            type: 'Savings Account',
            walletSubtype: 'savings',
            limit: null,
            color: '#5B7553',
            icon: 'bank',
            balance: 150000,
            payInCount: 3 // Number of pay-ins this month
        },
        {
            id: '2',
            name: 'Family Debit Card',
            type: 'Debit Card',
            walletSubtype: 'debit',
            limit: null,
            color: '#8B7355',
            icon: 'card',
            balance: 8500,
            target: 15000,
            weeklyTopup: 15000,
            nextTopupDate: '2025-11-18',
            owner: 'Family'
        },
        {
            id: '3',
            name: 'Nilu Debit Card',
            type: 'Debit Card',
            walletSubtype: 'debit',
            limit: null,
            color: '#A67B5B',
            icon: 'card',
            balance: 4200,
            target: 10000,
            weeklyTopup: 10000,
            nextTopupDate: '2025-11-18',
            owner: '2' // Nilu's member ID
        },
        {
            id: '4',
            name: 'Janaka Debit Card',
            type: 'Debit Card',
            walletSubtype: 'debit',
            limit: null,
            color: '#6B8E7F',
            icon: 'card',
            balance: 12000,
            target: 20000,
            weeklyTopup: 20000,
            nextTopupDate: '2025-11-18',
            owner: '1' // Janaka's member ID
        },
        {
            id: '5',
            name: 'Cash Wallet',
            type: 'Cash',
            walletSubtype: 'cash',
            limit: null,
            color: '#7D8A5A',
            icon: 'cash',
            balance: 5000,
            owner: 'Family'
        }
    ];

    let allMembers = [
        {
            id: '1',
            name: 'Janaka',
            initials: 'J',
            role: 'Owner',
            color: '#6B8E7F'
        },
        {
            id: '2',
            name: 'Nilu',
            initials: 'N',
            role: 'Family',
            color: '#A67B5B'
        },
        {
            id: '3',
            name: 'Daughter 1',
            initials: 'D1',
            role: 'Family',
            color: '#8B7355'
        },
        {
            id: '4',
            name: 'Daughter 2',
            initials: 'D2',
            role: 'Family',
            color: '#9B6B5C'
        },
        {
            id: 'family',
            name: 'Family',
            initials: 'F',
            role: 'Group',
            color: '#7D8A5A'
        }
    ];

    let allCategories = [
        {
            id: '1',
            name: 'Food & Dining',
            icon: 'restaurant',
            color: '#8B7355',
            defaultWallet: '1'
        },
        {
            id: '2',
            name: 'Transportation',
            icon: 'car',
            color: '#6B8E7F',
            defaultWallet: '1'
        },
        {
            id: '3',
            name: 'Shopping',
            icon: 'cart',
            color: '#A67B5B',
            defaultWallet: '1'
        },
        {
            id: '4',
            name: 'Entertainment',
            icon: 'game',
            color: '#7D8A5A',
            defaultWallet: '2'
        },
        {
            id: '5',
            name: 'Healthcare',
            icon: 'medical',
            color: '#9B6B5C',
            defaultWallet: '1'
        },
        {
            id: '6',
            name: 'Bills & Utilities',
            icon: 'file',
            color: '#5B7553',
            defaultWallet: '1'
        }
    ];

    let currentWalletId = null;
    let currentEditingMemberId = null;
    let currentEditingCategoryId = null;
    let currentEditingCardId = null;

    // Initialize wallets on page load
    function initializeWallets() {
        refreshWalletsList();
    }

    // Refresh wallets list display
    function refreshWalletsList() {
        const walletsList = document.getElementById('wallets-list');
        walletsList.innerHTML = '';

        allWallets.forEach(wallet => {
            const walletCard = createWalletCard(wallet);
            walletsList.appendChild(walletCard);
        });
    }

    // Create wallet card element
    function createWalletCard(wallet) {
        const card = document.createElement('div');
        card.className = 'wallet-card';
        card.style.borderLeftColor = wallet.color;

        // Calculate wallet stats
        const stats = calculateWalletStats(wallet.id);
        const currentBalance = wallet.balance !== undefined ? wallet.balance : stats.balance;

        let iconSvg = '';
        if (wallet.icon === 'card') {
            iconSvg = '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>';
        } else if (wallet.icon === 'cash') {
            iconSvg = '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>';
        } else if (wallet.icon === 'bank') {
            iconSvg = '<path d="M3 21h18"></path><path d="M4 18h16"></path><path d="M12 2L4 8v2h16V8z"></path><path d="M6 10v8"></path><path d="M10 10v8"></path><path d="M14 10v8"></path><path d="M18 10v8"></path>';
        }

        // Build card content based on wallet type
        let statsHTML = '';
        let extraInfoHTML = '';

        if (wallet.walletSubtype === 'savings') {
            statsHTML = `
                <div class="wallet-stat">
                    <div class="wallet-stat-label">Balance</div>
                    <div class="wallet-stat-value positive">Rs ${formatCurrency(currentBalance)}</div>
                </div>
                ${wallet.payInCount ? `
                    <div class="wallet-stat">
                        <div class="wallet-stat-label">Pay-ins this month</div>
                        <div class="wallet-stat-value">${wallet.payInCount}</div>
                    </div>
                ` : ''}
            `;
        } else if (wallet.walletSubtype === 'debit') {
            const lowBalance = wallet.target && currentBalance < (wallet.target * 0.3);
            statsHTML = `
                <div class="wallet-stat">
                    <div class="wallet-stat-label">Balance / Target</div>
                    <div class="wallet-stat-value ${lowBalance ? 'negative' : 'positive'}">Rs ${formatCurrency(currentBalance)} / ${formatCurrency(wallet.target || 0)}</div>
                </div>
            `;
            if (lowBalance) {
                extraInfoHTML = '<div class="wallet-hint">⚠️ Low balance</div>';
            }
        } else {
            statsHTML = `
                <div class="wallet-stat">
                    <div class="wallet-stat-label">Balance</div>
                    <div class="wallet-stat-value positive">Rs ${formatCurrency(currentBalance)}</div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="wallet-card-header">
                <div class="wallet-card-info">
                    <div class="wallet-card-name">${wallet.name}</div>
                    <div class="wallet-card-type">${wallet.type}</div>
                </div>
                <div class="wallet-card-icon" style="background-color: ${wallet.color};">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${iconSvg}
                    </svg>
                </div>
            </div>
            <div class="wallet-card-stats">
                ${statsHTML}
            </div>
            ${extraInfoHTML}
        `;

        card.addEventListener('click', () => openWalletDetail(wallet.id));

        return card;
    }

    // Calculate wallet statistics
    function calculateWalletStats(walletId) {
        let spent = 0;
        let balance = 0;

        // Get all expenses for this wallet
        allExpenses.forEach(expense => {
            if (expense.source.id === walletId && !expense.isTransfer) {
                spent += expense.amount;
                balance -= expense.amount;
            }
        });

        // Add transfers
        allExpenses.forEach(expense => {
            if (expense.isTransfer) {
                if (expense.transferFrom === walletId) {
                    balance -= expense.amount;
                }
                if (expense.transferTo === walletId) {
                    balance += expense.amount;
                }
            }
        });

        const wallet = allWallets.find(w => w.id === walletId);
        const remaining = wallet && wallet.limit ? wallet.limit - spent : balance;

        return { spent, balance, remaining };
    }

    // Open wallet detail screen
    function openWalletDetail(walletId) {
        currentWalletId = walletId;
        const wallet = allWallets.find(w => w.id === walletId);
        if (!wallet) return;

        // Set wallet name
        document.getElementById('wallet-detail-name').textContent = wallet.name;

        // Calculate stats
        const stats = calculateWalletStats(walletId);

        // Update balance display
        if (wallet.limit) {
            document.getElementById('wallet-balance').textContent = `Rs ${formatCurrency(stats.remaining)}`;
            document.getElementById('wallet-limit-info').style.display = 'block';
            document.getElementById('wallet-limit').textContent = `Rs ${formatCurrency(wallet.limit)}`;
            document.getElementById('wallet-progress-container').style.display = 'block';
            document.getElementById('wallet-spent').textContent = `Rs ${formatCurrency(stats.spent)}`;
            document.getElementById('wallet-remaining').textContent = `Rs ${formatCurrency(stats.remaining)}`;

            // Update progress bar
            const percentage = (stats.spent / wallet.limit) * 100;
            document.getElementById('wallet-progress-fill').style.width = `${Math.min(percentage, 100)}%`;
        } else {
            document.getElementById('wallet-balance').textContent = `Rs ${formatCurrency(stats.balance)}`;
            document.getElementById('wallet-limit-info').style.display = 'none';
            document.getElementById('wallet-progress-container').style.display = 'none';
        }

        // Load transactions
        loadWalletTransactions(walletId);

        // Switch to detail screen
        switchScreen('wallet-detail-screen');
    }

    // Load wallet transactions
    function loadWalletTransactions(walletId) {
        const transactionsList = document.getElementById('wallet-transactions-list');
        const emptyState = document.getElementById('wallet-empty-transactions');

        transactionsList.innerHTML = '';

        // Filter expenses for this wallet
        const walletTransactions = allExpenses.filter(expense => {
            if (expense.isTransfer) {
                return expense.transferFrom === walletId || expense.transferTo === walletId;
            }
            return expense.source.id === walletId;
        });

        if (walletTransactions.length === 0) {
            emptyState.style.display = 'flex';
            transactionsList.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        transactionsList.style.display = 'flex';

        walletTransactions.forEach(transaction => {
            const item = document.createElement('div');
            item.className = 'wallet-transaction-item';

            const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });

            let amount, amountClass, icon, name;

            if (transaction.isTransfer) {
                const isIncoming = transaction.transferTo === walletId;
                amount = isIncoming ? `+Rs ${formatCurrency(transaction.amount)}` : `-Rs ${formatCurrency(transaction.amount)}`;
                amountClass = isIncoming ? 'positive' : 'negative';
                icon = '🔄';
                name = transaction.note || 'Transfer';
            } else {
                amount = `-Rs ${formatCurrency(transaction.amount)}`;
                amountClass = 'negative';
                icon = transaction.category.icon;
                name = transaction.category.name;
            }

            item.innerHTML = `
                <div class="wallet-transaction-icon" style="background-color: ${transaction.isTransfer ? '#007AFF' : transaction.category.color};">
                    ${icon}
                </div>
                <div class="wallet-transaction-details">
                    <div class="wallet-transaction-name">
                        ${name}
                        ${transaction.isTransfer ? '<span class="transfer-badge">Transfer</span>' : ''}
                    </div>
                    <div class="wallet-transaction-date">${formattedDate}</div>
                </div>
                <div class="wallet-transaction-amount ${amountClass}">${amount}</div>
            `;

            transactionsList.appendChild(item);
        });
    }

    // New Transfer button
    const newTransferBtn = document.getElementById('new-transfer-btn');
    if (newTransferBtn) {
        newTransferBtn.addEventListener('click', () => {
            openTransferScreen();
        });
    }

    // Open transfer screen
    function openTransferScreen() {
        // Populate wallet selects
        const fromSelect = document.getElementById('transfer-from');
        const toSelect = document.getElementById('transfer-to');

        fromSelect.innerHTML = '<option value="">Select source</option>';
        toSelect.innerHTML = '<option value="">Select destination</option>';

        allWallets.forEach(wallet => {
            fromSelect.innerHTML += `<option value="${wallet.id}">${wallet.name}</option>`;
            toSelect.innerHTML += `<option value="${wallet.id}">${wallet.name}</option>`;
        });

        // Set today's date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('transfer-date').value = today;

        // Clear form
        document.getElementById('transfer-amount').value = '';
        document.getElementById('transfer-note').value = '';

        switchScreen('transfer-screen');
    }

    // Transfer back button
    const transferBackBtn = document.getElementById('transfer-back-btn');
    if (transferBackBtn) {
        transferBackBtn.addEventListener('click', () => {
            switchScreen('wallet-detail-screen');
        });
    }

    // Save transfer
    const saveTransferBtn = document.getElementById('save-transfer-btn');
    if (saveTransferBtn) {
        saveTransferBtn.addEventListener('click', () => {
            const from = document.getElementById('transfer-from').value;
            const to = document.getElementById('transfer-to').value;
            const amount = parseFloat(document.getElementById('transfer-amount').value);
            const date = document.getElementById('transfer-date').value;
            const note = document.getElementById('transfer-note').value;

            if (!from || !to) {
                showToast('Please select source and destination');
                return;
            }

            if (from === to) {
                showToast('Source and destination must be different');
                return;
            }

            if (!amount || amount <= 0) {
                showToast('Please enter a valid amount');
                return;
            }

            // Create transfer record
            const transfer = {
                id: Date.now(),
                amount: amount,
                date: date,
                note: note,
                isTransfer: true,
                transferFrom: from,
                transferTo: to,
                category: { id: 'transfer', name: 'Transfer', icon: '🔄', color: '#007AFF' },
                source: { id: from, name: allWallets.find(w => w.id === from).name, color: '#007AFF' },
                member: { id: '1', name: 'John Doe' }
            };

            // Add to expenses array
            allExpenses.unshift(transfer);

            // Show success message
            showToast('Transfer saved');

            // Refresh wallets list
            refreshWalletsList();

            // Return to wallet detail
            setTimeout(() => {
                openWalletDetail(currentWalletId);
            }, 500);
        });
    }

    // Initialize wallets when page loads
    initializeWallets();

    // ==================== SETTINGS DYNAMIC FUNCTIONALITY ====================

    // Initialize Settings
    function initializeSettings() {
        refreshFamilyMembersList();
        refreshCardsWalletsList();
        refreshCategoriesList();
    }

    // ==================== FAMILY MEMBERS DYNAMIC RENDERING ====================

    function refreshFamilyMembersList() {
        const container = document.querySelector('#family-screen .list-container');
        if (!container) return;

        container.innerHTML = '';

        allMembers.forEach(member => {
            const memberItem = document.createElement('div');
            memberItem.className = 'member-item';
            memberItem.setAttribute('data-member-id', member.id);

            memberItem.innerHTML = `
                <div class="member-avatar" style="background-color: ${member.color};">
                    <span>${member.initials}</span>
                </div>
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <div class="member-role">${member.role}</div>
                </div>
                <div class="member-color-tag" style="background-color: ${member.color};"></div>
            `;

            memberItem.addEventListener('click', () => openEditMember(member.id));
            container.appendChild(memberItem);
        });
    }

    function openEditMember(memberId) {
        currentEditingMemberId = memberId;
        const member = allMembers.find(m => m.id === memberId);
        if (!member) return;

        document.getElementById('member-edit-title').textContent = 'Edit Member';
        document.getElementById('member-name').value = member.name;

        // Set active color
        const memberColorOptions = document.querySelectorAll('#member-edit-screen .color-option');
        memberColorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === member.color) {
                option.classList.add('active');
            }
        });

        // Update preview
        document.getElementById('member-avatar-preview').style.backgroundColor = member.color;
        const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        document.getElementById('member-avatar-preview').querySelector('span').textContent = initials;

        // Show delete button
        document.getElementById('delete-member-btn').style.display = 'block';

        switchScreen('member-edit-screen');
    }

    function openAddMember() {
        currentEditingMemberId = null;
        document.getElementById('member-edit-title').textContent = 'Add Member';
        document.getElementById('member-name').value = '';

        // Set first color as active
        const memberColorOptions = document.querySelectorAll('#member-edit-screen .color-option');
        memberColorOptions.forEach((option, index) => {
            option.classList.remove('active');
            if (index === 0) option.classList.add('active');
        });

        // Update preview
        const firstColor = memberColorOptions[0].getAttribute('data-color');
        document.getElementById('member-avatar-preview').style.backgroundColor = firstColor;
        document.getElementById('member-avatar-preview').querySelector('span').textContent = '';

        // Hide delete button
        document.getElementById('delete-member-btn').style.display = 'none';

        switchScreen('member-edit-screen');
    }

    function saveMember() {
        const name = document.getElementById('member-name').value.trim();
        if (!name) {
            showToast('Please enter a name');
            return;
        }

        const activeColor = document.querySelector('#member-edit-screen .color-option.active');
        const color = activeColor ? activeColor.getAttribute('data-color') : '#007AFF';

        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

        if (currentEditingMemberId) {
            // Edit existing member
            const member = allMembers.find(m => m.id === currentEditingMemberId);
            if (member) {
                member.name = name;
                member.initials = initials;
                member.color = color;
            }
        } else {
            // Add new member
            const newMember = {
                id: Date.now().toString(),
                name: name,
                initials: initials,
                role: 'Family',
                color: color
            };
            allMembers.push(newMember);
        }

        // Refresh all UI components
        refreshFamilyMembersList();
        refreshMemberChips();
        refreshSearchFilters();

        showToast('Saved');
        setTimeout(() => {
            switchScreen('family-screen');
        }, 500);
    }

    function deleteMember() {
        if (!currentEditingMemberId) return;

        const member = allMembers.find(m => m.id === currentEditingMemberId);
        if (!member) return;

        // Confirm deletion
        if (!confirm(`Are you sure you want to delete ${member.name}?`)) {
            return;
        }

        // Remove member from array
        const index = allMembers.findIndex(m => m.id === currentEditingMemberId);
        if (index > -1) {
            allMembers.splice(index, 1);
        }

        // Refresh all UI components
        refreshFamilyMembersList();
        refreshMemberChips();
        refreshSearchFilters();

        showToast('Deleted');
        setTimeout(() => {
            switchScreen('family-screen');
        }, 500);
    }

    // ==================== CARDS & WALLETS DYNAMIC RENDERING ====================

    function refreshCardsWalletsList() {
        const container = document.querySelector('#cards-screen .list-container');
        if (!container) return;

        container.innerHTML = '';

        allWallets.forEach(wallet => {
            const cardItem = document.createElement('div');
            cardItem.className = 'card-item';
            cardItem.setAttribute('data-card-id', wallet.id);

            const iconSvg = wallet.icon === 'card'
                ? '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>'
                : '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>';

            cardItem.innerHTML = `
                <div class="card-icon" style="background-color: ${wallet.color};">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${iconSvg}
                    </svg>
                </div>
                <div class="card-info">
                    <div class="card-name">${wallet.name}</div>
                    <div class="card-type">${wallet.type}</div>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                </label>
            `;

            cardItem.addEventListener('click', (e) => {
                if (!e.target.closest('.toggle-switch')) {
                    openEditCard(wallet.id);
                }
            });

            container.appendChild(cardItem);
        });
    }

    function refreshOwnerDropdown() {
        const ownerSelect = document.getElementById('card-owner');
        if (!ownerSelect) return;

        ownerSelect.innerHTML = '';
        allMembers.forEach(member => {
            const option = document.createElement('option');
            option.value = member.id;
            option.textContent = member.name;
            ownerSelect.appendChild(option);
        });
    }

    function openEditCard(cardId) {
        currentEditingCardId = cardId;
        const wallet = allWallets.find(w => w.id === cardId);
        if (!wallet) return;

        document.getElementById('card-edit-title').textContent = 'Edit Card / Wallet';
        document.getElementById('card-name').value = wallet.name;
        document.getElementById('card-type').value = wallet.type;
        document.getElementById('card-limit').value = wallet.limit || '';

        // Populate and set owner dropdown
        refreshOwnerDropdown();
        if (wallet.owner) {
            document.getElementById('card-owner').value = wallet.owner;
        }

        // Set active color
        const cardColorOptions = document.querySelectorAll('#card-edit-screen .color-option');
        cardColorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === wallet.color) {
                option.classList.add('active');
            }
        });

        // Show delete button
        document.getElementById('delete-card-btn').style.display = 'block';

        switchScreen('card-edit-screen');
    }

    function openAddCard() {
        currentEditingCardId = null;
        document.getElementById('card-edit-title').textContent = 'Add Card / Wallet';
        document.getElementById('card-name').value = '';
        document.getElementById('card-type').value = 'Credit Card';
        document.getElementById('card-limit').value = '';

        // Populate owner dropdown and select first member
        refreshOwnerDropdown();
        if (allMembers.length > 0) {
            document.getElementById('card-owner').value = allMembers[0].id;
        }

        // Set first color as active
        const cardColorOptions = document.querySelectorAll('#card-edit-screen .color-option');
        cardColorOptions.forEach((option, index) => {
            option.classList.remove('active');
            if (index === 0) option.classList.add('active');
        });

        // Hide delete button
        document.getElementById('delete-card-btn').style.display = 'none';

        switchScreen('card-edit-screen');
    }

    function saveCard() {
        const name = document.getElementById('card-name').value.trim();
        if (!name) {
            showToast('Please enter a name');
            return;
        }

        const type = document.getElementById('card-type').value;
        const limitValue = document.getElementById('card-limit').value;
        const limit = limitValue ? parseFloat(limitValue) : null;
        const owner = document.getElementById('card-owner').value;

        const activeColor = document.querySelector('#card-edit-screen .color-option.active');
        const color = activeColor ? activeColor.getAttribute('data-color') : '#007AFF';

        const icon = type === 'Cash' ? 'cash' : 'card';

        if (currentEditingCardId) {
            // Edit existing card
            const wallet = allWallets.find(w => w.id === currentEditingCardId);
            if (wallet) {
                wallet.name = name;
                wallet.type = type;
                wallet.limit = limit;
                wallet.color = color;
                wallet.icon = icon;
                wallet.owner = owner;
            }
        } else {
            // Add new card
            const newWallet = {
                id: Date.now().toString(),
                name: name,
                type: type,
                limit: limit,
                color: color,
                icon: icon,
                owner: owner
            };
            allWallets.push(newWallet);
        }

        // Refresh all UI components
        refreshCardsWalletsList();
        refreshWalletsList();
        refreshSourceChips();
        refreshSearchFilters();

        showToast('Saved');
        setTimeout(() => {
            switchScreen('cards-screen');
        }, 500);
    }

    function deleteCard() {
        if (!currentEditingCardId) return;

        const wallet = allWallets.find(w => w.id === currentEditingCardId);
        if (!wallet) return;

        // Confirm deletion
        if (!confirm(`Are you sure you want to delete ${wallet.name}?`)) {
            return;
        }

        // Remove card from array
        const index = allWallets.findIndex(w => w.id === currentEditingCardId);
        if (index > -1) {
            allWallets.splice(index, 1);
        }

        // Refresh all UI components
        refreshCardsWalletsList();
        refreshWalletsList();
        refreshSourceChips();
        refreshSearchFilters();

        showToast('Deleted');
        setTimeout(() => {
            switchScreen('cards-screen');
        }, 500);
    }

    // ==================== CATEGORIES DYNAMIC RENDERING ====================

    function refreshCategoriesList() {
        const container = document.querySelector('#categories-screen .list-container');
        if (!container) return;

        container.innerHTML = '';

        allCategories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            categoryItem.setAttribute('data-category-id', category.id);

            categoryItem.innerHTML = `
                <div class="category-icon" style="background-color: ${category.color};">
                    ${category.icon}
                </div>
                <div class="category-name">${category.name}</div>
                <div class="category-color-tag" style="background-color: ${category.color};"></div>
            `;

            categoryItem.addEventListener('click', () => openEditCategory(category.id));
            container.appendChild(categoryItem);
        });
    }

    function openEditCategory(categoryId) {
        currentEditingCategoryId = categoryId;
        const category = allCategories.find(c => c.id === categoryId);
        if (!category) return;

        document.getElementById('category-edit-title').textContent = 'Edit Category';
        document.getElementById('category-name').value = category.name;

        // Set active icon
        const iconOptions = document.querySelectorAll('.icon-option');
        iconOptions.forEach(option => {
            option.classList.remove('active');
            if (option.textContent.trim() === category.icon) {
                option.classList.add('active');
            }
        });

        // Set active color
        const categoryColorOptions = document.querySelectorAll('#category-edit-screen .color-option');
        categoryColorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === category.color) {
                option.classList.add('active');
            }
        });

        // Show delete button
        document.getElementById('delete-category-btn').style.display = 'block';

        switchScreen('category-edit-screen');
    }

    function openAddCategory() {
        currentEditingCategoryId = null;
        document.getElementById('category-edit-title').textContent = 'Add Category';
        document.getElementById('category-name').value = '';

        // Set first icon as active
        const iconOptions = document.querySelectorAll('.icon-option');
        iconOptions.forEach((option, index) => {
            option.classList.remove('active');
            if (index === 0) option.classList.add('active');
        });

        // Set first color as active
        const categoryColorOptions = document.querySelectorAll('#category-edit-screen .color-option');
        categoryColorOptions.forEach((option, index) => {
            option.classList.remove('active');
            if (index === 0) option.classList.add('active');
        });

        // Hide delete button
        document.getElementById('delete-category-btn').style.display = 'none';

        switchScreen('category-edit-screen');
    }

    function saveCategory() {
        const name = document.getElementById('category-name').value.trim();
        if (!name) {
            showToast('Please enter a name');
            return;
        }

        const activeIcon = document.querySelector('.icon-option.active');
        const icon = activeIcon ? activeIcon.textContent.trim() : '📁';

        const activeColor = document.querySelector('#category-edit-screen .color-option.active');
        const color = activeColor ? activeColor.getAttribute('data-color') : '#007AFF';

        if (currentEditingCategoryId) {
            // Edit existing category
            const category = allCategories.find(c => c.id === currentEditingCategoryId);
            if (category) {
                category.name = name;
                category.icon = icon;
                category.color = color;
            }
        } else {
            // Add new category
            const newCategory = {
                id: Date.now().toString(),
                name: name,
                icon: icon,
                color: color,
                defaultWallet: allWallets[0]?.id || '1'
            };
            allCategories.push(newCategory);
        }

        // Refresh all UI components
        refreshCategoriesList();
        refreshCategoryChips();
        refreshSearchFilters();

        showToast('Saved');
        setTimeout(() => {
            switchScreen('categories-screen');
        }, 500);
    }

    function deleteCategory() {
        if (!currentEditingCategoryId) return;

        const category = allCategories.find(c => c.id === currentEditingCategoryId);
        if (!category) return;

        // Confirm deletion
        if (!confirm(`Are you sure you want to delete ${category.name}?`)) {
            return;
        }

        // Remove category from array
        const index = allCategories.findIndex(c => c.id === currentEditingCategoryId);
        if (index > -1) {
            allCategories.splice(index, 1);
        }

        // Refresh all UI components
        refreshCategoriesList();
        refreshCategoryChips();
        refreshSearchFilters();

        showToast('Deleted');
        setTimeout(() => {
            switchScreen('categories-screen');
        }, 500);
    }

    // ==================== REFRESH CHIP SELECTORS ====================

    function refreshCategoryChips() {
        // Refresh category chips in Capture screen
        const captureContainer = document.querySelector('#capture-screen .chip-selector');
        if (captureContainer) {
            captureContainer.innerHTML = '';
            allCategories.forEach(category => {
                const chip = document.createElement('div');
                chip.className = 'chip';
                chip.setAttribute('data-category-id', category.id);
                chip.innerHTML = `
                    <span class="chip-icon" style="background-color: ${category.color};">${category.icon}</span>
                    <span class="chip-text">${category.name}</span>
                `;
                captureContainer.appendChild(chip);
            });
        }

        // Re-attach click handlers for category chips in Capture screen
        const captureChips = document.querySelectorAll('#capture-screen .chip');
        captureChips.forEach(chip => {
            chip.addEventListener('click', function() {
                captureChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Refresh category chips in Edit Entry screen
        const editContainer = document.querySelector('#edit-category-chips');
        if (editContainer) {
            editContainer.innerHTML = '';
            allCategories.forEach(category => {
                const chip = document.createElement('button');
                chip.className = 'chip';
                chip.setAttribute('data-category', category.id);
                chip.setAttribute('data-icon', category.icon);
                chip.setAttribute('data-color', category.color);
                chip.innerHTML = `
                    <span class="chip-icon">${category.icon}</span>
                    <span class="chip-label">${category.name}</span>
                `;
                editContainer.appendChild(chip);
            });
        }

        // Re-attach click handlers for edit entry chips
        const editChips = document.querySelectorAll('#edit-category-chips .chip');
        editChips.forEach(chip => {
            chip.addEventListener('click', function() {
                editChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    function refreshMemberChips() {
        // Refresh member chips in Capture screen
        const captureContainer = document.querySelector('#capture-screen .chip-selector-members');
        if (captureContainer) {
            captureContainer.innerHTML = '';
            allMembers.forEach(member => {
                const chip = document.createElement('div');
                chip.className = 'chip';
                chip.setAttribute('data-member-id', member.id);
                chip.innerHTML = `
                    <span class="chip-avatar" style="background-color: ${member.color};">${member.initials}</span>
                    <span class="chip-text">${member.name}</span>
                `;
                captureContainer.appendChild(chip);
            });
        }

        // Re-attach click handlers for member chips
        const captureChips = document.querySelectorAll('#capture-screen .chip-selector-members .chip');
        captureChips.forEach(chip => {
            chip.addEventListener('click', function() {
                captureChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Refresh member chips in Edit Entry screen
        const editContainer = document.querySelector('#edit-member-chips');
        if (editContainer) {
            editContainer.innerHTML = '';
            allMembers.forEach(member => {
                const chip = document.createElement('button');
                chip.className = 'chip';
                chip.setAttribute('data-member', member.id);
                chip.setAttribute('data-color', member.color);
                chip.innerHTML = `
                    <span class="chip-label">${member.name}</span>
                `;
                editContainer.appendChild(chip);
            });
        }

        // Re-attach click handlers for edit entry chips
        const editChips = document.querySelectorAll('#edit-member-chips .chip');
        editChips.forEach(chip => {
            chip.addEventListener('click', function() {
                editChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    function refreshSourceChips() {
        // Refresh source chips in Capture screen
        const captureContainer = document.querySelector('#capture-screen .chip-selector-source');
        if (captureContainer) {
            captureContainer.innerHTML = '';
            allWallets.forEach(wallet => {
                const chip = document.createElement('div');
                chip.className = 'chip';
                chip.setAttribute('data-source-id', wallet.id);
                chip.innerHTML = `
                    <span class="chip-icon" style="background-color: ${wallet.color};">💳</span>
                    <span class="chip-text">${wallet.name}</span>
                `;
                captureContainer.appendChild(chip);
            });
        }

        // Re-attach click handlers for source chips
        const captureChips = document.querySelectorAll('#capture-screen .chip-selector-source .chip');
        captureChips.forEach(chip => {
            chip.addEventListener('click', function() {
                captureChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Refresh source chips in Edit Entry screen
        const editContainer = document.querySelector('#edit-source-chips');
        if (editContainer) {
            editContainer.innerHTML = '';
            allWallets.forEach(wallet => {
                const chip = document.createElement('button');
                chip.className = 'chip';
                chip.setAttribute('data-source', wallet.id);
                chip.setAttribute('data-color', wallet.color);
                chip.innerHTML = `
                    <span class="chip-label">${wallet.name}</span>
                `;
                editContainer.appendChild(chip);
            });
        }

        // Re-attach click handlers for edit entry chips
        const editChips = document.querySelectorAll('#edit-source-chips .chip');
        editChips.forEach(chip => {
            chip.addEventListener('click', function() {
                editChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Refresh transfer screen selects
        const fromSelect = document.getElementById('transfer-from');
        const toSelect = document.getElementById('transfer-to');
        if (fromSelect && toSelect) {
            const fromValue = fromSelect.value;
            const toValue = toSelect.value;

            fromSelect.innerHTML = '<option value="">Select source</option>';
            toSelect.innerHTML = '<option value="">Select destination</option>';

            allWallets.forEach(wallet => {
                fromSelect.innerHTML += `<option value="${wallet.id}">${wallet.name}</option>`;
                toSelect.innerHTML += `<option value="${wallet.id}">${wallet.name}</option>`;
            });

            fromSelect.value = fromValue;
            toSelect.value = toValue;
        }
    }

    // Update the existing button handlers to use new functions
    document.getElementById('add-member-btn')?.addEventListener('click', openAddMember);
    document.getElementById('add-card-btn')?.addEventListener('click', openAddCard);
    document.getElementById('add-category-btn')?.addEventListener('click', openAddCategory);

    // Update save button handlers
    const saveMemberBtnNew = document.getElementById('save-member-btn');
    if (saveMemberBtnNew) {
        // Remove old listener by cloning the button
        const newSaveMemberBtn = saveMemberBtnNew.cloneNode(true);
        saveMemberBtnNew.parentNode.replaceChild(newSaveMemberBtn, saveMemberBtnNew);
        newSaveMemberBtn.addEventListener('click', saveMember);
    }

    const saveCardBtnNew = document.getElementById('save-card-btn');
    if (saveCardBtnNew) {
        const newSaveCardBtn = saveCardBtnNew.cloneNode(true);
        saveCardBtnNew.parentNode.replaceChild(newSaveCardBtn, saveCardBtnNew);
        newSaveCardBtn.addEventListener('click', saveCard);
    }

    const saveCategoryBtnNew = document.getElementById('save-category-btn');
    if (saveCategoryBtnNew) {
        const newSaveCategoryBtn = saveCategoryBtnNew.cloneNode(true);
        saveCategoryBtnNew.parentNode.replaceChild(newSaveCategoryBtn, saveCategoryBtnNew);
        newSaveCategoryBtn.addEventListener('click', saveCategory);
    }

    // Update delete button handlers
    const deleteMemberBtn = document.getElementById('delete-member-btn');
    if (deleteMemberBtn) {
        deleteMemberBtn.addEventListener('click', deleteMember);
    }

    const deleteCardBtn = document.getElementById('delete-card-btn');
    if (deleteCardBtn) {
        deleteCardBtn.addEventListener('click', deleteCard);
    }

    const deleteCategoryBtn = document.getElementById('delete-category-btn');
    if (deleteCategoryBtn) {
        deleteCategoryBtn.addEventListener('click', deleteCategory);
    }

    // Update member name input to update preview
    const memberNameInput = document.getElementById('member-name');
    if (memberNameInput) {
        memberNameInput.addEventListener('input', (e) => {
            const name = e.target.value;
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
            document.getElementById('member-avatar-preview').querySelector('span').textContent = initials;
        });
    }

    // Initialize Settings when page loads
    initializeSettings();

    // ==================== SEARCH FUNCTIONALITY ====================

    let searchFilters = {
        type: 'all',
        member: 'all',
        source: 'all',
        category: 'all'
    };

    // Refresh Search screen filters
    function refreshSearchFilters() {
        // Update Member filters
        const memberFiltersContainer = document.querySelector('[data-filter="member"]')?.parentElement;
        if (memberFiltersContainer) {
            memberFiltersContainer.innerHTML = '<button class="filter-chip active" data-filter="member" data-value="all">All</button>';
            allMembers.forEach(member => {
                const chip = document.createElement('button');
                chip.className = 'filter-chip';
                chip.setAttribute('data-filter', 'member');
                chip.setAttribute('data-value', member.id);
                chip.textContent = member.name;
                chip.addEventListener('click', handleFilterChipClick);
                memberFiltersContainer.appendChild(chip);
            });
        }

        // Update Source filters
        const sourceFiltersContainer = document.querySelector('[data-filter="source"]')?.parentElement;
        if (sourceFiltersContainer) {
            sourceFiltersContainer.innerHTML = '<button class="filter-chip active" data-filter="source" data-value="all">All</button>';
            allWallets.forEach(wallet => {
                const chip = document.createElement('button');
                chip.className = 'filter-chip';
                chip.setAttribute('data-filter', 'source');
                chip.setAttribute('data-value', wallet.id);
                chip.textContent = wallet.name;
                chip.addEventListener('click', handleFilterChipClick);
                sourceFiltersContainer.appendChild(chip);
            });
        }

        // Update Category filters
        const categoryFiltersContainer = document.querySelector('[data-filter="category"]')?.parentElement;
        if (categoryFiltersContainer) {
            categoryFiltersContainer.innerHTML = '<button class="filter-chip active" data-filter="category" data-value="all">All</button>';
            allCategories.forEach(category => {
                const chip = document.createElement('button');
                chip.className = 'filter-chip';
                chip.setAttribute('data-filter', 'category');
                chip.setAttribute('data-value', category.id);
                chip.textContent = `${category.icon} ${category.name}`;
                chip.addEventListener('click', handleFilterChipClick);
                categoryFiltersContainer.appendChild(chip);
            });
        }
    }

    // Filter chip click handler
    function handleFilterChipClick() {
        const filterType = this.getAttribute('data-filter');
        const filterValue = this.getAttribute('data-value');

        // Remove active from siblings
        const siblings = this.parentElement.querySelectorAll('.filter-chip');
        siblings.forEach(s => s.classList.remove('active'));

        // Add active to clicked chip
        this.classList.add('active');

        // Update filter
        searchFilters[filterType] = filterValue;

        // Perform search
        performSearch();
    }

    // Open search screen
    const openSearchBtn = document.getElementById('open-search-btn');
    if (openSearchBtn) {
        openSearchBtn.addEventListener('click', () => {
            switchScreen('search-screen');
            // Refresh filters with latest data
            refreshSearchFilters();
            // Focus search input
            setTimeout(() => {
                document.getElementById('search-input').focus();
            }, 300);
            // Perform initial search
            performSearch();
        });
    }

    // Search input
    const searchInput = document.getElementById('search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            // Show/hide clear button
            if (e.target.value.length > 0) {
                searchClearBtn.style.display = 'flex';
            } else {
                searchClearBtn.style.display = 'none';
            }
            // Perform search
            performSearch();
        });
    }

    // Clear search button
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchClearBtn.style.display = 'none';
            performSearch();
        });
    }

    // Filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            const filterValue = this.getAttribute('data-value');

            // Remove active from siblings
            const siblings = this.parentElement.querySelectorAll('.filter-chip');
            siblings.forEach(s => s.classList.remove('active'));

            // Add active to clicked chip
            this.classList.add('active');

            // Update filter
            searchFilters[filterType] = filterValue;

            // Perform search
            performSearch();
        });
    });

    // Clear all filters
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Reset all filters to 'all'
            searchFilters = {
                type: 'all',
                member: 'all',
                source: 'all',
                category: 'all'
            };

            // Reset all filter chips
            filterChips.forEach(chip => {
                chip.classList.remove('active');
                if (chip.getAttribute('data-value') === 'all') {
                    chip.classList.add('active');
                }
            });

            // Clear search input
            searchInput.value = '';
            searchClearBtn.style.display = 'none';

            // Perform search
            performSearch();
        });
    }

    // Perform search and filter
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const resultsList = document.getElementById('search-results-list');
        const emptyState = document.getElementById('search-empty-state');
        const resultsCount = document.getElementById('search-results-count');

        // Filter expenses based on search query and filters
        let results = allExpenses.filter(expense => {
            // Text search
            let matchesQuery = true;
            if (query) {
                const searchableText = `
                    ${expense.amount}
                    ${expense.category.name}
                    ${expense.source.name}
                    ${expense.member.name}
                    ${expense.note || ''}
                `.toLowerCase();
                matchesQuery = searchableText.includes(query);
            }

            // Type filter
            let matchesType = true;
            if (searchFilters.type !== 'all') {
                if (searchFilters.type === 'expense') {
                    matchesType = !expense.isTransfer;
                } else if (searchFilters.type === 'transfer') {
                    matchesType = expense.isTransfer;
                }
            }

            // Member filter
            let matchesMember = true;
            if (searchFilters.member !== 'all') {
                matchesMember = expense.member.id === searchFilters.member;
            }

            // Source filter
            let matchesSource = true;
            if (searchFilters.source !== 'all') {
                matchesSource = expense.source.id === searchFilters.source;
            }

            // Category filter
            let matchesCategory = true;
            if (searchFilters.category !== 'all') {
                matchesCategory = expense.category.id === searchFilters.category;
            }

            return matchesQuery && matchesType && matchesMember && matchesSource && matchesCategory;
        });

        // Clear results list
        resultsList.innerHTML = '';

        // Update count
        resultsCount.textContent = `${results.length} ${results.length === 1 ? 'item' : 'items'}`;

        // Show/hide empty state
        if (results.length === 0) {
            emptyState.style.display = 'flex';
            resultsList.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            resultsList.style.display = 'flex';

            // Populate results
            results.forEach(expense => {
                const resultItem = createSearchResultItem(expense);
                resultsList.appendChild(resultItem);
            });
        }
    }

    // Create search result item
    function createSearchResultItem(expense) {
        const item = document.createElement('div');
        item.className = 'expense-item';
        item.setAttribute('data-expense-id', expense.id);

        const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });

        // Determine display based on type
        let categoryDisplay = expense.category.name;
        let categoryIcon = expense.category.icon;

        if (expense.isTransfer) {
            categoryDisplay = 'Transfer';
            categoryIcon = '🔄';
        }

        item.innerHTML = `
            <div class="expense-thumbnail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            </div>
            <div class="expense-details">
                <div class="expense-amount">Rs ${formatCurrency(expense.amount)}</div>
                <div class="expense-meta">
                    <div class="expense-category">
                        <span>${categoryIcon}</span>
                        <span>${categoryDisplay}</span>
                    </div>
                    <span>•</span>
                    <div class="expense-source-icon" style="background-color: ${expense.source.color};"></div>
                    <span>${formattedDate}</span>
                </div>
            </div>
        `;

        // Add click event to open edit screen
        item.addEventListener('click', function() {
            if (expense.isTransfer) {
                // For transfers, show a toast (or could open a transfer detail screen)
                showToast('Transfer details');
            } else {
                openEditScreen(expense.id);
            }
        });

        return item;
    }

    // ==================== INSIGHTS FUNCTIONALITY ====================

    let currentInsightsMonth = new Date();

    // Month navigation
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const monthLabel = document.getElementById('insights-month-label');

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentInsightsMonth.setMonth(currentInsightsMonth.getMonth() - 1);
            updateInsightsScreen();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentInsightsMonth.setMonth(currentInsightsMonth.getMonth() + 1);
            updateInsightsScreen();
        });
    }

    // Update insights when navigating to Insights screen
    const insightsNavItem = document.querySelector('[data-screen="insights-screen"]');
    if (insightsNavItem) {
        insightsNavItem.addEventListener('click', () => {
            currentInsightsMonth = new Date();
            updateInsightsScreen();
        });
    }

    // Update insights screen with current month data
    function updateInsightsScreen() {
        // Update month label
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[currentInsightsMonth.getMonth()];
        const year = currentInsightsMonth.getFullYear();
        monthLabel.textContent = `${monthName} ${year}`;

        // Filter expenses for current month (exclude transfers)
        const monthExpenses = allExpenses.filter(expense => {
            if (expense.isTransfer) return false;
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === currentInsightsMonth.getMonth() &&
                   expenseDate.getFullYear() === currentInsightsMonth.getFullYear();
        });

        // Check if there's data
        const emptyState = document.getElementById('insights-empty-state');
        const summaryCards = document.querySelector('.insights-summary-cards');
        const chartContainers = document.querySelectorAll('.chart-container');
        const highlights = document.querySelector('.insights-highlights');

        if (monthExpenses.length === 0) {
            emptyState.style.display = 'flex';
            summaryCards.style.display = 'none';
            chartContainers.forEach(c => c.style.display = 'none');
            highlights.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        summaryCards.style.display = 'grid';
        chartContainers.forEach(c => c.style.display = 'block');
        highlights.style.display = 'block';

        // Calculate summary stats
        const totalExpenses = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const entriesCount = monthExpenses.length;

        // Find top category
        const categoryTotals = {};
        monthExpenses.forEach(exp => {
            if (!categoryTotals[exp.category.name]) {
                categoryTotals[exp.category.name] = 0;
            }
            categoryTotals[exp.category.name] += exp.amount;
        });
        const topCategory = Object.keys(categoryTotals).reduce((a, b) =>
            categoryTotals[a] > categoryTotals[b] ? a : b, '-');

        // Update summary cards
        document.getElementById('total-expenses-value').textContent = `Rs ${formatCurrency(totalExpenses)}`;
        document.getElementById('entries-count-value').textContent = entriesCount;
        document.getElementById('top-category-value').textContent = topCategory;

        // Render charts
        renderCategoryPieChart(monthExpenses);
        renderMemberBarChart(monthExpenses);
        renderCardRingCharts(monthExpenses);
        generateHighlights(monthExpenses);
    }

    // Render category pie chart
    function renderCategoryPieChart(expenses) {
        const pieChart = document.getElementById('category-pie-chart');
        const legend = document.getElementById('category-legend');

        // Calculate category totals
        const categoryData = {};
        expenses.forEach(exp => {
            const catId = exp.category.id;
            if (!categoryData[catId]) {
                categoryData[catId] = {
                    name: exp.category.name,
                    icon: exp.category.icon,
                    color: exp.category.color,
                    total: 0
                };
            }
            categoryData[catId].total += exp.amount;
        });

        const categories = Object.values(categoryData);
        const total = categories.reduce((sum, cat) => sum + cat.total, 0);

        // Clear existing chart
        pieChart.innerHTML = '';
        legend.innerHTML = '';

        if (total === 0) return;

        // Draw pie slices
        let currentAngle = -90; // Start from top
        categories.forEach((cat, index) => {
            const percentage = (cat.total / total) * 100;
            const angle = (cat.total / total) * 360;
            const endAngle = currentAngle + angle;

            // Create pie slice path
            const startX = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180);
            const startY = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180);
            const endX = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
            const endY = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
            const largeArc = angle > 180 ? 1 : 0;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArc} 1 ${endX} ${endY} Z`);
            path.setAttribute('fill', cat.color);
            path.setAttribute('class', 'pie-slice');
            path.setAttribute('data-category', cat.name);
            path.addEventListener('click', () => filterByCategory(cat.name));
            pieChart.appendChild(path);

            currentAngle = endAngle;

            // Create legend item
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.setAttribute('data-category', cat.name);
            legendItem.addEventListener('click', () => filterByCategory(cat.name));
            legendItem.innerHTML = `
                <div class="legend-color" style="background-color: ${cat.color};"></div>
                <span class="legend-label">${cat.icon} ${cat.name}</span>
                <span class="legend-value">Rs ${formatCurrency(cat.total)}</span>
            `;
            legend.appendChild(legendItem);
        });
    }

    // Render member bar chart
    function renderMemberBarChart(expenses) {
        const barChart = document.getElementById('member-bar-chart');

        // Calculate member totals
        const memberData = {};
        expenses.forEach(exp => {
            const memberId = exp.member.id;
            if (!memberData[memberId]) {
                memberData[memberId] = {
                    name: exp.member.name,
                    total: 0
                };
            }
            memberData[memberId].total += exp.amount;
        });

        const members = Object.values(memberData);
        const maxTotal = Math.max(...members.map(m => m.total));

        // Clear existing bars
        barChart.innerHTML = '';

        members.forEach(member => {
            const percentage = (member.total / maxTotal) * 100;

            const barItem = document.createElement('div');
            barItem.className = 'bar-item';
            barItem.setAttribute('data-member', member.name);
            barItem.addEventListener('click', () => filterByMember(member.name));
            barItem.innerHTML = `
                <div class="bar-header">
                    <span class="bar-member">${member.name}</span>
                    <span class="bar-amount">Rs ${formatCurrency(member.total)}</span>
                </div>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${percentage}%;"></div>
                </div>
            `;
            barChart.appendChild(barItem);
        });
    }

    // Render card ring charts
    function renderCardRingCharts(expenses) {
        const ringCharts = document.getElementById('card-ring-charts');
        ringCharts.innerHTML = '';

        // Calculate card totals (only for cards with limits)
        allWallets.forEach(wallet => {
            if (!wallet.limit) return; // Skip wallets without limits

            const cardExpenses = expenses.filter(exp => exp.source.id === wallet.id);
            const spent = cardExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            const percentage = (spent / wallet.limit) * 100;
            const cappedPercentage = Math.min(percentage, 100);

            // Create ring chart
            const ringItem = document.createElement('div');
            ringItem.className = 'ring-item';
            ringItem.setAttribute('data-wallet', wallet.id);
            ringItem.addEventListener('click', () => filterByWallet(wallet.name));

            const circumference = 2 * Math.PI * 35; // radius = 35
            const offset = circumference - (cappedPercentage / 100) * circumference;

            ringItem.innerHTML = `
                <svg class="ring-chart" viewBox="0 0 100 100">
                    <circle class="ring-background" cx="50" cy="50" r="35" stroke-width="10"></circle>
                    <circle class="ring-progress" cx="50" cy="50" r="35" stroke-width="10"
                        stroke="${wallet.color}"
                        stroke-dasharray="${circumference}"
                        stroke-dashoffset="${offset}"
                        transform="rotate(-90 50 50)"></circle>
                    <text class="ring-center-text" x="50" y="55" text-anchor="middle">${Math.round(percentage)}%</text>
                </svg>
                <div class="ring-label">${wallet.name}</div>
                <div class="ring-sublabel">Rs ${formatCurrency(spent)} / Rs ${formatCurrency(wallet.limit)}</div>
            `;
            ringCharts.appendChild(ringItem);
        });

        // If no cards with limits, show message
        if (ringCharts.children.length === 0) {
            ringCharts.innerHTML = '<p style="color: #999; text-align: center;">No credit cards tracked</p>';
        }
    }

    // Generate highlights
    function generateHighlights(expenses) {
        const highlightsList = document.getElementById('highlights-list');
        highlightsList.innerHTML = '';

        const highlights = [];

        // Compare with last month
        const lastMonth = new Date(currentInsightsMonth);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthExpenses = allExpenses.filter(exp => {
            if (exp.isTransfer) return false;
            const expDate = new Date(exp.date);
            return expDate.getMonth() === lastMonth.getMonth() &&
                   expDate.getFullYear() === lastMonth.getFullYear();
        });

        // Category comparison
        const currentCategoryTotals = {};
        expenses.forEach(exp => {
            currentCategoryTotals[exp.category.name] = (currentCategoryTotals[exp.category.name] || 0) + exp.amount;
        });

        const lastCategoryTotals = {};
        lastMonthExpenses.forEach(exp => {
            lastCategoryTotals[exp.category.name] = (lastCategoryTotals[exp.category.name] || 0) + exp.amount;
        });

        Object.keys(currentCategoryTotals).forEach(cat => {
            const current = currentCategoryTotals[cat];
            const last = lastCategoryTotals[cat] || 0;
            if (current > last * 1.2) {
                highlights.push(`${cat} spending up ${Math.round((current - last) / last * 100)}% vs last month`);
            }
        });

        // Card limit warnings
        allWallets.forEach(wallet => {
            if (!wallet.limit) return;
            const cardExpenses = expenses.filter(exp => exp.source.id === wallet.id);
            const spent = cardExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            const percentage = (spent / wallet.limit) * 100;

            if (percentage > 75) {
                highlights.push(`${wallet.name} at ${Math.round(percentage)}% of limit`);
            }
        });

        // Wallet usage frequency
        const walletUsage = {};
        expenses.forEach(exp => {
            walletUsage[exp.source.name] = (walletUsage[exp.source.name] || 0) + 1;
        });

        Object.entries(walletUsage).forEach(([wallet, count]) => {
            if (count >= 5) {
                highlights.push(`${wallet} used ${count} times this month`);
            }
        });

        // Top spending day
        const dayTotals = {};
        expenses.forEach(exp => {
            const day = new Date(exp.date).toLocaleDateString('en-US', { weekday: 'long' });
            dayTotals[day] = (dayTotals[day] || 0) + exp.amount;
        });
        const topDay = Object.keys(dayTotals).reduce((a, b) => dayTotals[a] > dayTotals[b] ? a : b, null);
        if (topDay) {
            highlights.push(`${topDay}s are your highest spending day`);
        }

        // Render highlights
        if (highlights.length === 0) {
            highlights.push('No notable patterns this month');
        }

        highlights.forEach(text => {
            const item = document.createElement('div');
            item.className = 'highlight-item';
            item.innerHTML = `
                <div class="highlight-bullet"></div>
                <div class="highlight-text">${text}</div>
            `;
            highlightsList.appendChild(item);
        });
    }

    // Filter functions (reuse Search screen)
    function filterByCategory(categoryName) {
        // Navigate to search screen with category filter
        switchScreen('search-screen');
        searchFilters.category = 'all';

        // Find category ID
        const categoryMap = {
            'Food': '1',
            'Transport': '2',
            'Groceries': '3',
            'Home': '4',
            'Utilities': '5'
        };
        const categoryId = categoryMap[categoryName];
        if (categoryId) {
            searchFilters.category = categoryId;
            // Update filter chips
            const filterChips = document.querySelectorAll('[data-filter="category"]');
            filterChips.forEach(chip => {
                chip.classList.remove('active');
                if (chip.getAttribute('data-value') === categoryId) {
                    chip.classList.add('active');
                }
            });
        }
        performSearch();
    }

    function filterByMember(memberName) {
        switchScreen('search-screen');
        searchFilters.member = 'all';

        const memberMap = {
            'John Doe': '1',
            'Jane Doe': '2'
        };
        const memberId = memberMap[memberName];
        if (memberId) {
            searchFilters.member = memberId;
            const filterChips = document.querySelectorAll('[data-filter="member"]');
            filterChips.forEach(chip => {
                chip.classList.remove('active');
                if (chip.getAttribute('data-value') === memberId) {
                    chip.classList.add('active');
                }
            });
        }
        performSearch();
    }

    function filterByWallet(walletName) {
        switchScreen('search-screen');
        searchFilters.source = 'all';

        const wallet = allWallets.find(w => w.name === walletName);
        if (wallet) {
            searchFilters.source = wallet.id;
            const filterChips = document.querySelectorAll('[data-filter="source"]');
            filterChips.forEach(chip => {
                chip.classList.remove('active');
                if (chip.getAttribute('data-value') === wallet.id) {
                    chip.classList.add('active');
                }
            });
        }
        performSearch();
    }
});
