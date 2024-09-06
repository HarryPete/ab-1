"use client";

import { SnackbarProvider } from "notistack";

const SnackbarProviderWrapper = ({ children }) => {
  return (
    <SnackbarProvider anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarProviderWrapper;