import { AsyncThunk, PayloadAction } from '@reduxjs/toolkit';

/**
 * A utility function to handle async actions for `pending`, `fulfilled`, and `rejected`.
 * @param builder - The Redux builder to add cases to
 * @param asyncThunk - The async thunk action
 * @param field - The field of the state to update (e.g., 'workspaceDetails')
 * @param customFulfilledReducer - Optional callback for the fulfilled state to customize state modification
 */
export const statusBuilder = <
  T extends AsyncThunk<any, any, any>, // The async thunk type
  S extends { loading: boolean; error: string | null; [key: string]: any } // State type should include loading and error
>(
  builder: any,
  asyncThunk: T,
  { field }: { field: keyof S }, // Field of the state to update
  customFulfilledReducer?: (state: S, action: PayloadAction<any>) => void // Optional custom reducer for fulfilled
) => {
  builder
    .addCase(asyncThunk.pending, (state: S) => {
      state.loading = true;
    })
    .addCase(asyncThunk.fulfilled, (state: S, action: PayloadAction<any>) => {
      state.loading = false;
      if (customFulfilledReducer) {
        customFulfilledReducer(state, action); // Apply the custom fulfilled reducer if provided
      } else {
        state[field] = action.payload; // Default behavior: set the field with the payload
      }
      state.error = null;
    })
    .addCase(asyncThunk.rejected, (state: S, action: { error: { message: string } }) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
};
