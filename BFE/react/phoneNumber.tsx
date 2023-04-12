import React, { useState, useRef, useEffect, useCallback } from "react";

export function PhoneNumberInput() {
  // your code here
  const $input = useRef<HTMLInputElement>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectionStart, setSelectionStart] =
    useState<HTMLInputElement["selectionStart"]>(null);
  const setState = useCallback((value, selectionStart?) => {
    setPhoneNumber(value);
    selectionStart !== undefined && setSelectionStart(selectionStart);
  }, []);

  useEffect(() => {
    if ($input.current) {
      $input.current.selectionStart = selectionStart;
      $input.current.selectionEnd = selectionStart;
    }
  }, [selectionStart]);

  return (
    <input
      data-testid="phone-number-input"
      type="tel"
      ref={$input}
      onChange={(e) => {
        let { value, selectionStart } = e.target as HTMLInputElement;

        value = value.replace(/\(|\)|\-/g, "");

        if (/\D/.test(value)) {
          return;
        }

        value = value.slice(0, 10);

        if (value.length < 4) {
          setState(value, selectionStart);
          return;
        }

        if (value.length < 7) {
          const result = value.replace(/(\d{3})(\d{0,3})/, "($1)$2");

          if (selectionStart === phoneNumber.length) {
            setState(result);
          } else {
            setState(result, selectionStart);
          }
          return;
        }

        const result = value.replace(/(\d{3})(\d{3})(\d*)/, "($1)$2-$3");
        if (selectionStart === phoneNumber.length) {
          setState(result);
        } else {
          setState(result, selectionStart);
        }
      }}
      value={phoneNumber}
    />
  );
}

// if you want to try your code on the right panel
// remember to export App() component like below

export function App() {
  return (
    <div>
      <PhoneNumberInput />
    </div>
  );
}
