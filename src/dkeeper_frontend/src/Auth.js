import { AuthClient } from "@dfinity/auth-client";

export const loginWithInternetIdentity = async () => {
  const authClient = await AuthClient.create();

  if (!(await authClient.isAuthenticated())) {
    // Return a Promise that resolves when login is successful
    return new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: "https://identity.ic0.app", // II provider URL
        onSuccess: () => {
          console.log("Login completed!");
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toText();
          console.log(principal);
          resolve(principal); // Resolve with the principal
        },
        onError: (err) => {
          console.error("Login failed:", err);
          reject(err); // Reject the promise if login fails
        },
      });
    });
  } else {
    console.log("User is already authenticated.");
    const identity = authClient.getIdentity();
    const principal = identity.getPrincipal().toText();
    return principal; // Return the principal directly if already authenticated
  }
};

export const logout = async () => {
  const authClient = await AuthClient.create();
  await authClient.logout();
  console.log("Logged out successfully!");
};

export const isAuthenticated = async () => {
  const authClient = await AuthClient.create();
  return authClient.isAuthenticated();
};
