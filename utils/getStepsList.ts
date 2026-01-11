import { getStepsForFormShape, FORM_SHAPES_CONFIG } from './form-shapes-config';

/**
 * Get steps list based on form shape
 * @param _role - Category slug/role (unused, kept for API compatibility)
 * @param formShape - Form shape identifier (e.g., 'default', 'hci-one-step', 'four-steps-covered')
 */
export const getStepsList = (_role?: string, formShape?: string | null): string[] => {
   // Use form_shape if available
   if (formShape && FORM_SHAPES_CONFIG[formShape]) {
      return getStepsForFormShape(formShape);
   }

   return [];
};
