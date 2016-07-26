let connectedToServer = true;

export const disconnectedFromServer = () => {
  connectedToServer = false;
};

export default {
  /**
   * Method used to get information if the client side navigation is allowed
   * This method return false when the session with the server is timed out
   * and no interaction with the application is allowed
   */
  allowNavigation() {
    return connectedToServer;
  },
};
