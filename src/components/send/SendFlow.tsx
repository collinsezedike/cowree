import { useState } from "react";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { StepChain } from "./StepChain";
import { StepRecipient } from "./StepRecipient";
import { StepReview } from "./StepReview";
import { StepComplete } from "./StepComplete";
import { SendFormData } from "@/types";

const STEPS = [
  { label: "Chain & Token" },
  { label: "Recipient" },
  { label: "Pay" },
];

const DEFAULT_FORM: SendFormData = {
  senderChain: "ethereum",
  senderToken: "USDC",
  amount: "",
  recipientAddress: "",
  recipientName: "",
  note: "",
};

export function SendFlow() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<SendFormData>(DEFAULT_FORM);

  const updateForm = (patch: Partial<SendFormData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  return (
    <div className="max-w-lg mx-auto">
      {step < 3 && (
        <div className="mb-8">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>
      )}

      <div className="card">
        {step === 0 && (
          <StepChain form={form} onChange={updateForm} onNext={() => setStep(1)} />
        )}
        {step === 1 && (
          <StepRecipient
            form={form}
            onChange={updateForm}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepReview
            form={form}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepComplete
            form={form}
            onNewTransfer={() => {
              setForm(DEFAULT_FORM);
              setStep(0);
            }}
          />
        )}
      </div>
    </div>
  );
}
