document.addEventListener('DOMContentLoaded', function () {
  // ============================
  // Initial Setup and Variables
  // ============================

  // Variables
  let initialFormValues = {};
  let memberIdToDelete = null;
  let currentMemberId = null;

  // DOM Elements
  const searchInput = document.getElementById('search');
  const deleteModal = document.getElementById('deleteModal');
  const editConfirmModal = document.getElementById('editConfirmModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const confirmEditBtn = document.getElementById('confirmEditBtn');
  const updateButton = document.getElementById('updateButton');
  const deleteForm = document.getElementById('deleteForm');
  const deleteMemberId = document.getElementById('deleteMemberId');
  const updateForm = document.getElementById('updateForm');
  const modalCloseButtons = document.querySelectorAll('.delete, .cancel, .modal-background');
  const errorTooltip = document.getElementById('error-tooltip');
  const successTooltip = document.getElementById('success-tooltip');

  // ============================
  // Error and Success Handling
  // ============================

  if (errorTooltip && !errorTooltip.classList.contains('is-hidden')) {
    setTimeout(() => {
      errorTooltip.classList.add('is-hidden');
    }, 5000);
  }

  if (successTooltip && !successTooltip.classList.contains('is-hidden')) {
    setTimeout(() => {
      successTooltip.classList.add('is-hidden');
    }, 5000);
  }

  // ============================
  // Utility Functions
  // ============================

  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
    }
  }

  function hasFormChanged() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');

    if (!firstNameInput || !lastNameInput || !emailInput) {
      console.warn('Form fields are missing.');
      return false;
    }

    return (
      firstNameInput.value !== initialFormValues.firstName ||
      lastNameInput.value !== initialFormValues.lastName ||
      emailInput.value !== initialFormValues.email
    );
  }

  function enableFormEditing(memberData) {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');

    if (firstNameInput && lastNameInput && emailInput && updateButton) {
      firstNameInput.disabled = false;
      lastNameInput.disabled = false;
      emailInput.disabled = false;
      updateButton.disabled = false;

      firstNameInput.value = memberData.firstName;
      lastNameInput.value = memberData.lastName;
      emailInput.value = memberData.email;

      initialFormValues = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
      };

      currentMemberId = memberData.id;
      updateForm.action = `/admin/update-member/${currentMemberId}`;
    } else {
      console.warn("Unable to activate editing; some form elements are missing.");
    }
  }

  function filterMembers() {
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    document.querySelectorAll(".member-item").forEach((item) => {
      const text = item.textContent.trim().toLowerCase();
      item.style.display = text.includes(query) ? "" : "none";
    });
  }

  // ============================
  // Event Handlers
  // ============================

  // Delete member confirmation
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function () {
      if (memberIdToDelete) {
        deleteMemberId.value = memberIdToDelete;
        deleteForm.action = `/admin/delete-member/${memberIdToDelete}`;
        deleteForm.submit();
      }
      toggleModal(deleteModal, false);
    });
  }

  // Confirm edit action
  if (confirmEditBtn) {
    confirmEditBtn.addEventListener('click', function () {
      if (updateForm) {
        updateForm.submit();
      }
      toggleModal(editConfirmModal, false);
    });
  }

  // Close modals on cancel or close button click
  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', function () {
      toggleModal(button.closest('.modal'), false);
    });
  });

  // Search input filtering
  if (searchInput) {
    searchInput.addEventListener('keyup', filterMembers);
  }

  // Edit member button click event
  document.querySelectorAll('.edit-button').forEach((button) => {
    button.addEventListener('click', function () {
      const memberData = {
        id: this.getAttribute('data-member-id'),
        firstName: this.getAttribute('data-first-name'),
        lastName: this.getAttribute('data-last-name'),
        email: this.getAttribute('data-email'),
      };

      enableFormEditing(memberData);
    });
  });

  // Update button click event
  if (updateButton) {
    updateButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (!currentMemberId) {
        if (errorTooltip) {
          errorTooltip.textContent = 'Veuillez sélectionner un membre à modifier.';
          errorTooltip.classList.remove('is-hidden');

          setTimeout(() => {
            errorTooltip.classList.add('is-hidden');
          }, 5000);
        }
        return;
      }

      if (hasFormChanged()) {
        toggleModal(editConfirmModal, true);
      } else {
        if (errorTooltip) {
          errorTooltip.textContent = 'Aucune modification détectée.';
          errorTooltip.classList.remove('is-hidden');

          setTimeout(() => {
            errorTooltip.classList.add('is-hidden');
          }, 5000);
        }
      }
    });
  }

  // Delete member button click event
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', function () {
      memberIdToDelete = this.getAttribute('data-member-id');
      toggleModal(deleteModal, true);
    });
  });

  // ============================
  // Initialization
  // ============================

  if (!deleteModal || !editConfirmModal || !confirmDeleteBtn || !confirmEditBtn || !updateButton || !deleteForm || !deleteMemberId || !updateForm) {
    console.warn('Some critical elements are missing in the DOM for booking panel admin.');
    return; // Stop script execution if critical elements are missing
  }
});
