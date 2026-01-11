import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { FORM_SHAPES_CONFIG } from './form-shapes-config';

/**
 * Component path mapping for dynamic imports
 * Maps component paths to actual import functions
 * Using `any` for component type since different step components have different prop types
 */
const COMPONENT_MAP: Record<string, () => Promise<any>> = {
   // Default one-step
   '/default/one-step/step-1': () => import('~/components/join/forms/default/one-step/step-1'),
   // HCI one-step
   '/hci/one-step/step-1': () => import('~/components/join/forms/hci/one-step/step-1'),
   // EdgeX one-step
   '/edgex/one-step/step-1': () => import('~/components/join/forms/edgex/one-step/step-1'),
   // HCI four-steps
   '/hci/fours-steps/step-1': () => import('~/components/join/forms/hci/fours-steps/step-1'),
   '/hci/fours-steps/step-2': () => import('~/components/join/forms/hci/fours-steps/step-2'),
   '/hci/fours-steps/step-3': () => import('~/components/join/forms/hci/fours-steps/step-3'),
   '/hci/fours-steps/step-4': () => import('~/components/join/forms/hci/fours-steps/step-4'),
};

/**
 * Dynamically load a step component based on form shape and step index
 * @param formShape - Form shape identifier (e.g., 'default', 'hci-one-step', 'four-steps-covered')
 * @param stepIndex - Zero-based index of the step (0 for first step, 1 for second, etc.)
 * @returns Dynamic component or null if not found
 */
export const loadStepComponent = (
   formShape: string | null | undefined,
   stepIndex: number
): ComponentType<any> | null => {
   if (!formShape || !FORM_SHAPES_CONFIG[formShape]) {
      return null;
   }

   const config = FORM_SHAPES_CONFIG[formShape];
   const step = config.steps[stepIndex];

   if (!step || !COMPONENT_MAP[step.componentPath]) {
      return null;
   }

   try {
      return dynamic(COMPONENT_MAP[step.componentPath], {
         ssr: false,
      }) as ComponentType<any>;
   } catch (error) {
      console.error(`Failed to load step component: ${step.componentPath}`, error);
      return null;
   }
};

/**
 * Get all step components for a form shape
 * @param formShape - Form shape identifier
 * @returns Array of dynamic components
 */
export const loadAllStepComponents = (
   formShape: string | null | undefined
): ComponentType<any>[] => {
   if (!formShape || !FORM_SHAPES_CONFIG[formShape]) {
      return [];
   }

   const config = FORM_SHAPES_CONFIG[formShape];
   return config.steps
      .map((_, index) => loadStepComponent(formShape, index))
      .filter(Boolean) as ComponentType<any>[];
};
