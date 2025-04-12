"use client";

import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingSpinnerProps {
  color?: string;
  loading?: boolean;
  size?: number;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export default function Loading({
  color = "#F67C2D",
  loading,
  size = 15,
}: LoadingSpinnerProps) {
  return (
    <ClipLoader
      loading={loading}
      cssOverride={override}
      color={color}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
