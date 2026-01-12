import React from 'react';
import { FORM_SHAPES_CONFIG, getStepsConfigForFormShape } from './form-shapes-config';
import { loadStepComponent } from './loadStepComponent';

/**
 * Render form steps dynamically based on form shape
 * @param formShape - Form shape identifier
 * @param currentStep - Current active step ID
 * @param setStep - Function to update current step
 * @param category - Category slug/role
 * @param optionalFields - Optional fields array
 * @param mandatoryFields - Mandatory fields array
 * @param residencyStatusTypes - Residency status types array
 * @param withOtp - Whether OTP is enabled
 * @param withSmsOtp - Whether SMS OTP is enabled
 * @param withAlternativeEmail - Whether alternative email is enabled
 * @param router - Next.js router instance
 * @param lang - Current language
 * @param guestEmail - Guest email (prefill)
 * @param guestFirstName - Guest first name (prefill)
 * @param guestLastName - Guest last name (prefill)
 * @param guestCompany - Guest company (prefill)
 * @param guestPosition - Guest position (prefill)
 * @param guestPhone - Guest phone (prefill)
 * @param guestTitleId - Guest title ID (prefill)
 * @param prefilldata - Prefill data
 * @param lock_data - Lock data
 * @param token - Invitation token
 */
export const renderFormSteps = ({
   formShape,
   currentStep,
   setStep,
   category,
   optionalFields,
   mandatoryFields,
   residencyStatusTypes,
   withOtp,
   withSmsOtp,
   withAlternativeEmail,
   router,
   lang,
   guestEmail,
   guestFirstName,
   guestLastName,
   guestCompany,
   guestPosition,
   guestPhone,
   guestTitleId,
   prefilldata,
   lock_data,
   token,
}: {
   formShape: string | null | undefined;
   currentStep: string;
   setStep: (step: string) => void;
   category?: string;
   optionalFields?: string[];
   mandatoryFields?: string[];
   residencyStatusTypes?: string[];
   withOtp?: boolean;
   withSmsOtp?: boolean;
   withAlternativeEmail?: boolean;
   router: any;
   lang: string;
   guestEmail?: string | null;
   guestFirstName?: string | null;
   guestLastName?: string | null;
   guestCompany?: string | null;
   guestPosition?: string | null;
   guestPhone?: string | null;
   guestTitleId?: string | null;
   prefilldata?: string | null;
   lock_data?: string | null;
   token?: string;
}) => {
   if (!formShape || !FORM_SHAPES_CONFIG[formShape]) {
      return null;
   }

   const stepsConfig = getStepsConfigForFormShape(formShape);
   const stepIds = stepsConfig.map(s => s.id);

   // Default to first step if currentStep is empty or invalid
   const activeStep = currentStep && stepIds.includes(currentStep) ? currentStep : stepIds[0];

   return (
      <React.Fragment>
         {stepsConfig.map((stepConfig, index) => {
            // Load component using formShape and stepIndex
            const StepComponent = loadStepComponent(formShape, index);
            if (!StepComponent) return null;

            const isLastStep = index === stepsConfig.length - 1;
            const nextStepId = isLastStep ? null : stepsConfig[index + 1]?.id;

            // Determine component type based on formShape and step index
            const isOneStepForm = formShape === 'default' || formShape === 'hci-one-step' || formShape === 'edgex-one-step';
            const componentType = isOneStepForm ? 'personal-info-short' : stepConfig.id;

            // Common props for all steps
            const commonProps: any = {
               step: activeStep,
               role: category,
            };

            // Step-specific props
            if (componentType === 'personal-info-short') {
               // One-step form props
               Object.assign(commonProps, {
                  onNextClick: () => router.push(`/${lang}/join/${category}/success`),
                  onBackClick: () => router.push(`/${lang}`),
                  onUpdateClick: () => setStep('personal-info-1'),
                  guestEmail,
                  guestFirstName,
                  guestLastName,
                  guestCompany,
                  guestPosition,
                  guestPhone,
                  guestTitleId,
                  prefilldata,
                  lock_data,
                  optionalFields,
                  mandatoryFields,
                  token,
                  withOtp: withOtp || false,
                  withSmsOtp: withSmsOtp || false,
                  withAlternativeEmail: withAlternativeEmail || false,
               });
            } else if (componentType === 'personal-info-1') {
               // Multi-step step 1 props
               Object.assign(commonProps, {
                  nextStep: nextStepId || undefined,
                  onNextClick: () => setStep(nextStepId!),
                  onBackClick: () => router.push(`/${lang}`),
                  onUpdateClick: () => setStep('personal-info-1'),
                  guestEmail,
                  guestFirstName,
                  guestLastName,
                  guestPhone,
                  guestTitleId,
                  optionalFields,
                  mandatoryFields,
                  withOtp: withOtp || false,
                  withSmsOtp: withSmsOtp || false,
               });
            } else if (componentType === 'personal-info-2') {
               // Multi-step step 2 props
               Object.assign(commonProps, {
                  nextStep: nextStepId || undefined,
                  onNextClick: () => setStep(nextStepId!),
                  onBackClick: () => setStep(stepsConfig[index - 1].id),
                  onUpdateClick: () => setStep('personal-info-2'),
                  token,
                  stepsNumber: stepsConfig.length,
                  optionalFields,
                  mandatoryFields,
                  residencyStatusTypes,
               });
            } else if (componentType === 'flights-info') {
               // Multi-step step 3 props
               Object.assign(commonProps, {
                  nextStep: nextStepId || undefined,
                  onNextClick: () => setStep(nextStepId!),
                  onBackClick: () => setStep(stepsConfig[index - 1].id),
                  onUpdateClick: () => setStep('flights-info'),
                  mandatoryFields,
               });
            } else if (componentType === 'accommodation-info') {
               // Multi-step step 4 props (last step)
               Object.assign(commonProps, {
                  onNextClick: () => router.push(`/${lang}/join/${category}/success`),
                  onBackClick: () => setStep(stepsConfig[index - 1].id),
                  token,
                  withToken: !!token,
                  role: category,
                  mandatoryFields,
               });
            }

            return <StepComponent key={stepConfig.id} {...commonProps} />;
         })}
      </React.Fragment>
   );
};

