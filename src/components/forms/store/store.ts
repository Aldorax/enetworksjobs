// src/store.ts
import create from "zustand";

type FormState = {
  step: number;
  formData: FormData;
};

export const useFormStore = create<FormState>(set => ({
  step: 0,
  formData: new FormData(),
  setStep: (step: number) => set(() => ({ step })),
  addFormData: (key: string, value: any) =>
    set(state => ({ formData: state.formData.append(key, value) }))
}));
