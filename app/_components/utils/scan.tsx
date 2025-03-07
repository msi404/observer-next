"use client";
import { scan } from "react-scan";
import { JSX, useEffect } from "react";

export function Scan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);

  return <></>;
}