"use client";

/**
 * AppSpinner - Application Wrapper Component
 *
 * Theme-aware wrapper around Kibo UI Spinner component.
 * This wrapper ensures consistent theming and styling across the application.
 *
 * IMPORTANT: Import this component in app routes, NOT the raw Kibo UI component.
 */

import { Spinner, type SpinnerProps } from "@/components/kibo-ui/spinner";

export type AppSpinnerProps = SpinnerProps;

export function AppSpinner(props: AppSpinnerProps) {
  return <Spinner {...props} />;
}
