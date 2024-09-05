document.addEventListener('DOMContentLoaded', function() {
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
  const modalCloseButtons = document.querySelectorAll('.delete, .cancel, .modal-background');
  const errorTooltip = document.getElementById('error-tooltip');
  const successTooltip = document.getElementById('success-tooltip');

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

  // Function to check if the form has changed
  function hasFormChanged() {
    const clientSelect = document.getElementById('clientSelect');
    const visitorsInput = document.getElementById('visitors');
    const stayDateInput = document.getElementById('stayDate');

    if (!clientSelect || !visitorsInput || !stayDateInput) {
      console.warn('Champs de formulaire manquants.');
      return false;
    }

    return clientSelect.value !== initialFormValues.client || 
           visitorsInput.value !== initialFormValues.visitors || 
           stayDateInput.value !== initialFormValues.date;
  }

  // Function to enable form editing with pre-filled data
  function enableFormEditing(bookingData) {
    const clientSelect = document.getElementById('clientSelect');
    const visitorsInput = document.getElementById('visitors');
    const stayDateInput = document.getElementById('stayDate');

    if (clientSelect && visitorsInput && stayDateInput && updateButton) {
      clientSelect.disabled = false;
      visitorsInput.disabled = false;
      stayDateInput.disabled = false;
      updateButton.disabled = false;

      clientSelect.value = bookingData.clientId;
      visitorsInput.value = bookingData.visitors;
      stayDateInput.value = new Date(bookingData.date).toISOString().split('T')[0];

      initialFormValues = {
        client: clientSelect.value,
        visitors: visitorsInput.value,
        date: stayDateInput.value
      };

      currentBookingId = bookingData.id;
      updateForm.action = `/admin/update-booking/${currentBookingId}`;
    } else {
      console.warn('Impossible d\'activer l\'édition, certains éléments du formulaire sont manquants.');
    }
  }

  // Function to filter reservations based on search input
  function filterReservations() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    document.querySelectorAll('.reservation-item').forEach(item => {
      const text = item.textContent.trim().toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  }

  // ============================
  // Event Handlers
  // ============================

  // Delete booking confirmation
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function() {
      if (bookingIdToDelete) {
        deleteBookingId.value = bookingIdToDelete;
        deleteForm.action = `/admin/delete-booking/${bookingIdToDelete}`;
        deleteForm.submit();
      }
      toggleModal(deleteModal, false);
    });
  }

  // Confirm edit action
  if (confirmEditBtn) {
    confirmEditBtn.addEventListener('click', function() {
      if (updateForm) updateForm.submit();
      toggleModal(editConfirmModal, false);
    });
  }

  // Close modals on cancel or close button click
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
      toggleModal(button.closest('.modal'), false);
    });
  });

  // Search input filtering
  if (searchInput) {
    searchInput.addEventListener('keyup', filterReservations);
  }

  // Edit booking button click event
  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', function() {
      const bookingData = {
        id: this.getAttribute('data-booking-id'),
        clientId: this.getAttribute('data-client-id'),
        visitors: this.getAttribute('data-nb-tickets'),
        date: this.getAttribute('data-booking-date')
      };

      enableFormEditing(bookingData);
    });
  });

  // Update button click event
  if (updateButton) {
    updateButton.addEventListener('click', function(event) {
      event.preventDefault();
      if (!currentBookingId) {
        // Afficher un message d'erreur si aucune réservation n'est sélectionnée
        if (errorTooltip) {
          errorTooltip.textContent = 'Veuillez sélectionner une réservation à modifier.';
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
    createButton.addEventListener('click', function() {
      // Reset form fields
      const clientSelect = document.getElementById('clientSelect');
      const visitorsInput = document.getElementById('visitors');
      const stayDateInput = document.getElementById('stayDate');

      if (clientSelect && visitorsInput && stayDateInput) {
        clientSelect.disabled = false;
        clientSelect.value = '';
        visitorsInput.disabled = false;
        visitorsInput.value = '';
        stayDateInput.disabled = false;
        stayDateInput.value = '';

        // Update form button text
        updateButton.disabled = false;
        updateButton.textContent = 'Créer réservation';

        // Update form action for creating a new booking
        updateForm.action = '/admin/create-booking';

        // Open confirmation modal on update button click
        updateButton.addEventListener('click', function() {
          toggleModal(editConfirmModal, true);
        });
      }
    });
  }

  // Delete booking button click event
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
      bookingIdToDelete = this.getAttribute('data-booking_id');
      toggleModal(deleteModal, true);
    });
  });

  // ============================
  // Initialization
  // ============================

  // Ensure all critical DOM elements are present
  if (!deleteModal || !editConfirmModal || !confirmDeleteBtn || !confirmEditBtn || !updateButton || !deleteForm || !deleteBookingId || !updateForm) {
    console.warn('Certains éléments nécessaires sont manquants dans le DOM.');
    return; // Stop script execution if critical elements are missing
  }
});
