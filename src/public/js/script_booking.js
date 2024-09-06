document.addEventListener('DOMContentLoaded', function () {
  // ============================
  // Initial Setup and Variables
  // ============================

  // Variables
  let initialFormValues = {};
  let bookingIdToDelete = null;
  let currentBookingId = null;

  // DOM Elements
  const searchInput = document.getElementById('search');
  const deleteModal = document.getElementById('deleteModal');
  const editConfirmModal = document.getElementById('editConfirmModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const confirmEditBtn = document.getElementById('confirmEditBtn');
  const updateButton = document.getElementById('updateButton');
  const createButton = document.querySelector('#create-button');
  const deleteForm = document.getElementById('deleteForm');
  const deleteBookingId = document.getElementById('deleteBookingId');
  const updateForm = document.getElementById('updateForm');
  const modalCloseButtons = document.querySelectorAll(
    '.delete, .cancel, .modal-background'
  );
  const errorTooltip = document.getElementById('error-tooltip');
  const successTooltip = document.getElementById('success-tooltip');
  const stayDateInput = document.getElementById('stayDate');
  const clientSelect = document.getElementById('clientSelect');
  const visitorsInput = document.getElementById('visitors');
  const bookingStatusSelect = document.getElementById('bookingStatus');

  // ============================
  // Error and Success Handling
  // ============================

  // Masquer l'infobulle d'erreur après 5 secondes
  if (errorTooltip && !errorTooltip.classList.contains('is-hidden')) {
    setTimeout(() => {
      errorTooltip.classList.add('is-hidden');
    }, 5000);
  }

  // Masquer l'infobulle de succès après 5 secondes
  if (successTooltip && !successTooltip.classList.contains('is-hidden')) {
    setTimeout(() => {
      successTooltip.classList.add('is-hidden');
    }, 5000);
  }

  // ============================
  // Utility Functions
  // ============================

  // Function to toggle modal visibility
  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
    }
  }

  // Function to get today's date in yyyy-mm-dd format
  function getTodayDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Function to check if the selected date is in the pastfunction checkDate() {
  function checkDate() {
    const selectedDate = new Date(stayDateInput.value);
    const today = new Date(getTodayDate());

    // If selected date is before today, reset to today's date and show tooltip
    if (selectedDate < today) {
      stayDateInput.value = getTodayDate();
      showTooltip(
        "La date sélectionnée est antérieure à aujourd'hui. Elle a été remplacée par la date du jour."
      );
    }
  }

  // Function to show tooltip with error message
  function showTooltip(message) {
    if (errorTooltip) {
      errorTooltip.textContent = message;
      errorTooltip.classList.remove('is-hidden');

      // Hide tooltip after 5 seconds
      setTimeout(() => {
        errorTooltip.classList.add('is-hidden');
      }, 5000);
    }
  }

  // Function to check if the form has changed
  function hasFormChanged() {
    if (
      !clientSelect ||
      !visitorsInput ||
      !stayDateInput ||
      !bookingStatusSelect
    ) {
      console.warn('Champs de formulaire manquants.');
      return false;
    }

    return (
      clientSelect.value !== initialFormValues.client ||
      visitorsInput.value !== initialFormValues.visitors ||
      stayDateInput.value !== initialFormValues.date ||
      bookingStatusSelect.value !== initialFormValues.status
    );
  }

  // Function to enable form editing with pre-filled data
  function enableFormEditing(bookingData) {
    if (
      clientSelect &&
      visitorsInput &&
      stayDateInput &&
      bookingStatusSelect &&
      updateButton
    ) {
      clientSelect.disabled = false;
      visitorsInput.disabled = false;
      stayDateInput.disabled = false;
      bookingStatusSelect.disabled = false; // Enable status field
      updateButton.disabled = false;

      console.log(bookingData.status);

      clientSelect.value = bookingData.clientId;
      visitorsInput.value = bookingData.visitors;
      stayDateInput.value = new Date(bookingData.date)
        .toISOString()
        .split('T')[0];
      bookingStatusSelect.value = bookingData.status; // Set the booking status

      initialFormValues = {
        client: clientSelect.value,
        visitors: visitorsInput.value,
        date: stayDateInput.value,
        status: bookingStatusSelect.value, // Save the initial status value
      };

      currentBookingId = bookingData.id;
      updateForm.action = `/admin/update-booking/${currentBookingId}`;
    } else {
      console.warn(
        "Impossible d'activer l'édition, certains éléments du formulaire sont manquants."
      );
    }
  }

  // Function to filter reservations based on search input
  function filterReservations() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    document.querySelectorAll('.reservation-item').forEach((item) => {
      const text = item.textContent.trim().toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  }

  // ============================
  // Event Handlers
  // ============================

  // Delete booking confirmation
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function () {
      if (bookingIdToDelete) {
        deleteBookingId.value = bookingIdToDelete;
        deleteForm.action = `/admin/delete-booking/${bookingIdToDelete}`;
        deleteForm.submit();
      }
      toggleModal(deleteModal, false);
    });
  }

  // Add event listener to check if the selected date is in the past
  if (stayDateInput) {
    stayDateInput.addEventListener('change', function () {
      checkDate();
    });
  }

  // Confirm edit action
  if (confirmEditBtn) {
    confirmEditBtn.addEventListener('click', function () {
      if (updateForm) updateForm.submit();
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
    searchInput.addEventListener('keyup', filterReservations);
  }

  // Edit booking button click event
  document.querySelectorAll('.edit-button').forEach((button) => {
    button.addEventListener('click', function () {
      const bookingData = {
        id: this.getAttribute('data-booking-id'),
        clientId: this.getAttribute('data-client-id'),
        visitors: this.getAttribute('data-nb-tickets'),
        date: this.getAttribute('data-booking-date'),
        status: this.getAttribute('data-booking-status'),
      };

      enableFormEditing(bookingData);
    });
  });

  // Update button click event
  if (updateButton) {
    updateButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (!currentBookingId) {
        // Afficher un message d'erreur si aucune réservation n'est sélectionnée
        if (errorTooltip) {
          errorTooltip.textContent =
            'Veuillez sélectionner une réservation à modifier.';
          errorTooltip.classList.remove('is-hidden');

          // Masquer l'infobulle après 5 secondes
          setTimeout(() => {
            errorTooltip.classList.add('is-hidden');
          }, 5000);
        }
        return;
      }

      if (hasFormChanged()) {
        toggleModal(editConfirmModal, true);
      } else {
        // Affiche le message d'erreur avec le système de tooltip
        if (errorTooltip) {
          errorTooltip.textContent = 'Aucune modification détectée.';
          errorTooltip.classList.remove('is-hidden');

          // Masquer l'infobulle après 5 secondes
          setTimeout(() => {
            errorTooltip.classList.add('is-hidden');
          }, 5000);
        }
      }
    });
  }

  // Create new booking button click event
  if (createButton) {
    createButton.addEventListener('click', function () {
      if (
        clientSelect &&
        visitorsInput &&
        stayDateInput &&
        bookingStatusSelect
      ) {
        clientSelect.disabled = false;
        clientSelect.value = '';
        visitorsInput.disabled = false;
        visitorsInput.value = '';
        stayDateInput.disabled = false;
        stayDateInput.value = '';
        bookingStatusSelect.disabled = false; // Enable status field
        bookingStatusSelect.value = 'pending'; // Default to pending

        updateButton.disabled = false;
        updateButton.textContent = 'Créer réservation';

        updateForm.action = '/admin/create-booking';

        updateButton.addEventListener('click', function () {
          toggleModal(editConfirmModal, true);
        });
      }
    });
  }

  // Delete booking button click event
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', function () {
      bookingIdToDelete = this.getAttribute('data-booking_id');
      toggleModal(deleteModal, true);
    });
  });

  // ============================
  // Initialization
  // ============================

  // Ensure all critical DOM elements are present
  if (
    !deleteModal ||
    !editConfirmModal ||
    !confirmDeleteBtn ||
    !confirmEditBtn ||
    !updateButton ||
    !deleteForm ||
    !deleteBookingId ||
    !updateForm ||
    !searchInput ||
    !clientSelect ||
    !visitorsInput ||
    !stayDateInput ||
    !bookingStatusSelect ||
    !createButton ||
    !updateButton ||
    !errorTooltip ||
    !successTooltip
  ) {
    console.warn(
      'Some critical elements are missing in the DOM for member panel admin.'
    );
    return; // Stop script execution if critical elements are missing
  }
});
