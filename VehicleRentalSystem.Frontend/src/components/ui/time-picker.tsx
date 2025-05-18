"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./time-picker-input";

interface TimePickerProps {
  date: Date | undefined;
  tpDisabled: boolean;
  textVisible?: boolean;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, tpDisabled, textVisible = true, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        {textVisible && (
          <Label htmlFor="hours" className="text-xs">
            Sati
          </Label>
        )}
        <TimePickerInput
          disabled={tpDisabled}
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        {textVisible && (
          <Label htmlFor="minutes" className="text-xs">
            Minute
          </Label>
        )}
        <TimePickerInput
          picker="minutes"
          id="minutes12"
          disabled={tpDisabled}
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
    </div>
  );
}
