/* global toastr */

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const NotificationsService = {
  success(message, title) {
    toastr.success(message, title);
  },

  info(message, title) {
    toastr.info(message, title);
  },

  warning(message, title) {
    toastr.warning(message, title);
  },

  error(message, title) {
    toastr.error(message, title);
  },
};

export default NotificationsService;
