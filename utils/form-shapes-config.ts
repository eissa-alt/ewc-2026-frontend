/**
 * Step configuration type
 */
export type StepConfig = {
   id: string; // Step identifier for code logic (e.g., 'personal-info-1')
   name: string; // Translation key (e.g., 'web:personal-info-1')
   componentPath: string; // Path to the step component (e.g., 'froms/default/one-step/step-1')
};

/**
 * Form shapes configuration
 * Defines the step structure for each form shape
 * Maps to: froms/{project}/{flow}/step-{number}.tsx
 */
export type FormShapeConfig = {
   value: string;
   project: string; // Project name (default, hci, edgex)
   flow: string; // Flow/journey name (one-step, fours-steps)
   stepsCount: number;
   steps: StepConfig[];
};

export const FORM_SHAPES_CONFIG: Record<string, FormShapeConfig> = {
   // Default one-step form
   default: {
      value: 'default',
      project: 'default',
      flow: 'one-step',
      stepsCount: 1,
      steps: [
         {
            id: 'personal-info-1',
            name: 'web:personal-info-1',
            componentPath: '/default/one-step/step-1',
         },
      ],
   },
   // HCI one-step form
   'hci-one-step': {
      value: 'hci-one-step',
      project: 'hci',
      flow: 'one-step',
      stepsCount: 1,
      steps: [
         {
            id: 'personal-info-1',
            name: 'web:personal-info-1',
            componentPath: '/hci/one-step/step-1',
         },
      ],
   },
   // EdgeX one-step form
   'edgex-one-step': {
      value: 'edgex-one-step',
      project: 'edgex',
      flow: 'one-step',
      stepsCount: 1,
      steps: [
         {
            id: 'personal-info-1',
            name: 'web:personal-info-1',
            componentPath: '/edgex/one-step/step-1',
         },
      ],
   },
   // Covered 4 steps form (HCI)
   'four-steps-covered': {
      value: 'four-steps-covered',
      project: 'hci',
      flow: 'fours-steps',
      stepsCount: 4,
      steps: [
         {
            id: 'personal-info-1',
            name: 'web:personal-info-1',
            componentPath: '/hci/fours-steps/step-1',
         },
         {
            id: 'personal-info-2',
            name: 'web:personal-info-2',
            componentPath: '/hci/fours-steps/step-2',
         },
         {
            id: 'flights-info',
            name: 'web:flights-info',
            componentPath: '/hci/fours-steps/step-3',
         },
         {
            id: 'accommodation-info',
            name: 'web:accommodation-info',
            componentPath: '/hci/fours-steps/step-4',
         },
      ],
   },
   // EWC 4 steps form
   'ewc-four-steps': {
      value: 'ewc-four-steps',
      project: 'ewc',
      flow: 'fours-steps',
      stepsCount: 4,
      steps: [
         {
            id: 'personal-info-1',
            name: 'web:personal-info-1',
            componentPath: '/ewc/fours-steps/step-1',
         },
         {
            id: 'personal-info-2',
            name: 'web:personal-info-2',
            componentPath: '/ewc/fours-steps/step-2',
         },
         {
            id: 'flights-info',
            name: 'web:flights-info',
            componentPath: '/ewc/fours-steps/step-3',
         },
         {
            id: 'accommodation-info',
            name: 'web:accommodation-info',
            componentPath: '/ewc/fours-steps/step-4',
         },
      ],
   },
};

/**
 * Get steps list for a form shape (step identifiers for code logic)
 */
export const getStepsForFormShape = (formShape: string | null | undefined): string[] => {
   if (!formShape) return [];
   return FORM_SHAPES_CONFIG[formShape]?.steps.map(step => step.id) || [];
};

/**
 * Get step labels (translation keys) for a form shape
 */
export const getStepLabelsForFormShape = (formShape: string | null | undefined): string[] => {
   if (!formShape) return [];
   return FORM_SHAPES_CONFIG[formShape]?.steps.map(step => step.name) || [];
};

/**
 * Get full step configuration for a form shape
 */
export const getStepsConfigForFormShape = (formShape: string | null | undefined): StepConfig[] => {
   if (!formShape) return [];
   return FORM_SHAPES_CONFIG[formShape]?.steps || [];
};

/**
 * Get steps count for a form shape
 */
export const getStepsCountForFormShape = (formShape: string | null | undefined): number => {
   if (!formShape) return 0;
   return FORM_SHAPES_CONFIG[formShape]?.stepsCount || 0;
};
